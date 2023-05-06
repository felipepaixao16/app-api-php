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
  //Vetor de cursos
  vetor: Curso[];

  //Objeto da classe Curso
  curso = new Curso();

  //O "binding de interpolação", é quando eu quero exibir essa informação, então
  //eu pego uma informação em TypeScript e mando para o HTML.
  // -> nome: string = "Felipe";

  //Construtor
  constructor(private curso_servico:CursoService) {}

  //Inicializador
  ngOnInit() {
    //Ao iniciar o sistema, deverá listar os cursos
    this.selecao();
  }

  //Cadastro
  cadastro(){
    this.curso_servico.cadastrarCurso(this.curso).subscribe(
      (res: Curso[]) => {
        
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
  alterar():void {
    alert("Alterar");
  }

  //Remover
  remover():void {
    alert("Remover");
  }
}
