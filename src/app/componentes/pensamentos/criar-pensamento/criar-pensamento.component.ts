import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  pensamento = {
    id: 1,
    conteudo: 'Aprendendo angular',
    autoria: 'Dev',
    modelo: ''
  }

  constructor() {}

  ngOnInit(): void {
    
  }

  criarPensamento(): void {
    alert("Criando pensamentos");
  }

  cancelarPensamento(): void {
    alert("Cancelando Pensamento");
  }

}
