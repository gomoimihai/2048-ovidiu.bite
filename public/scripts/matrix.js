//create the matrix with value 0
var gameMatrix = {};

var createMatrix = function(){
  var matrix = new Array(MATRIX_SIZE);
  for ( i = 0; i < MATRIX_SIZE; i++){
    matrix[i] = new Array(MATRIX_SIZE);
  }
  for ( i = 0; i < MATRIX_SIZE; i++) {
    for( j = 0; j < MATRIX_SIZE; j++)
      matrix[i][j] = new Tile(i,j,0) ;
  }
  return matrix;
};

// get positions for empty cells with value 0
var getEmptyCell = function(matrix){
  var emptyCell = new Array(MATRIX_SIZE*MATRIX_SIZE);
  for( i = 0; i < MATRIX_SIZE*MATRIX_SIZE; i++)
    emptyCell[i] = new Array(2);
  var l = 0;
  for(i = 0; i < MATRIX_SIZE; i++){
    for(j = 0; j < MATRIX_SIZE; j++)
      if(matrix[i][j].value === 0){
        emptyCell[l][0] = i;
        emptyCell[l][1] = j;
        l++;
      }
  }
  //set the length of emptyCell to not have undefined cells	
  emptyCell.length = l;
  return emptyCell;
};



var randPosition = function(matr){ 
  return matr[Math.floor(Math.random() * matr.length)];
};

gameMatrix.matrix = createMatrix();
//initialize the game with 2 cells
var startGame = function(){
  var emptCell = getEmptyCell(gameMatrix.matrix);
  var x = randPosition(emptCell);
  gameMatrix.matrix[x[0]][x[1]].value = 2;
  emptCell = getEmptyCell(gameMatrix.matrix);
  x = randPosition(emptCell);
  gameMatrix.matrix[x[0]][x[1]].value = 2   ;
};

var insertTile = function(matrix){
  var emptCell1 = getEmptyCell(matrix);
  var position = randPosition(emptCell1);
  matrix[position[0]][position[1]] = new Tile(position[0], position[1], randNumber());
};


//for moves 
var moveLeft = function(matrix){
  matrix2 = clone(matrix);
  resetFlag(matrix);
  matrix3 = clone(matrix);
  undoMatrix.push(matrix2);
  undoScore.push(totalScore);
  // if moved = 0, then don't insert new tile;    
  var moved = 0;
      for( var i = 0; i < MATRIX_SIZE; i++){
        for( var j = MATRIX_SIZE-1; j > 0; j--){
          if(matrix[i][j].value !== 0){           
            if(matrix[i][j].value === matrix[i][j-1].value && matrix[i][j].flag === 0 && matrix[i][j-1].flag === 0){
              score(matrix[i][j-1].value*2);
              matrix[i][j-1].value = matrix[i][j-1].value*2;
              matrix[i][j].value = 0;
              matrix[i][j-1].flag = 1;
              moved = 1;
              }
          else if(matrix[i][j-1].value === 0){
            matrix[i][j-1] = matrix[i][j];
            matrix[i][j] = new Tile(i,j,0);
            moved = 1;
            }
          else if(matrix[i][j-1].value !== 0)
            continue;
          }
        }
      }
      // parcurg pentru a scapa de spatiile goale ( VALUE = 0)
      for( var i = 0; i < MATRIX_SIZE; i++)
        for( var j = 0; j < MATRIX_SIZE-1; j++)
          if(matrix[i][j+1].value !== 0 && matrix[i][j].value === 0){
            matrix[i][j] = matrix[i][j+1];
            matrix[i][j+1] = new Tile(i,j,0);
            moved = 1;
            if(matrix[i][j-1] && matrix[i][j-1].value === 0){
              matrix[i][j-1] = matrix[i][j];
              matrix[i][j] = new Tile(i,j,0);
            }
          }
      matrix2 = clone(matrix);
   
      if(moved === 1)
        insertTile(matrix);
  position = compareElements(matrix,matrix2);
  draw(matrix, position);
  win(matrix, matrix3);
};

var moveRight = function(matrix){
  matrix2 = clone(matrix);
  matrix3 = clone(matrix);
  resetFlag(matrix);
  undoMatrix.push(matrix2);
  undoScore.push(totalScore);
  // if moved = 0, then don't insert new tile;    
  var moved = 0;
  for( var i = 0; i < MATRIX_SIZE; i++){
    for( var j = 0; j < MATRIX_SIZE-1; j++){
      if(matrix[i][j].value !== 0){           
        if(matrix[i][j].value === matrix[i][j+1].value && matrix[i][j].flag === 0 && matrix[i][j+1].flag === 0){
          score(matrix[i][j+1].value*2);
          matrix[i][j+1].value = matrix[i][j+1].value*2;
          matrix[i][j].value = 0;
          matrix[i][j+1].flag = 1;
          moved = 1;
          }
        else if(matrix[i][j+1].value === 0){
          matrix[i][j+1] = matrix[i][j];
          matrix[i][j] = new Tile(i,j,0);
          moved = 1;
          }
      else if(matrix[i][j+1].value !== 0) continue;
      }
    }
  }
  // parcurg pentru a scapa de spatiile goale ( VALUE = 0)
  for( var i = 0; i < MATRIX_SIZE; i++)
    for( var j = MATRIX_SIZE-1; j > 0 ; j--)
      if(matrix[i][j].value === 0 && matrix[i][j-1].value !== 0){
        matrix[i][j] = matrix[i][j-1];
        matrix[i][j-1] = new Tile(i,j,0);
        moved = 1;
        if(matrix[i][j+1] && matrix[i][j+1].value === 0){
          matrix[i][j+1] = matrix[i][j];
          matrix[i][j] = new Tile(i,j,0);
        }
      }
      matrix2 = clone(matrix); 
  if(moved === 1)
  insertTile(matrix);

  position = compareElements(matrix,matrix2);
  draw(matrix, position);
  win(matrix, matrix3);
};

var moveUp = function(matrix){
  matrix2 = clone(matrix);
  matrix3 = clone(matrix);
  resetFlag(matrix);
  undoMatrix.push(matrix2);
  undoScore.push(totalScore);
  // if moved = 0, then don't insert new tile;    
  var moved = 0;
  for(var j = 0; j < MATRIX_SIZE; j++){
    for(var i = MATRIX_SIZE-1; i > 0; i--){
      if(matrix[i][j].value !== 0){ 
        if(matrix[i][j].value === matrix[i-1][j].value && matrix[i][j].flag === 0 && matrix[i-1][j].flag === 0){
          score(matrix[i-1][j].value*2);
          matrix[i-1][j].value = matrix[i-1][j].value*2;
          matrix[i][j].value = 0;
          matrix[i-1][j].flag = 1;
          moved = 1;
        }
        else if(matrix[i-1][j].value === 0){
          matrix[i-1][j] = matrix[i][j];
          matrix[i][j] = new Tile(i,j,0);
          moved = 1;
        }
      else if(matrix[i-1][j].value !== 0) continue;
      }
    }
  }
  // parcurg pentru a scapa de spatiile goale ( VALUE = 0)
  for( var j = 0; j < MATRIX_SIZE; j++)
    for( var i = 0; i < MATRIX_SIZE-1 ; i++)
      if(matrix[i+1][j].value !== 0 && matrix[i][j].value === 0){
        matrix[i][j] = matrix[i+1][j];
        matrix[i+1][j] = new Tile(i,j,0);
        moved = 1;
        if(matrix[i-1][j] && matrix[i-1][j].value === 0){
          matrix[i-1][j] = matrix[i][j];
          matrix[i][j] = new Tile(i,j,0);
        }
      }
  matrix2 = clone(matrix);
  if(moved === 1)
  insertTile(matrix);
  position = compareElements(matrix,matrix2);
  draw(matrix, position);
  win(matrix, matrix3);

};

var moveDown = function(matrix){
  matrix2 = clone(matrix);
  matrix3 = clone(matrix);
  resetFlag(matrix);
  undoMatrix.push(matrix2);
  undoScore.push(totalScore);
  // if moved = 0, then don't insert new tile;    
  var moved = 0;
  for(var j = 0; j < MATRIX_SIZE; j++){
    for(var i = 0; i < MATRIX_SIZE-1; i++){
      if(matrix[i][j].value !== 0){ 
        if(matrix[i][j].value === matrix[i+1][j].value && matrix[i][j].flag === 0 && matrix[i+1][j].flag === 0){
          score(matrix[i+1][j].value*2);
          matrix[i+1][j].value = matrix[i+1][j].value*2;
          matrix[i][j].value = 0;
          matrix[i+1][j].flag = 1;
          moved = 1;
        }
        else if(matrix[i+1][j].value === 0){
          matrix[i+1][j] = matrix[i][j];
          matrix[i][j] = new Tile(i,j,0);
          moved = 1;
        }
      else if(matrix[i+1][j].value !== 0) continue;
      }
    }
  }
  // parcurg pentru a scapa de spatiile goale ( VALUE = 0)
  for( var j = 0; j < MATRIX_SIZE; j++)
    for( var i = MATRIX_SIZE-1; i > 0 ; i--)
      if(matrix[i][j].value === 0 && matrix[i-1][j].value !== 0){
        matrix[i][j] = matrix[i-1][j];
        matrix[i-1][j] = new Tile(i,j,0);
        moved = 1;
        if(matrix[i+1][j] && matrix[i+1][j].value === 0){
          matrix[i+1][j] = matrix[i][j];
          matrix[i][j] = new Tile(i,j,0);
        }
      }
  matrix2 = clone(matrix);
  if(moved === 1)
  insertTile(matrix);
  position = compareElements(matrix,matrix2);
  draw(matrix, position);
  win(matrix, matrix3);
 };

var draw = function(matrix, position){
  container.empty();
  for(i = 0; i < MATRIX_SIZE; i++){
    for(j = 0; j < MATRIX_SIZE; j++)
      if(matrix[i][j].value !== 0){
        if(position && i === position[0][0] && j === position[0][1]){
        addHtml(matrix[i][j], 'none').appendTo(container).fadeIn(500);
        }else
        addHtml(matrix[i][j], 'block').appendTo(container);
      }
      else
       addHtml(matrix[i][j], 'block').appendTo(container);
    container.append('<br/>')
  $('.score').html('Score' + '<p>'+totalScore+'</p>');
    console.log(totalScore);
  }
};

function addHtml(matrix, display){
   var valueToDisplay = matrix.value === 0 ? '' : matrix.value;
   return $('<div class="tile val'+matrix.value+'" style="display:'+display+'">'+ valueToDisplay +'</div>');
  
};

function compareElements(matrix, matrix2){
  var position = new Array(1);
     position[0] = new Array(2);
  for(var i = 0; i < MATRIX_SIZE; i++)
    for(var j = 0; j < MATRIX_SIZE; j++){
      if(matrix[i][j].value !== matrix2[i][j].value){
        position[0][0] = i;
        position[0][1] = j;
       }}
      return position;
};

function undo(){
 var matrix = undoMatrix[undoMatrix.length-1];
 undoMatrix.length = undoMatrix.length-1;
 totalScore = undoScore[undoScore.length-1];
 undoScore.length = undoScore.length-1;
 return matrix;
};
