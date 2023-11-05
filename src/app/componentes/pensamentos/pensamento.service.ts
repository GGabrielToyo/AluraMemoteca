import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, Pensamento } from './pensamento';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:8080/pensamentos';


  constructor(private http: HttpClient) { }

  listar(pagina: number, filtro: string): Observable<Page> {
    const itensPorPagina = 3;

    

    let params = new HttpParams()
      .set("size", itensPorPagina)
      .set("page", pagina)


    if (filtro.trim().length > 2) {
      params = params.set("q", filtro);
    }

    return this.http.get<Page>(this.API, { params });
  }

  listarFavoritos(): Observable<Pensamento[]> {
    const url = `${this.API}/favoritos`;
    return this.http.get<Pensamento[]>(url);
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;

    return this.http.delete<Pensamento>(url);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    //const url = `${this.API}/${pensamento.id}`;
    //return this.http.put<Pensamento>(url, pensamento);

    const url = `${this.API}/editar`;
    return this.http.put<Pensamento>(url, pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;

    return this.editar(pensamento);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;

    return this.http.get<Pensamento>(url);
  }


}
