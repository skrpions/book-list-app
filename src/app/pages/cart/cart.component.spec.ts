import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { BookService } from 'src/app/services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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

    // Configure the test
    beforeEach (async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [CartComponent],
            providers: [BookService]
        }).compileComponents();
    });

    // Instance the component
    beforeEach (() => {
      fixture = TestBed.createComponent(CartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  /* public getTotalPrice(listCartBook: Book[]): number {
    let totalPrice = 0;
    listCartBook.forEach((book: Book) => {
      totalPrice += book.amount * book.price;
    });
    return totalPrice;
  } */

  it('getTotalPrice() should return an amount', () => {

    const totalPrice = component.getTotalPrice(listBooks);
    expect(totalPrice).toBeGreaterThan(0); // El valor retornado es mayor que cero
    expect(totalPrice).not.toBeNull(); // El valor retornado no es null
  });

  it('getTotalPrice() should return 0 for an empty list of books', () => {
    const totalPrice = component.getTotalPrice([]);
    expect(totalPrice).toBe(0);
  });

  it('getTotalPrice() should return the correct total price for a list of books', () => {
    const totalPrice = component.getTotalPrice(listBooks);
    expect(totalPrice).toEqual(5);
  });

})
