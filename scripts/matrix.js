//create the matrix with value 0
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
var getEmptyCell = function(matrix1){
  var emptyCell = new Array(MATRIX_SIZE*MATRIX_SIZE);
  for( i = 0; i < MATRIX_SIZE*MATRIX_SIZE; i++)
    emptyCell[i] = new Array(2);
  var l = 0;
  for(i = 0; i < MATRIX_SIZE; i++){
    for(j = 0; j < MATRIX_SIZE; j++)
      if(matrix1[i][j].value === 0){
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

var matrix = createMatrix();
//initialize the game with 2 cells
var startGame = function(){
  var emptCell = getEmptyCell(matrix);
  var x = randPosition(emptCell);
  matrix[x[0]][x[1]].value = 2;
  emptCell = getEmptyCell(matrix);
  x = randPosition(emptCell);
  matrix[x[0]][x[1]].value = 2;
};

var insertTile = function(matrix1){
  var emptCell1 = getEmptyCell(matrix1);
  var position = randPosition(emptCell1);
  matrix1[position[0]][position[1]] = new Tile(position[0], position[1], randNumber());
};


//for moves 
var move = function(matrix1, direction){
  matrix2 = clone(matrix1);
  resetFlag(matrix1);
  // if moved = 0, then don't insert new tile;    
  var moved = 0;
  switch(direction){
    // left Arrow
    case 'startGame':
      startGame();
      position = compareElements(matrix1,matrix2);
      break;
    case 'left':
      for( var i = 0; i < MATRIX_SIZE; i++){
        for( var j = MATRIX_SIZE-1; j > 0; j--){
          if(matrix1[i][j].value !== 0){           
            if(matrix1[i][j].value === matrix1[i][j-1].value && matrix1[i][j].flag === 0 && matrix1[i][j-1].flag === 0){
              matrix1[i][j-1].value = matrix1[i][j-1].value*2;
              matrix1[i][j].value = 0;
              matrix1[i][j-1].flag = 1;
              moved = 1;
              }
          else if(matrix1[i][j-1].value === 0){
            matrix1[i][j-1] = matrix1[i][j];
            matrix1[i][j] = new Tile(i,j,0);
            moved = 1;
            }
          else if(matrix1[i][j-1].value !== 0)
            continue;
          }
        }
      }
      // parcurg pentru a scapa de spatiile goale ( VALUE = 0)
      for( var i = 0; i < MATRIX_SIZE; i++)
        for( var j = 0; j < MATRIX_SIZE-1; j++)
          if(matrix1[i][j+1].value !== 0 && matrix1[i][j].value === 0){
            matrix1[i][j] = matrix1[i][j+1];
            matrix1[i][j+1] = new Tile(i,j,0);
            moved = 1;
            if(matrix1[i][j-1] && matrix1[i][j-1].value === 0){
              matrix1[i][j-1] = matrix1[i][j];
              matrix1[i][j] = new Tile(i,j,0);
            }
          }
      matrix2 = clone(matrix1);
      console.log('acum modific');    
      if(moved === 1)
        insertTile(matrix1);
      break;
      case 'right':
        for( var i = 0; i < MATRIX_SIZE; i++){
          for( var j = 0; j < MATRIX_SIZE-1; j++){
            if(matrix1[i][j].value !== 0){           
              if(matrix1[i][j].value === matrix1[i][j+1].value && matrix1[i][j].flag === 0 && matrix1[i][j+1].flag === 0){
                matrix1[i][j+1].value = matrix1[i][j+1].value*2;
                matrix1[i][j].value = 0;
                matrix1[i][j+1].flag = 1;
                moved = 1;
              }
              else if(matrix1[i][j+1].value === 0){
                matrix1[i][j+1] = matrix1[i][j];
                matrix1[i][j] = new Tile(i,j,0);
                moved = 1;
                }
              else if(matrix1[i][j+1].value !== 0) continue;
            }
          }
        }
        // parcurg pentru a scapa de spatiile goale ( VALUE = 0)
        for( var i = 0; i < MATRIX_SIZE; i++)
          for( var j = MATRIX_SIZE-1; j > 0 ; j--)
            if(matrix1[i][j].value === 0 && matrix1[i][j-1].value !== 0){
              matrix1[i][j] = matrix1[i][j-1];
              matrix1[i][j-1] = new Tile(i,j,0);
              moved = 1;
              if(matrix1[i][j+1] && matrix1[i][j+1].value === 0){
                matrix1[i][j+1] = matrix1[i][j];
                matrix1[i][j] = new Tile(i,j,0);
              }
            }
         matrix2 = clone(matrix1); 
        if(moved === 1)
          insertTile(matrix1);
        break;
      case 'up':
        for(var j = 0; j < MATRIX_SIZE; j++){
          for(var i = MATRIX_SIZE-1; i > 0; i--){
            if(matrix1[i][j].value !== 0){ 
              if(matrix1[i][j].value === matrix1[i-1][j].value && matrix1[i][j].flag === 0 && matrix1[i-1][j].flag === 0){
                matrix1[i-1][j].value = matrix1[i-1][j].value*2;
                matrix1[i][j].value = 0;
                matrix1[i-1][j].flag = 1;
                moved = 1;
              }
              else if(matrix1[i-1][j].value === 0){
                matrix1[i-1][j] = matrix1[i][j];
                matrix1[i][j] = new Tile(i,j,0);
                moved = 1;
                }
              else if(matrix1[i-1][j].value !== 0) continue;
            }
          }
        }
        // parcurg pentru a scapa de spatiile goale ( VALUE = 0)
        for( var j = 0; j < MATRIX_SIZE; j++)
          for( var i = 0; i < MATRIX_SIZE-1 ; i++)
            if(matrix1[i+1][j].value !== 0 && matrix1[i][j].value === 0){
              matrix1[i][j] = matrix1[i+1][j];
              matrix1[i+1][j] = new Tile(i,j,0);
              moved = 1;
              if(matrix1[i-1][j] && matrix1[i-1][j].value === 0){
                matrix1[i-1][j] = matrix1[i][j];
                matrix1[i][j] = new Tile(i,j,0);
              }
            }
        matrix2 = clone(matrix1);
        if(moved === 1)
        insertTile(matrix1);
        console.log(matrix2);
        console.log(matrix1);
        break;
      case 'down':
        for(var j = 0; j < MATRIX_SIZE; j++){
          for(var i = 0; i < MATRIX_SIZE-1; i++){
            if(matrix1[i][j].value !== 0){ 
              if(matrix1[i][j].value === matrix1[i+1][j].value && matrix1[i][j].flag === 0 && matrix1[i+1][j].flag === 0){
                matrix1[i+1][j].value = matrix1[i+1][j].value*2;
                matrix1[i][j].value = 0;
                matrix1[i+1][j].flag = 1;
                moved = 1;
                }
              else if(matrix1[i+1][j].value === 0){
                matrix1[i+1][j] = matrix1[i][j];
                matrix1[i][j] = new Tile(i,j,0);
                moved = 1;
                }
              else if(matrix1[i+1][j].value !== 0) continue;
            }
          }
        }
        // parcurg pentru a scapa de spatiile goale ( VALUE = 0)
        for( var j = 0; j < MATRIX_SIZE; j++)
          for( var i = MATRIX_SIZE-1; i > 0 ; i--)
            if(matrix1[i][j].value === 0 && matrix1[i-1][j].value !== 0){
              matrix1[i][j] = matrix1[i-1][j];
              matrix1[i-1][j] = new Tile(i,j,0);
              moved = 1;
              if(matrix1[i+1][j] && matrix1[i+1][j].value === 0){
                matrix1[i+1][j] = matrix1[i][j];
                matrix1[i][j] = new Tile(i,j,0);
              }
            }
          matrix2 = clone(matrix1);
        if(moved === 1)
          insertTile(matrix1);
        break;
      };
  position = compareElements(matrix1,matrix2);
  console.log(position + 'in move');
  console.log(matrix2);
  console.log(matrix1);
  draw(matrix1, position);
};

var draw = function(matrix, position){
    $('.container').empty();
    //console.log(position[0][0]);
  for(i = 0; i < MATRIX_SIZE; i++){
    for(j = 0; j < MATRIX_SIZE; j++)
      if(matrix[i][j].value !== 0){
        if(i === position[0][0] && j === position[0][1]){
         // console.log(position[0][1]);
        
        $('<div class="tile val'+matrix[i][j].value+'" style="display:none">'+matrix[i][j].value+'</div>').appendTo('.container').fadeIn(1000);
        }else
        $('<div class="tile val'+matrix[i][j].value+'" >'+matrix[i][j].value+'</div>').appendTo('.container');
      }
      else
        $('.container').append('<div class="tile val'+matrix[i][j].value+'"></div>')
    $('.container').append('<br/>')
  }
};

function compareElements(matrix1, matrix2){

  var position = new Array(1);
     position[0] = new Array(2);
  for(var i = 0; i < MATRIX_SIZE; i++)
    for(var j = 0; j < MATRIX_SIZE; j++){
      if(matrix1[i][j].value !== matrix2[i][j].value){
        position[0][0] = i;
        position[0][1] = j;
       }}
      console.log(position[0][0]+"in functie");

      return position;
};

function clone(existingArray) {
   var newObj = (existingArray instanceof Array) ? [] : {};
   for (i in existingArray) {
      if (i == 'clone') continue;
      if (existingArray[i] && typeof existingArray[i] == "object") {
         newObj[i] = clone(existingArray[i]);
      } else {
         newObj[i] = existingArray[i]
      }
   }
   return newObj;
}