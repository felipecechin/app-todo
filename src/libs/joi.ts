import _ from 'lodash'
import joi from 'joi'
export { Description, ObjectSchema, Schema, ValidationError } from 'joi'

export const partialStore = (schema: joi.ObjectSchema, optionalKeys: string[] = []): joi.ObjectSchema => {
    const desc = schema.describe()
    const keys = _.keys(desc.keys)

    optionalKeys = _.intersection(keys, ['createdAt', 'updatedAt', ...optionalKeys])

    return schema.fork(optionalKeys, (schema) => {
        return schema.optional()
    })
}

export const partialUpdate = (schema: joi.ObjectSchema, requiredKeys: string[] = []): joi.ObjectSchema => {
    const desc = schema.describe()
    const keys = _.keys(desc.keys)
    let optionalKeys = _.difference(keys, [...requiredKeys])

    optionalKeys = _.intersection(keys, optionalKeys)

    return schema.fork(optionalKeys, (schema) => {
        return schema.optional()
    })
}

export default joi
