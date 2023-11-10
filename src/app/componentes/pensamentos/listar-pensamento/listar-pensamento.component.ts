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
  favorito: boolean = false;

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {

    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe(page => {
      this.listaPensamentos = page.content;
    });
  }

  carregarMaisPensamentos(): void {
    this.service.listar(++this.paginaAtual, this.filtro, this.favorito).subscribe(page => {
      this.listaPensamentos.push(...page.content);
      if (page.numberOfElements == 0) {
        this.haMaisPensamentos = false;
      }
    });
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 0;

    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe(page => {
      this.listaPensamentos = page.content;
    });
  }

  listarPensamentosFavoritos(): void {
    this.titulo = 'Meus Favoritos';
    this.favorito = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 0;

    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe(page => {
      this.listaPensamentos = page.content;
    });
  }

  recarregarPensamentos(): void {
    this.titulo = 'Meu Mural';
    this.favorito = false;
    this.paginaAtual = 0;
    this.filtro = '';
    this.haMaisPensamentos = true;

    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe(page => {
      this.listaPensamentos = page.content;
    });
  }

}
