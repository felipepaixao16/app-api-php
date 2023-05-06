//Classe = em toda classe podemos ter um "atributos"
export class Curso{

    //Atributos = dentro dos colchetes (), colocamos as informações obrigatorias, que serão com certeza manipuladas
    // a interrogação ?, é interpretada pelo programa dizendo que essa informação pode ou não existir
    constructor(public nomeCurso:string, public valorCurso:number, public idCurso?:number){};
}