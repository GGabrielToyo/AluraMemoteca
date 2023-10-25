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
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {

    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  carregarMaisPensamentos(): void {
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe(listarPensamentos => {
      this.listaPensamentos.push(...listarPensamentos);
      if (!listarPensamentos.length) {
        this.haMaisPensamentos = false;
      }
    });
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 1;

    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos
    });
  }

  listarPensamentosFavoritos(): void {
    this.titulo = 'Meus Favoritos';
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.favoritos = true;

    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentosFavoritos => {
      this.listaPensamentos = listaPensamentosFavoritos;
      this.listaFavoritos = listaPensamentosFavoritos;
    });
  }

  recarregarPensamentos(): void {
    this.titulo = 'Meu Mural';
    this.paginaAtual = 1;
    this.filtro = '';
    this.haMaisPensamentos = true;
    this.favoritos = false;

    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos;
    });
  }

}
