import _ from 'lodash'

import { Schema, ValidationError } from '@/libs/joi'
import HttpError from '@/shared/utils/HttpError'

import omitByRecursively from './omitByRecursively'

export default async <T>(schema: Schema, value: T, abortEarly = false, omitUndefinedAndNull = false): Promise<T> => {
    try {
        const returnedValue = await schema.validateAsync(value, {
            abortEarly,
            stripUnknown: {
                arrays: false,
                objects: true
            }
        })

        if (omitUndefinedAndNull) {
            return omitByRecursively(value as object) as T
        } else {
            return returnedValue
        }
    } catch (err) {
        const context = _.map((err as ValidationError).details, (detail) => {
            return _.pick(detail, ['message', 'path', 'type'])
        })

        throw new HttpError(400, 'ValidationError', context)
    }
}
