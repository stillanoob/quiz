import { Component, OnInit } from '@angular/core';
import { Level } from './level';
import { Question } from './question';
import { Quiz} from './quiz';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-front';
  opened = false;
  public progressbarvalue;
  public test: Quiz;
  public currentLevel: number;
  public essay = {};
  public progress: number;
  public lastlevel = false;
  public notlastlevel = !this.lastlevel;
  constructor(){
    this.progressbarvalue = 0;
    this.currentLevel = 0;
    this.test = new Quiz();
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

    this.test.levels = this.levelsplitter(questions);
    this.lastlevel = this.test.levels.length === this.currentLevel;
    this.notlastlevel = !this.lastlevel;
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
      alert('you are not elligable to move to the next level');
    }

  }
  scoring(){
    let score = 0;
    let goodanswer = 1;
    let questions = this.test.levels[this.currentLevel].questions;

    for(let i=0; i<questions.length; i++){
      if(this.essay[questions[i].question]){
        score += goodanswer;
      }
    }
    return score >= this.test.levelClearRate;
  }
  levelsplitter(questions:any){
    let levels=[];
    let numberOfQuestions = questions.length;
    let level: Level;
    for(let i = 0; i < numberOfQuestions; i++){
      if((i % this.test.questionPerLevel) === 0){
        if (level) {
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
    this.progressbarvalue = ((Object.keys(this.essay).length /
    this.test.levels[this.currentLevel].questions.length) * 100).toString() + '%';
  }
}
