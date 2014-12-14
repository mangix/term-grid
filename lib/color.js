var colors = {
    black: 0,
    red: 1,
    green: 2,
    yellow: 3,
    blue: 4,
    magenta: 5,
    cyan: 6,
    white: 7
};

module.exports = function (content, color) {
    if (color in colors) {
        return '\033[3' + colors[color] + 'm' + content + '\033[0m';
    }
    return content;

};