import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  url = 'http://127.0.0.1:3000/question' ;
  constructor(private http: HttpClient) { }
  getAllQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.url}/getAll`);
  }
  getQuestion(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.url}/getQuestion/${id}`);
  }
  createQuestion(idquiz: string, question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.url}/create/${idquiz}`, {question});
  }
  updateQuestion(id: string, question: Question): Observable<any> {
    return this.http.post<any>(`${this.url}/update/${id}`, {question});
  }
  getQuestionByQuiz(idquiz: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.url}/getquestionsByquiz/${idquiz}`);
  }
  answerQuestionRight(iduser: string, idquestion: string): Observable<any> {
    return this.http.post<any>(`${this.url}/answerQuestion/right/${iduser}/${idquestion}`, {});
  }
  answerQuestionWrong(iduser: string, idquestion: string): Observable<any> {
    return this.http.post<any>(`${this.url}/answerQuestion/wrong/${iduser}/${idquestion}`, {});
  }
}
