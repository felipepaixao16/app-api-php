import { HttpClient } from '@angular/common/http'; // Esse HttpClient só funciona por causa do import no app.module
                                                   // chamado HttpClientModule.
import { Component, OnInit } from '@angular/core'; 
import { CursoService } from './curso.service';
import { Curso } from './curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  //URL
  url = "http://localhost/api-angular/php/";

  //Vetor de cursos
  vetor!:Curso[];

  //Objeto da classe Curso
  curso = new Curso("", 0, null!);

  //O "binding de interpolação", é quando eu quero exibir essa informação, então
  //eu pego uma informação em TypeScript e mando para o HTML.
  // -> nome: string = "Felipe";

  //Construtor
  constructor(private curso_servico:CursoService) { }

  //Inicializador
  ngOnInit() {
    //Ao iniciar o sistema, deverá listar os cursos
    this.selecao();
  }

  //Cadastro
  cadastro(){
    this.curso_servico.cadastrarCurso(this.curso).subscribe(
      (res: Curso[]) => {
        
        //Adicionando dados ao vetor
        this.vetor = res;

        //Limpar os atributos
        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;
        

        //Atualizar a listagem
        this.selecao();
      }
    )
  }

  //Seleção
  selecao() {
    this.curso_servico.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    )
  }

  //Alterar
  alterar() {
    this.curso_servico.atualizarCurso(this.curso).subscribe(
      (res) => {

        //Atualizar vetor
        this.vetor = res;

        //Limpar os valores do objeto
        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;

        //Atualizar a listagem
        this.selecao();
      }
    )
  }

  //Remover
  remover() {
    this.curso_servico.removerCurso(this.curso).subscribe(
      (res : Curso[]) => {
        this.vetor = res;

        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;
      }
    )
  }

  //Selecionar curso especifico
  selecionarCurso(c:Curso){
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso; 
  }
}
