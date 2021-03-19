import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'language', 'created_at'];

  constructor(private http: HttpClient) {

  }
  name = "";
  title = 'github-api';
  public repositories = "";
  public pageSlice = "";

  getList() {
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
    console.log(event)
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.repositories.length) {
      endIndex = this.repositories.length;
    }
    this.pageSlice = this.repositories.slice(startIndex, endIndex)
    console.log(this.repositories);
  }

}

