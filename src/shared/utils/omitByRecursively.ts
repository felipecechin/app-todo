import _ from 'lodash'

function omitByRecursively(value: object): object {
    const cb = (v: object): object => omitByRecursively(v)
    return _.isObject(value)
        ? _.isArray(value)
            ? _.map(value, cb)
            : _(value).omitBy(_.isNil).mapValues(cb).value()
        : value
}

export default omitByRecursively
