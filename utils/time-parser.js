module.exports = function(now) {
    let zeroFill = function(number) {
        if (number < 10) {
            return "0" + number;
        } else {
            return "" + number;
        }
    };
    
    let time = {
        seconds: zeroFill(now.getSeconds()),
        minutes: zeroFill(now.getMinutes()),
        hours: zeroFill(now.getHours()),
        date: zeroFill(now.getDate()),
        month: zeroFill(now.getMonth() + 1),
        year: zeroFill(now.getFullYear())
    }

    return `${time.date}-${time.month}-${time.year} / ${time.hours}:${time.minutes}:${time.seconds}`;
};