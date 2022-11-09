import { Collection, Document, Filter, FindOneAndDeleteOptions, FindOneAndUpdateOptions, FindOptions, InsertOneOptions, MongoClient, ObjectId, ReturnDocument, UpdateFilter } from 'mongodb'
import _ from 'lodash'

import env from '@/env'
import HttpError from '@/shared/utils/HttpError'

export { Collection, Document, ReturnDocument }

const client = new MongoClient(env.mongoUrl)

const collection = async (collection: string): Promise<Collection<Document>> => {
    await client.connect()

    return client.db(env.mongoDb).collection(collection)
}

interface IFindArgs {
    collection: string
    filter?: Filter<Document>
    fromId?: string
    limit?: number
    options?: FindOptions
    page?: number
    projection?: string[]
}

interface IFindReturn<T> {
    count: number
    items: T[]
}

async function find<T>(
    args: IFindArgs
): Promise<IFindReturn<T>> {
    if (args.projection && _.size(args.projection)) {
        args.options = {
            ...args.options
        }
    }

    // keyset pagination -> higher performance
    // retrieve the next pages using the previous pages that have been fetched
    if (args.fromId) {
        args.filter = {
            _id: {
                $gt: new ObjectId(args.fromId)
            }
        }
    }

    if (args.limit) {
        // classic pagination -> slower performance
        // randomly access the pages
        if (!args.fromId && args.page) {
            args.options = {
                ...args.options,
                skip: args.limit * (args.page - 1)
            }
        }

        args.options = {
            ...args.options,
            limit: args.limit
        }
    }

    const cl = await collection(args.collection)

    const [itemsResponse, count] = await Promise.all([
        cl.find(args.filter || {}, args.options || {}).toArray(),
        cl.countDocuments(args.filter || {})
    ])

    const items = _.map(itemsResponse, (item) => {
        const newItem = {
            ...item,
            _id: item._id.toString()
        }

        return newItem
    }) as T[]

    return {
        count,
        items
    }
}

interface IInsertArgs {
    collection: string
    data: Document
    options?: InsertOneOptions
}

async function insertOne<T>(args: IInsertArgs): Promise<T> {
    const cl = await collection(args.collection)
    const { insertedId } = await cl.insertOne(
        {
            ...args.data
        },
        args.options || {}
    )
    const response = {
        ...args.data,
        _id: insertedId.toString()
    }

    return response as T
}

interface IFindOneArgs {
    collection: string
    filter: Filter<Document>
    nullable?: boolean
    options?: FindOptions
}

async function findOne<T>(args: IFindOneArgs): Promise<T | null> {
    const cl = await collection(args.collection)
    const findResponse = await cl.findOne(args.filter, args.options || {})

    if (!findResponse) {
        if (args.nullable) {
            return null
        }

        throw new HttpError(404)
    }

    const response = {
        ...findResponse,
        _id: findResponse._id.toString()
    }

    return response as T
}

interface IUpdateOneArgs {
    collection: string
    data: UpdateFilter<Document>
    filter: Filter<Document>
    options?: FindOneAndUpdateOptions
}

async function updateOne<T>(args: IUpdateOneArgs): Promise<T> {
    const cl = await collection(args.collection)

    args.options = _.defaults({}, args.options, {
        returnDocument: ReturnDocument.AFTER,
        upsert: false
    })

    const isAtomic = _.some(args.data, (value, key) => {
        return key.startsWith('$')
    })

    const { value: response, lastErrorObject } = await cl.findOneAndUpdate(
        args.filter,
        isAtomic
            ? args.data
            : {
                $set: args.data
            },
        args.options || {}
    )

    if (!lastErrorObject?.updatedExisting) {
        throw new HttpError(404)
    }

    return response as T
}

interface IDeleteOneArgs {
    collection: string
    filter: Filter<Document>
    nullable?: boolean
    options?: FindOneAndDeleteOptions
}

async function deleteOne<T>(args: IDeleteOneArgs): Promise<T | null> {
    const cl = await collection(args.collection)
    const { value: response } = await cl.findOneAndDelete(args.filter, args.options || {})

    if (!response) {
        if (args.nullable) {
            return null
        }

        throw new HttpError(404)
    }

    return response as T
}

export default {
    collection,
    find,
    findOne,
    insertOne,
    updateOne,
    deleteOne
}
