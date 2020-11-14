import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizBack } from './quizback';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  url = 'http://127.0.0.1:3000/quiz' ;
  constructor(private http: HttpClient) { }
  getAllQuiz(): Observable<QuizBack[]> {
    return this.http.get<QuizBack[]>(`${this.url}/getAll`);
  }
  getQuiz(id: string): Observable<QuizBack> {
    return this.http.get<QuizBack>(`${this.url}/getQuiz/${id}`);
  }
  createQuiz(quiz: QuizBack): Observable<QuizBack> {
    return this.http.post<QuizBack>(`${this.url}/create/`, {quiz});
  }
  updateQuiz(id: string, quiz: QuizBack): Observable<any> {
    return this.http.post<any>(`${this.url}/update/${id}`, {quiz});
  }
  startQuiz(iduser: string, idquiz: string) {
    this.http.post(`${this.url}/startQuiz/${iduser}/${idquiz}`, {});
  }
}
