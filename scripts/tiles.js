function Tile(x,y, value){
  this.x = x;
  this.y = y;
  this.value = value;
  this.flag = 0;
};

var resetFlag = function(matrix){
	for( var i = 0; i < MATRIX_SIZE; i++)
		for( var j = 0; j < MATRIX_SIZE; j++)
			matrix[i][j].flag = 0;
		return matrix;
};


