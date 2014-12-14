/**
 * string length
 * */
var cache = {};

module.exports = function (str) {
    str = "" + str;
    if (str in cache) {
        return cache[str];
    }
    var totalCount = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            totalCount++;
        }
        else {
            totalCount += 2;
        }
    }
    cache[str] = totalCount;
    return totalCount;
};