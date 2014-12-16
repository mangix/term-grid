var cell = require("./cell");
var length = require("./length");
var color = require("./color");

/**
 * Class Grid
 * */

var Grid = module.exports = function (data) {
    this.data = [];     //grid data
    this.width = [];    //column width, 0 or undefined means auto
    this.color = [];    //column color
    this.align = [];    //column align
    this.stream = process.stdout;

    this.setData(data);
};

Grid.prototype = {
    constructor: Grid,
    /**
     * set grid Data
     * @param data{Array}
     * [
     *      [td1,td2,...],
     *      [td1,td2,...]
     *      ....
     * ]
     * */
    setData: function (data) {
        if (Array.isArray(data)) {
            data.forEach(function (row) {
                this.appendRow(row);
            }, this);
        }
    },
    /**
     * append row
     * @param data{Array}
     * */
    appendRow: function (data) {
        if (this._validRow(data)) {
            this.data.push(data);
        }
    },
    /**
     * prepend row
     * @param
     * */
    prependRow: function (data) {
        if (this._validRow(data)) {
            this.data.unshift(data);
        }
    },
    /**
     * set column width
     * >>if param is Array , set this.width<<
     * @param columnIndex{Number}
     * @param width{Number}
     * */
    setWidth: function (columnIndex, width) {
        if (Array.isArray(columnIndex)) {
            this.width = columnIndex;
        } else {
            columnIndex = parseInt(columnIndex);
            if (columnIndex >= 0) {
                this.width[columnIndex] = Math.abs(parseInt(width));
            }
        }
    },
    /**
     * set column align
     * >>if param is Array , set this.align<<
     * @param columnIndex{Number}
     * @param align{String} "left" or "center" or "right"
     * */
    setAlign: function (columnIndex, align) {
        if (Array.isArray(columnIndex)) {
            this.align = columnIndex;
        } else {
            columnIndex = parseInt(columnIndex);
            if (columnIndex >= 0) {
                this.align[columnIndex] = align;
            }
        }
    },
    /**
     * set column colors
     * @param columnIndex{Number}[optional]
     * @param color{String | Function}
     * */
    setColor: function (columnIndex, color) {
        if (Array.isArray(columnIndex)) {
            //set the color array;
            this.color = columnIndex;
        } else if (typeof columnIndex == "function" || typeof columnIndex == "string") {
            //set each column
            var count = this.getColumnCount();
            for (var i = 0; i < count; i++) {
                this.color[i] = columnIndex;
            }
        } else {
            columnIndex = parseInt(columnIndex);
            if (columnIndex >= 0) {
                this.color[columnIndex] = color;
            }
        }
    },
    /**
     * return the compiled data width width and color
     * @return {Array}
     * */
    compile: function () {
        var data = [];
        var columnWidthCache = [];
        this.data.forEach(function (row, i) {
            var rowData = [];
            row.forEach(function (column, j) {
                columnWidthCache[j] || (columnWidthCache[j] = this.getColumnWidth(j));
                rowData.push(this._parseColor(i, j, cell(column.toString(), columnWidthCache[j], this.align[j])));
            }, this);
            data.push(rowData.join(""));
        }, this);

        return this.compiledData = data;
    },

    /**
     * draw
     * */
    draw: function () {
        var data = this.compile();
        data.forEach(function (row) {
            this.stream.write(row + "\n");
        }, this);
    },

    /**
     * @return Number , total columns count
     * */
    getColumnCount: function () {
        if (this.data.length) {
            return this.data.reduce(function (pre, row) {
                return row.length > pre ? row.length : pre;
            }, 0);
        }
        return 0;
    },
    getRowCount: function () {
        return this.data.length;
    },

    /**
     * column width
     * */
    getColumnWidth: function (column) {
        var width = this.width[column];
        if (width) {
            return width;
        } else {
            //find maxWidth
            return this.data.map(function (row) {
                return column < row.length ? length(row[column]) : 0;
            }).sort(function (w1, w2) {
                return w1 - w2
            })[this.data.length - 1] + 2;
        }
    },

    _parseColor: function (row, column, content) {
        var c = this.color[column];
        if (typeof c === "function") {
            c = c(this.data[row][column], row, column);
        }
        return  color(content, c);
    },


    /**
     * check is valid row data
     * @param data{Object}
     * */
    _validRow: function (data) {
        return Array.isArray(data);
    }
};