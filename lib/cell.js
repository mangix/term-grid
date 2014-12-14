/**
 * fill a cell of the grid
 * */

var length = require("./length");


module.exports = function (content, width, align) {
    var len = length(content);
    if (len >= width) {
        return content;
    }

    switch (align) {
        case "right" :
            return empty(width - len) + content;
        case "center":
            return empty(Math.floor((width - len) / 2)) + content + empty(Math.round((width - len) / 2));
        default :
            return content + empty(width - len);
    }
};

/**
 * get empty string
 * */
function empty(size) {
    return (new Array(size + 1)).join(" ");
}


