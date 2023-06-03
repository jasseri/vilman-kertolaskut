var timerId;
var targetDate;
var startDate;
var endDate;

function startCountdown(minutes, seconds, updateElement, onFinishFunction) {
  startDate = new Date();
  var minutesAsMillis = 60 * 1000 * minutes;
  var secondsAsMillis = 1000 * seconds;
  var millisNow = new Date().getTime();
  var futureMillis = minutesAsMillis+secondsAsMillis+millisNow;
  targetDate = new Date(futureMillis);
  timerId = setInterval(function() {
    update(updateElement, onFinishFunction);
  }, 1000);
}

function update(updateElement, onFinishFunction) {
  var currentDate = new Date().getTime();
  var secondsLeft = (targetDate.getTime() - currentDate) / 1000;
  if (secondsLeft <= 0) {
    updateElement.text('Valmis');
    stopCountdown();
    onFinishFunction();
  } else {
    minutes = parseInt(secondsLeft / 60);
    seconds = parseInt(secondsLeft % 60);
    updateElement.text(minutes + " minuuttia, " + seconds + " sekuntia");
  }
}

function getExamLengthMessage() {
  var secondsSpent = (endDate.getTime() - startDate.getTime()) / 1000;
  minutes = parseInt(secondsSpent / 60);
  seconds = parseInt(secondsSpent % 60);
  return minutes + " minuuttia, " + seconds + " sekuntia";
}

function stopCountdown() {
    endDate = new Date();
	  clearInterval(timerId);
	  timerId = null;
}
