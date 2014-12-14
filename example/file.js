var Grid = require("../lib/grid");
var grid = new Grid([["Name","Age","City"],["Allan",20,"New York"],["Jack",30,"London"]]);
grid.setWidth(1,20);
grid.setAlign(2,"right");
grid.stream = require("fs").createWriteStream("grid.txt");
grid.draw();