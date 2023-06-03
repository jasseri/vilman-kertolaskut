var numbers=[0,1,2,3,4,5,6,7,8,9];
var totalweight;
var weighednumbers;

function nextInt(numweight) {
  initRandom(numweight);
  var randomnumber=Math.floor(Math.random()*totalweight);
  return weighednumbers[randomnumber];
}

function initRandom(numweight) {
  totalweight=eval(numweight.join("+"));
  weighednumbers=new Array();
  var currentnumber=0;

  while (currentnumber<numbers.length) {
    for (i=0; i<numweight[currentnumber]; i++) {
      weighednumbers[weighednumbers.length]=numbers[currentnumber];
    }
    currentnumber++;
  }
}
