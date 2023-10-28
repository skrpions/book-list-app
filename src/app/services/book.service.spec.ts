import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BookService } from "./book.service";
import { TestBed } from "@angular/core/testing";
import { Book } from "../models/book.model";
import { environment } from "src/environments/environment";

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

describe('BookService', () => {


  let _bookService: BookService;
  let httpMock: HttpTestingController;
  let storage = {};

  // Configure the test
  beforeEach (async () => {
      await TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [ BookService ]
      });
  });

  // Instantiate the services in each iteration
  beforeEach (() => {
    _bookService = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);

    // Simula el comportamiento de localStorage.getItem para controlar lo que devuelve el método durante las pruebas.
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storage[key] ? JSON.stringify(storage[key]) : null;
    });
  });

  // Evitar que no haya peticiones pendientes entre cada test
  afterEach (() => {
    httpMock.verify();
  });

  it('Should create service', () => {
    expect(_bookService).toBeTruthy();
  });

  it('public getBooks(): Observable<Book[]>, should return a list of books', () => {

    // Realiza una solicitud ficticia y configura la respuesta
    _bookService.getBooks().subscribe((books: Book[]) => {
      expect(books).toEqual(listDummyBooks);
    });

    const req = httpMock.expectOne(environment.API_REST_URL + `/book`); // Reemplaza 'URL de la solicitud' con la URL real de tu API
    expect(req.request.method).toBe('GET');

    // Simula la respuesta del servidor
    req.flush(listDummyBooks);
  });

  it('public getBooksFromCart(): Book[], should return an empty array if cart is empty', () => {

    const books = _bookService.getBooksFromCart();
    expect(books.length).toBe(0);
    expect(books).toEqual([]);
  });

   it('public getBooksFromCart(): Book[], should return books from the cart', () => {
    // Simula libros en el carrito (localStorage con datos válidos)
    storage['listCartBook'] = listDummyBooks;

    const books = _bookService.getBooksFromCart();

    expect(books).toEqual(listDummyBooks);
  });

})
