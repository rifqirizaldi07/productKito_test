import moment from "moment"

export const isEmptyValue = (value) => {
    return (
        value === undefined ||
        value === null ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0) ||
        (typeof value === 'number' && value < 1)
    )
}

export const formatDateTime = (value) => {
    const date = moment(value)

    if (date.isValid()) {
        return date.format('YYYY-MM-DD HH:mm:ss')
    }

    return false
}

