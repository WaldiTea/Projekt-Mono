function dateToday () {
    const now = new Date()
    const year = now.getFullYear()
    const month = ("0" + (now.getMonth() + 1)).toLocaleString('de-DE', { minimumIntegerDigits: 2})
    const day = ("0" + now.getDate()).substring(1).toLocaleString('de-DE', { minimumIntegerDigits: 2})

    return year + "-" + month  + "-" + day
}

module.exports = {dateToday}