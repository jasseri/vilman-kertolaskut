var name = 'Vilma';

function getExamStart() {
  return '<form id="examForm" class="form-horizontal" action="">';
}

function getExamRowTemplate() {
  return '<div class="form-group"><label for="answer_{0}">{1} * {2} = </label><input type="number" class="inputField" id="answer_{0}" name="answer_{0}" /><span id="resultOk_{0}"></span></div>';
}

function getExamEnd() {
  return '<button type="submit" id="submitButton" class="btn btn-primary">Tarkista</button>';
}

function getFeedback(correctCount) {
  var message = 'Sait oikein ' + correctCount + '/10. ';
  if (correctCount>=9) {
    message += 'Erinomaista, ' + name + '! Olet mestari!';
  } else if (correctCount>=7) {
    message += 'Hyvin menee, ' + name + '! Lisää treeniä vaan.';
  } else if (correctCount<7) {
    message += 'Ei muuta kuin uutta yritystä, eikö niin?';
  }
  return message;
}

function getResultHistory(results) {
  console.log('getResultHistory - results:');
  console.log(results);
  var tableString = '<table class="table"><thead><tr><th>Aika</th><th>Tulos</th></tr></thead><tbody>';
  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    tableString += '<tr><td>' + result.date + '</td><td>' + result.result + '</td></tr>';
  }
  tableString += '</tbody></table>';
  console.log(tableString);
  return tableString;
  // results.forEach(result => tableString += '<tr><td>' + result.date + '</td><td>' + result.result + '</td></tr>);

}
