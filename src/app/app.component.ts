
import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  displayedColumns: string[] = ['name', 'language', 'created_at'];

  constructor(private http: HttpClient) {}

  name = "";
  title = 'github-api';
  public repositories = "";
  public pageSlice = "";

  getList() {
    /**
     * retorna a lista do repositorios do usuários informado.
     */
    console.log(this.name);
    let url = "https://api.github.com/users/" + this.name + "/repos";
    if (this.repositories) { this.pageSlice = ""; }
    this.http.get(url).subscribe((data: any) => {
      this.repositories = data;
      this.pageSlice = this.repositories.slice(0, 3)

    }, error => {
      alertify.error(error.error.message)
    });

  }

  OnPageChange(event: PageEvent) {
    /**
     * cria a logica de paginação.
     */
    console.log(event)
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.repositories.length) {
      endIndex = this.repositories.length;
    }
    this.pageSlice = this.repositories.slice(startIndex, endIndex)
  }

}

