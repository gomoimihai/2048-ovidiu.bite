const MATRIX_SIZE = 4; 
const PERCENT = 0.9;
var x = 3;
var totalScore = 0;
var undoMatrix = [];
var undoScore = [];
var randNumber = function(){
  var value = Math.random() < PERCENT ? 2 : 4;
  return value;
};



