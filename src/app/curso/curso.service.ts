//É aqui que é estipulado toda regra de negócio entre o php e o angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//O map serve para percorrer os objetos que vamos listar
import { map } from 'rxjs/operators';
import { Curso } from './curso';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class CursoService {
  //O httpClientModels é responsavel por criar a transição de informações de dados entre php e o angular, e virse-versa

  //URL
  url = "http://localhost/api-angular/php/";

  //Vetor = serve para termos o acesso aos dados e poder amarzenar e exibir ao cliente
  vetor:Curso[] = [];

  //Construtor = O http foi criado para ter acesso ao banco de dados
  constructor(private http: HttpClient) { }

  //Obter todos os cursos
  obterCursos():Observable<Curso[]>{
    //primeiro especificamos o local onde vamos ter acesso ao curso(http) = this.http.get()
    //segundo passamos qual arquivo vamos utilizar = this.url+"listar"
    return this.http.get(this.url+"listar").pipe(
      map((res) => {
        //aqui estamos capturando todos os dados
        this.vetor = res['cursos'];
        return this.vetor;
      })
    )
  }

  cadastrarCurso(c:Curso): Observable<Curso[]> {
    return this.http.post(this.url+'cadastrar', {cursos:c})
    .pipe(map((res) => {
      this.vetor.push(res['cursos']);
      return this.vetor;
    }))
  }
}
