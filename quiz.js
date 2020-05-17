"use strict";
class Questions {
  constructor(_question, _choose, _answer) {
    this.question = _question;
    this.choose = _choose;
    this.answer = _answer;
  }
}

class Quiz {
  constructor(_quizList) {
    this.questionList = _quizList;
    this.score = 0;
    this.questionIndex = 0;
  }
}

let chooseButtonClick = document.querySelector("#choose");
chooseButtonClick.addEventListener('click', chooseClick);

//Cevaplarım doğru mu değil mi onu kontol eder.
Questions.prototype.Answer = function (x) {
  return this.answer == x;
};

//Soruları getirir.
Quiz.prototype.getQuestions = function () {
  return this.questionList[this.questionIndex];
};

//Test bitti mi?
Quiz.prototype.isFinish = function () {
  //Skoru yazdırırız.
  if (quiz.score < 0) quiz.score = 0;
  document.getElementById("skor").innerHTML = `Skorunuz : ${quiz.score}`;
  return this.questionList.length == this.questionIndex;
};

const q1 = new Questions("1) En küçük çift sayı kaçtır ?", [0, 1, 2, 4], 0);
const q2 = new Questions("2) En küçük tek sayı kaçtır ?", [0, 1, 2, 9], 1);
const q3 = new Questions("3) En büyük çift sayı kaçtır ?", [0, 1, 2, 12], 12);
const q4 = new Questions("4) En büyük tek sayı kaçtır ?", [0, 1, 15, 22], 15);

const dizi = [q1, q2, q3, q4];
const quiz = new Quiz(dizi);

let correct = 0;
let incorret = 0;
function nextQuestion() {
  //Choose divinin bütün child'lerini sildik.
  let chooseButtons = document.getElementById("choose");
  while (chooseButtons.firstChild) {
    chooseButtons.removeChild(chooseButtons.firstChild);
  }

  let qList = quiz.getQuestions();
  let chooseList = qList.choose;

  //Soruyu yazdırırız.
  document.querySelector("#question").textContent = qList.question;

  //Cevapları create element ile bir p oluşturup, içerisine yazarız.
  chooseList.forEach((element) => {
    var chooseAnswer = document.createElement("button");
    var textnode = document.createTextNode(element);
    chooseAnswer.appendChild(textnode);
    document.getElementById("choose").appendChild(chooseAnswer);
  });
}

  //Cevap butonlarından herhangi birine tıklarız.
  function chooseClick(e){
    quiz.questionIndex++;
    let result = dizi[quiz.questionIndex - 1].Answer(e.target.innerText);
    if (result) {
      quiz.score += 10; //cevap doğru ise score +10 puan
      correct++;
    } else {
      quiz.score -= 10; // yalnış ise -10 puan
      incorret++;
    }

    document.getElementById(
      "result"
    ).innerHTML = `doğru sayınız : ${correct} <br>
     yalnış sayınız : ${incorret}`;

    let isFinish = quiz.isFinish(); // Sorular bitti mi ?
    if (isFinish) {
      //Quiz bittiğinde soruyu DOM'dan kaldırdık.
      const question = document.getElementById("question");
      while (question.firstChild) {
        question.removeChild(question.firstChild);
      }
      //Choose divinin bütün child'lerini sildik.
      const chooseButtons = document.getElementById("choose");
      while (chooseButtons.firstChild) {
        chooseButtons.removeChild(chooseButtons.firstChild);
      }

      if (quiz.score >= 20)
        document.getElementById("success").innerHTML = "BAŞARILI";
      else document.getElementById("success").innerHTML = "BAŞARISIZ";
    } 
    else nextQuestion();
  };
nextQuestion();
