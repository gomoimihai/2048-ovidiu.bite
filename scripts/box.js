// see matrix in browser
var Go = function(direction) {
  move(matrix, direction);
};

$(document).ready(function(){
	Go('startGame');
	$(document).keydown(function(key){
      

      switch(parseInt(key.which,10)) {
       // left Arrow
      case 37:
        Go('left');
        break;
      case 38:
        Go('up');
        break;
      case 39:
      	Go('right');
      	break;
      case 40:
        Go('down');
        break;

      }
  });
});


var ar=new Array(37,38,39,40);

// $(document).keydown(function(e) {
//      var key = e.which;
//       //console.log(key);
//       //if(key==35 || key == 36 || key == 37 || key == 39)
//       if($.inArray(key,ar) > -1) {
//           e.preventDefault();
//           return false;
//       }
//       return true;
// });