import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 0;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {

    this.service.listar(this.paginaAtual, this.filtro).subscribe(page => {
      this.listaPensamentos = page.content;
    });
  }

  carregarMaisPensamentos(): void {
    this.service.listar(++this.paginaAtual, this.filtro).subscribe(page => {
      this.listaPensamentos.push(...page.content);
      if (page.numberOfElements == 0) {
        this.haMaisPensamentos = false;
      }
    });
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 0;

    this.service.listar(this.paginaAtual, this.filtro).subscribe(page => {
      this.listaPensamentos = page.content;
    });
  }

  listarPensamentosFavoritos(): void {
    this.titulo = 'Meus Favoritos';
    this.haMaisPensamentos = true;
    this.paginaAtual = 0;

    this.service.listarFavoritos().subscribe(pensamentos => {
      this.listaPensamentos = pensamentos;
    });
  }

  recarregarPensamentos(): void {
    this.titulo = 'Meu Mural';
    this.paginaAtual = 0;
    this.filtro = '';
    this.haMaisPensamentos = true;

    this.service.listar(this.paginaAtual, this.filtro).subscribe(page => {
      this.listaPensamentos = page.content;
    });
  }

}
