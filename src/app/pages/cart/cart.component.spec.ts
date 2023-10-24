import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { BookService } from 'src/app/services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Book } from 'src/app/models/book.model';

const listBooks: Book[] = [
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

describe('CartComponent', () => {

    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let _bookService: BookService;

    // Configure the test
    beforeEach (async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [CartComponent],
            providers: [BookService]
        }).compileComponents();
    });

    /*
      ngOnInit(): void {
        this.listCartBook = this._bookService.getBooksFromCart();
        this.totalPrice = this.getTotalPrice(this.listCartBook);
      }
    */

    // Instance the component
    beforeEach (() => {
      fixture = TestBed.createComponent(CartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // Instantiate the services in each iteration
      _bookService = fixture.debugElement.injector.get(BookService);

      // Útil para evitar que el ngOnInit de la clase no llame directamente al service getBooksFromCart()
      spyOn(_bookService, 'getBooksFromCart').and.callFake(() => listBooks)
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('public getTotalPrice(listBooks): number, should return an amount', () => {

    const totalPrice = component.getTotalPrice(listBooks);
    expect(totalPrice).toBeGreaterThan(0); // El valor retornado es mayor que cero
    expect(totalPrice).not.toBeNull(); // El valor retornado no es null
  });

  it('public getTotalPrice(listBooks): number, should return 0 for an empty list of books', () => {
    const listCartBook: Book[] = [];
    const totalPrice = component.getTotalPrice(listCartBook);
    expect(totalPrice).toBe(0);
  });

  it('public onInputNumberChange(action, book): void, should increase the amount of the book when the plus button is clicked', () => {
    const action = 'plus';
    const book = {
      name: 'a',
      author: 'a',
      isbn: 'a',
      description: 'a',
      photoUrl: 'a',
      price: 1,
      amount: 2,
    };

    const spy1 = spyOn(_bookService,'updateAmountBook').and.callFake(() => null); // El spy estará pendiente  del servicio (updateAmountBook) y además, le hará una llamada falsa
    const spy2 = spyOn(component,'getTotalPrice').and.callFake(() => null); // El spy estará pendiente del servicio (getTotalPrice) y además, le hará una llamada falsa


    component.onInputNumberChange(action, book); // Llamo a la funciona onInputNumberChange del service

    //expect(book.amount).toBe(3); // Verifico que amount del libro se haya incrementado a 3
    expect(book.amount === 3).toBeTrue(); // Verifico que el valor de amount del book es igual a 3. Sí incrementó
    expect(spy1).toHaveBeenCalled(); // El spy1 ha sido llamado correctamente
    expect(spy2).toHaveBeenCalled(); // El spy2 ha sido llamado correctamente
  });

  it('public onInputNumberChange(action, book): void, should decrease the amount of the book when the minus button is clicked', () => {
    const action = 'minus';
    const book = {
      name: 'a',
      author: 'a',
      isbn: 'a',
      description: 'a',
      photoUrl: 'a',
      price: 1,
      amount: 2,
    };

    const spy1 = spyOn(_bookService,'updateAmountBook').and.callFake(() => null); // El spy estará pendiente  del servicio (updateAmountBook) y además, le hará una llamada falsa
    const spy2 = spyOn(component,'getTotalPrice').and.callFake(() => null); // El spy estará pendiente del servicio (getTotalPrice) y además, le hará una llamada falsa

    component.onInputNumberChange(action, book); // Llamo a la funciona onInputNumberChange del service

    expect(book.amount === 1).toBeTrue(); // Verifico que el valor de la propiedad amount del book es igual a 1: Sí Decrementó
    expect(spy1).toHaveBeenCalled(); // El spy1 ha sido llamado correctamente
    expect(spy2).toHaveBeenCalled(); // El spy2 ha sido llamado correctamente

  });

  /* public onClearBooks(): void {
    if (this.listCartBook && this.listCartBook.length > 0) {
      this._clearListCartBook();
    } else {
       console.log("No books available");
    }
  }

  private _clearListCartBook() {
    this.listCartBook = [];
    this._bookService.removeBooksFromCart();
  } */

  it('public onClearBooks(): void, should works correctly', () => {

    const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();
    const spy2 = spyOn(_bookService, 'removeBooksFromCart').and.callFake(() => null);

    component.listCartBook = listBooks;
    component.onClearBooks();

    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  /* private _clearListCartBook() {
    this.listCartBook = [];
    this._bookService.removeBooksFromCart();
  } */

  it('private _clearListCartBook(): void, should works correctly', () => {

    const spy1 = spyOn(_bookService, 'removeBooksFromCart').and.callFake(() => null);

    component.listCartBook = listBooks;
    component['_clearListCartBook'](); // Invoco al metodo privado

    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalled();
  });

})
