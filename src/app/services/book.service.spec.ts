import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BookService } from "./book.service";
import { TestBed } from "@angular/core/testing";
import { Book } from "../models/book.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

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

const bookToAdd: Book = {
  name: 'Book A',
  author: 'Author A',
  isbn: 'ISBN A',
  description: 'Description A',
  photoUrl: 'Photo A',
  price: 10,
  amount: 1, // Ensure that amount is set to 1
};


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

    // Resetear el storage siempre
    storage = {};

    // Simula el comportamiento de localStorage.getItem para controlar lo que devuelve el método durante las pruebas.
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storage[key] ? JSON.stringify(storage[key]) : null;
    });

    // Simula el comportamiento de localStorage.setItem
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      return storage[key] = value;
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

  it('public addBookToCart(): void, should add a book to an empty cart', () => {

    const toast = {
      fire: () => null
    } as any;

    const spy1 = spyOn(Swal, 'mixin').and.callFake( () => {
      return toast;
    });

    let listBooks = _bookService.getBooksFromCart();
    expect(listBooks.length).toBe(0);

    _bookService.addBookToCart(bookToAdd);

    listBooks = _bookService.getBooksFromCart();

    expect(spy1).toHaveBeenCalled();
  });

  it('public removeBooksFromCart(), should clear the cart in localStorage', () => {
    // Simula que hay libros en el carrito
    storage['listCartBook'] = [
      {
        id: 1,
        name: 'Book A',
        author: 'Author A',
        isbn: 'ISBN A',
        description: 'Description A',
        photoUrl: 'Photo A',
        price: 10,
        amount: 1,
      },
      {
        id: 2,
        name: 'Book B',
        author: 'Author B',
        isbn: 'ISBN B',
        description: 'Description B',
        photoUrl: 'Photo B',
        price: 20,
        amount: 2,
      },
    ];

    _bookService.removeBooksFromCart();

    const cart = storage['listCartBook'];

    expect(cart).toBeNull(); // Se espera que 'listCartBook' esté configurado como null
  });

})
