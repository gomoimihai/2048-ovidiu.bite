var container = $('.container');
var undoTag =  $('#undo');
var resetFlag = function(matrix){
	for( var i = 0; i < MATRIX_SIZE; i++)
		for( var j = 0; j < MATRIX_SIZE; j++)
			matrix[i][j].flag = 0;
		return matrix;
};

function clone(existingArray) {
   var newObj = (existingArray instanceof Array) ? [] : {};
   for (i in existingArray) {
      if (existingArray[i] && typeof existingArray[i] == "object") {
         newObj[i] = clone(existingArray[i]);
      } else {
         newObj[i] = existingArray[i]
      }
   }
   return newObj;
};

function stopScroll(){
var ar=new Array(37,38,39,40);
$(document).keydown(function(e) {
  var key = e.which;
  if($.inArray(key,ar) > -1) {
    e.preventDefault();
    return false;
    }
  return true;
});
}

function gameOver(matrix){
  var k = 0;
  for( var i = 0; i < MATRIX_SIZE-1; i++)
    for(var j = 0; j < MATRIX_SIZE-1; j++)
    if(matrix[i+1][j].value)
      if(matrix[i][j].value !== matrix[i][j+1].value && matrix[i][j].value !== matrix[i+1][j].value && matrix[i][j+1].value !== matrix[i+1][j+1].value) 
       continue;
      else
        k = 1;
    else
      if(matrix[i][j].value !== matrix[i+1][j].value)
       continue;
      else
        k = 1;

  if(k === 0 && getEmptyCell(matrix).length === 0){
    alert('GameOver! You lose! \n Press ESC for restart the game!');
    return k;
  }
};

function restartGame(){
  for (var i = 0; i < MATRIX_SIZE; i++) {
    for (var j = 0; j < MATRIX_SIZE; j++) {
      gameMatrix.matrix[i][j].value = 0;
    }
  }
  return gameMatrix.matrix;
}

function win(matrix, matrix3){
  var k1 = 0;
  var k2 = 0;
  for( var i = 0; i < MATRIX_SIZE; i++){
    for(var j = 0; j < MATRIX_SIZE; j++){
    if(matrix3[i][j].value === 2048 || matrix3[i][j].value === 4096)
      k2 = 1;
    if(matrix[i][j].value === 2048)
      k1 = 1;
    }
  }

  if(k1 === 1 && k2 == 0)
    alert('You Win');

}


function score(score){
  totalScore += score;
  return totalScore;
}