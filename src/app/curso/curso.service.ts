//É aqui que é estipulado toda regra de negócio entre o php e o angular
import { HttpClient, HttpParams } from '@angular/common/http';
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
  vetor! : Curso[];

  //Construtor = O http foi criado para ter acesso ao banco de dados
  constructor(private http: HttpClient) { }

  //Obter todos os cursos
  obterCursos():Observable<Curso[]>{
    //primeiro especificamos o local onde vamos ter acesso ao curso(http) = this.http.get()
    //segundo passamos qual arquivo vamos utilizar = this.url+"listar"
    return this.http.get(this.url + "listar").pipe(
      map((res: any) => { // altera a tipagem para any
        if ('cursos' in res) { // verifica se a propriedade cursos existe
          this.vetor = res['cursos'];
        } else {
          this.vetor = [];
        }
        return this.vetor;
      })
    )
  }

  cadastrarCurso(c: Curso): Observable<any> {
    return this.http.post(this.url + 'cadastrar', { cursos: c })
      .pipe(map((res: any) => {
        this.vetor.push(res['cursos']);
        return this.vetor;
      }))
  }

  //Remover curso
  removerCurso(c: Curso): Observable<Curso[]>{

    const params = new HttpParams().set("idCurso", c.idCurso?.toString() ?? '');


    return this.http.delete(this.url+'excluir', {params: params})
    .pipe(map((res) => {
      const filtro = this.vetor.filter((curso) => {
        return curso && curso['idCurso'] !== +c.idCurso!;
      });
      
      return this.vetor = filtro;

    }))
  }

  //Atualizar curso
  atualizarCurso(c:Curso): Observable<Curso[]>{

    //Executa a alteração via URL
    return this.http.put(this.url+'alterar', {cursos: c})
    //Percorrer o vetor para saber qual é o id do curso alterado
    .pipe(map((res) => {
      const cursoAlterado = this.vetor.find((item) => {
        return item && item['idCurso'] === c.idCurso;

      });

      //Altero o valor do vetor local
      if(cursoAlterado !== undefined) {
        cursoAlterado['nomeCurso'] = c['nomeCurso'];
        cursoAlterado['valorCurso'] = c['valorCurso'];
      }
      
      //Retorno
      return this.vetor;
    }))
  }
}
