import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';


describe('Validando o AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        FormsModule,
        MatPaginatorModule,
        FlexLayoutModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('Deve criar o aplicativo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`Deve validar o título 'github-api'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('github-api');
  });

  it('deve validar o retorno da API do github', async() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const element = fixture.nativeElement;
    const searchInput: HTMLInputElement = element.querySelector("#search");
    const submitButton: HTMLButtonElement = element.querySelector("#button-search");
   
    spyOn(component, 'getList');    
    searchInput.value = 'felipeit';
    
    searchInput.dispatchEvent(new Event('input'));
    submitButton.click();
    
    fixture.whenStable().then(() => {
      expect(component.getList).toHaveBeenCalled();
    })
  });
});
