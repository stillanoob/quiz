import { Component, OnInit } from '@angular/core';
import { Level } from './level';
import { Question } from './question';
import { QuestionService } from './question.service';
import { Quiz} from './quiz';
import { QuizService } from './quiz.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-front';
  opened = false;
  public questions = [];
  public userid = '5faf40f46b85e13d1cbab2d8';
  public quizid = '5faf5ebcef6fff29180d8333';
  public progressbarvalue;
  public test: Quiz;
  public currentLevel: number;
  public essay = {};
  public progress: number;
  public lastlevel = false;
  public notlastlevel = !this.lastlevel;
  public loaded = false;
  constructor(private quizservice: QuizService, private snackbar: MatSnackBar, private questionservice: QuestionService) {
    this.progressbarvalue = 0;
    this.currentLevel = 0;

    /*this.test = new Quiz();
    this.test.questionPerLevel = 3;

    let questions = [];
    const q1 = new Question();
    q1.question = 'the first question';
    q1.reponses.push('the first choice');
    q1.reponses.push('the second choice');
    q1.reponses.push('the third choice');
    q1.correctReponse = 'the second choice';

    const q2 = new Question();
    q2.question = 'the second question';
    q2.reponses.push('the first choice');
    q2.reponses.push('the second choice');
    q2.reponses.push('the third choice');
    q2.correctReponse = 'the first choice';

    const q3 = new Question();
    q3.question = 'the third question';
    q3.reponses.push('the first choice');
    q3.reponses.push('the second choice');
    q3.correctReponse = 'the first choice';

    const q4 = new Question();
    q4.question = 'the fourth question';
    q4.reponses.push('the first choice');
    q4.reponses.push('the second choice');
    q4.reponses.push('the third choice');
    q4.correctReponse = 'the second choice';

    const q5 = new Question();
    q5.question = 'the fifth question';
    q5.reponses.push('the first choice');
    q5.reponses.push('the second choice');
    q5.reponses.push('the third choice');
    q5.correctReponse = 'the second choice';

    const q6 = new Question();
    q6.question = 'the sixth question';
    q6.reponses.push('the first choice');
    q6.reponses.push('the second choice');
    q6.correctReponse = 'the first choice';

    questions.push(q1);
    questions.push(q2);
    questions.push(q3);
    questions.push(q4);
    questions.push(q5);
    questions.push(q6);

    this.test.levels = this.levelsplitter(questions);*/

    this.gettingQuiz(this.quizid);
  }
  nextlevel(){
    let eligible = this.scoring();
    if(eligible){
      this.currentLevel++;
      this.lastlevel = ((this.test.levels.length-1) === this.currentLevel);
      this.notlastlevel = !this.lastlevel;
      console.log('next level', this.currentLevel);
      console.log(this.notlastlevel);
    }else{
      this.snackbar.open('You are not eligible to move to the next level', 'Close', {
        duration: 2000,
        verticalPosition: 'top'
      });
    }

  }
  gettingQuiz(quizid){
    this.quizservice.getQuiz(quizid).subscribe(
      (data) => {
        this.test = new Quiz();
        this.test.levelClearRate = data.levelClearRate;
        this.test.questionPerLevel = data.questionPerLevel;
        this.test.name = data.name;
        this.quizservice.startQuiz(this.userid, quizid);
        this.gettingQuestions(this.quizid);
      }
    );
  }
  gettingQuestions(quizid: string){
    this.questionservice.getQuestionByQuiz(quizid).subscribe(
      (data) => {
        this.questions = data;
        this.test.levels = this.levelsplitter();
        this.lastlevel = this.test.levels.length === this.currentLevel;
        this.notlastlevel = !this.lastlevel;
        this.loaded = true;
      }
    );
  }
  scoring(){
    let score = 0;
    let goodanswer = 1;
    let questions = this.test.levels[this.currentLevel].questions;

    for(let i=0; i<questions.length; i++){
      if(this.essay[questions[i].question]){
        score += goodanswer;
        this.questionservice.answerQuestionRight(this.userid, questions[i].id).subscribe(
          (data) => {
            console.log(data);
          }
        );
      }else{
        this.questionservice.answerQuestionWrong(this.userid, questions[i].id).subscribe(
          (data) => {
            console.log(data);
          }
        );
      }
    }
    return score >= this.test.levelClearRate;
  }
  levelsplitter() {
    let questions = this.questions;
    let levels=[];
    let numberOfQuestions = questions.length;
    let level: Level;
    for (let i = 0; i < numberOfQuestions; i++) {
      if ((i % this.test.questionPerLevel) === 0) {
        if (level !== undefined) {
          levels.push(level);
        }
        level = new Level();
      }
      level.questions.push(questions[i]);
    }
    levels.push(level);
    console.log(levels);
    return levels;
  }
  elementInputHandler(event: any) {
    let question: string;
    let reply: string;
    if (!(event.target instanceof HTMLInputElement)) {
      event.target.querySelectorAll('input')[0].checked = true;
      question = event.target.querySelectorAll('input')[0].name;
      reply = event.target.querySelectorAll('input')[0].value;

    } else {
      question = event.target.name;
      reply = event.target.value;
    }
    this.essay[question] = reply;
    console.log(this.essay);
  }
}
