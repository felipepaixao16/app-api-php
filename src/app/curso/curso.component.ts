import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  //O "bind de interpolação", é quando eu quero exibir essa informação, então
  //eu pego uma informação em TypeScript e mando para o HTML.
  nome: string = "Felipe";

  //Construtor
  constructor() {}

  //Inicializador
  ngOnInit() {
    window.alert("Hello World!");
  }
}
