var startTime=$.now();

var questionCount = 10;
var testLengthMinutes = 1;
var testLengthSeconds = 0;
var itemsInResultLlist = 10;

// Weights for generating random numbers from 0 to 9
var weigths=[0,1,2,5,6,4,8,8,8,6]

var questions = '';

$(document).ready(function() {
  drawStartButton('Aloita koe');
});

function initAndStartTest() {
  initQuestions();
  var content = getExamRows();
  $('#exam').html(content);
  $("#examForm" ).submit(submitExam);
  $("#startTestButton").hide();
  $('#examResult').hide();
  $('#results').hide();
  $('#submitButton').show();
  doStartCountdown();
}

function doStartCountdown() {
  var now = new Date();
  startCountdown(testLengthMinutes, testLengthSeconds, $('#countdown'), onCountdownFinish);
}

function onCountdownFinish(event) {
  //$('#countdown').text('Aika loppui.');
  submitExam(null);
}

function getExamRows() {
  var content = getExamStart();
  var taskDataTemplate = jQuery.validator.format(getExamRowTemplate());
  for (var i = 0; i < questions.length; i++) {
    content += taskDataTemplate(i, questions[i].firstNumber, questions[i].secondNumber);
  }
  content += getExamEnd();
  return content;
}

function validateQuestionNotOnList(questions, num1, num2) {
  for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    if (question.firstNumber === num1 && question.secondNumber === num2) {
      return false;
    }
  }
  return true;
}

function initQuestions() {
  questions = [];
  for (var i = 0; i < questionCount; i++) {
    var num1 = getRandom();
    var num2 = getRandom();
    while (validateQuestionNotOnList(questions, num1, num2) === false) {
      num1 = getRandom();
      num2 = getRandom();
    }
    var result = num1 * num2;
    questions[i] = {
      "firstNumber": num1,
      "secondNumber": num2,
      "correctAnswer": result,
      "answer": ""
    }
  }
}

function submitExam(event) {
  stopCountdown();
  $('#submitButton').hide();
  $('#countdown').text('Koe on päättynyt, käytit aikaa ' + getExamLengthMessage() +'.');

  for (var i = 0; i < questionCount; i++) {
    var answer = $("#examForm").find( "input[name='answer_" + i + "']"  ).attr("disabled", true);
  }
  var correctCount = 0;
  for (var i = 0; i < questionCount; i++) {
    var answer = $("#examForm").find( "input[name='answer_" + i + "']"  ).val()
    var answerLogginTemplate = jQuery.validator.format("Answer for {0} * {1} : {2}, expected {3}");
    var failureTemplate = jQuery.validator.format("Väärin! Vastaus on {0}");
    if (answer == questions[i].correctAnswer) {
      correctCount++;
      $("#resultOk_" + i).append("<img id='correct' src='images/correct.jpg' alt='Oikein' />");
    } else {
      $("#resultOk_" + i).append("<img id='incorrect' src='images/incorrect.jpg' alt='Väärin' title='Oikea vastaus on " + questions[i].correctAnswer + "' />");
    }
    drawStartButton('Aloita uusi koe');
  }
  $('#examResult').text(getFeedback(correctCount));
  $('#examResult').show();
  if (event != null) {
    event.preventDefault();
  }

  if (!window.localStorage.getItem('results')) {
    window.localStorage.setItem('results', JSON.stringify([]));
  }
  var dateString = getDateString()
  var resultObject = { date: dateString, result: "" + correctCount + "/" + questionCount };
  var resultArr = JSON.parse(window.localStorage.getItem('results'));
  resultArr.unshift(resultObject);
  resultArr = resultArr.slice(0, itemsInResultLlist);
  window.localStorage.setItem('results', JSON.stringify(resultArr));
  resultArr = JSON.parse(window.localStorage.getItem('results'));
  var resultHistory = getResultHistory(resultArr);
  $('#results').html(resultHistory);
  $('#results').show();
}

function getRandom() {
  return nextInt(weigths);
}

function drawStartButton(buttonLabel) {
  $('#startTest').html("<button id='startTestButton'>" + buttonLabel + "</button>");
  $("#startTestButton").click(function() {
    initAndStartTest();
  });
  $("#startTestButton").show();
}

function getDateString() {
  var d = new Date();
  return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
      + ":" + ("0" + d.getSeconds()).slice(-2);

}