$(document).ready(function(){
	if(localStorage.getItem("matrix")){
    gameMatrix.matrix = JSON.parse(localStorage.getItem("matrix"));
    totalScore = JSON.parse(localStorage.getItem("score"));
    if(localStorage.getItem("leftUndo"))
      x = JSON.parse(localStorage.getItem("leftUndo"));
  }
  else
    startGame();
    draw(gameMatrix.matrix);

  var undoMatrix = clone(gameMatrix.matrix);
  undoTag.html('Undo ('+x+')');
    $('#restartGame').click(function(){
      gameMatrix.matrix = restartGame();
      startGame();
      draw(gameMatrix.matrix);
      $('.score').html('Score' + '<p>'+totalScore+'</p>');
      undoTag.html('Undo ('+x+')');
      undoMatrix.length = 0;

    }); 
   undoTag.click(function(){
    if(x>0){
      gameMatrix.matrix = undo();
      draw(gameMatrix.matrix);
      x--;
      undoTag.html('Undo ('+x+')');
      if(x === 0)
         undoTag.attr("disabled", "disabled");
   }    
   localStorage.setItem('leftUndo', JSON.stringify(x));
  }); 

  	$(document).keydown(function(key){
    switch(parseInt(key.which,10)) {
       // left Arrow
      case 37:
        stopScroll();
        undoMatrix = clone(gameMatrix.matrix); 
        moveLeft(gameMatrix.matrix);
        localStorage.setItem('matrix', JSON.stringify(gameMatrix.matrix));
        break;
      case 38:
        stopScroll();
        undoMatrix = clone(gameMatrix.matrix); 
        moveUp(gameMatrix.matrix);
        localStorage.setItem('matrix', JSON.stringify(gameMatrix.matrix));
        break;
      case 39:
        stopScroll();
        undoMatrix = clone(gameMatrix.matrix); 
       	moveRight(gameMatrix.matrix);
        localStorage.setItem('matrix', JSON.stringify(gameMatrix.matrix)) ;
        break;
      case 40:
        stopScroll();
        undoMatrix = clone(gameMatrix.matrix); 
        moveDown(gameMatrix.matrix);
        localStorage.setItem('matrix', JSON.stringify(gameMatrix.matrix) );
        break;
      case 27:
        gameMatrix.matrix = restartGame();
        startGame();
        draw(gameMatrix.matrix);
      }
    gameOver(gameMatrix.matrix);
        
  });
});
