import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookService } from 'src/app/services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Book } from 'src/app/models/book.model';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';

const listDummyBooks: Book[] = [
  {
    name: 'a',
    author: 'a',
    isbn: 'a',
    description: 'a',
    photoUrl: 'a',
    price: 1,
    amount: 1,
  },
  {
    name: 'b',
    author: 'b',
    isbn: 'b',
    description: 'b',
    photoUrl: 'b',
    price: 2,
    amount: 2,
  },
];


describe('HomeComponent', () => {

    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let _bookService: BookService;

    // Configure the test
    beforeEach (async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [HomeComponent],
            providers: [ BookService ]
        }).compileComponents();
    });


    // Instance the component
    beforeEach (() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // Instantiate the services in each iteration
       _bookService = TestBed.inject(BookService);
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('public getBooks(): void, should call getBooks from the subscription and update listBook', () => {

    // Creo un espía al servicio _bookService en el método getBooks.
		// El espía permite realizar un seguimiento de las llamadas a este método y
    // cuando se llama a _bookService.getBooks(), el observable emitirá listDummyBooks
    // en lugar de realizar una llamada real al servicio.
    const spy1 = spyOn(_bookService, 'getBooks').and.returnValue(of(listDummyBooks));

    // Llamo a la función que deseo probar
    component.getBooks();

    // Verifico que el método getBooks del service ha sido llamado
    expect(spy1).toHaveBeenCalled();

    // Verifico que el listBook ha sido actualizado
    expect(component.listBook).toEqual(listDummyBooks);
    expect(component.listBook.length).toBe(2);
  });

})
