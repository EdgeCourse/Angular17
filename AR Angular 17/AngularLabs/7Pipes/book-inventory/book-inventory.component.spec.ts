/*
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInventoryComponent } from './book-inventory.component';

describe('BookInventoryComponent', () => {
  let component: BookInventoryComponent;
  let fixture: ComponentFixture<BookInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookInventoryComponent } from './book-inventory.component';
import { CommonModule } from '@angular/common';
import { HoverHighlightDirective } from './hover-highlight.directive';
import { Book } from '../book';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BookInventoryComponent', () => {
  let component: BookInventoryComponent;
  let fixture: ComponentFixture<BookInventoryComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookInventoryComponent, CommonModule, HoverHighlightDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(BookInventoryComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of books', () => {
    const bookCards = debugElement.queryAll(By.css('.card'));
    expect(bookCards.length).toBe(component.inventory.length);
  });

  it('should display book details correctly', () => {
    const firstBook = component.inventory[0];
    const firstBookCard = debugElement.query(By.css('.card'));

    expect(firstBookCard.nativeElement.textContent).toContain(firstBook.title);
    expect(firstBookCard.nativeElement.textContent).toContain(firstBook.author);
    expect(firstBookCard.nativeElement.textContent).toContain(firstBook.year.toString());
    expect(firstBookCard.nativeElement.textContent).toContain(firstBook.ISBN);
    expect(firstBookCard.nativeElement.textContent).toContain(firstBook.price.toString());
  });

  it('should display featured badge when book is featured', () => {
    const featuredBook = component.inventory.find((book) => book.featured);
    if (featuredBook) {
      const featuredBookCard = debugElement.query(
        By.css(`.card:contains("${featuredBook.title}")`)
      );
      const featuredBadge = featuredBookCard.query(By.css('.badge.bg-primary'));
      expect(featuredBadge).toBeTruthy();
    }
  });

  it('should display correct price category message', () => {
    const expensiveBook = component.inventory.find((book) => book.price > 30);
    const affordableBook = component.inventory.find((book) => book.price <= 30);

    if (expensiveBook) {
      const expensiveBookCard = debugElement.query(
        By.css(`.card:contains("${expensiveBook.title}")`)
      );
      const expensiveMessage = expensiveBookCard.query(
        By.css('.text-danger')
      );
      expect(expensiveMessage).toBeTruthy();
      expect(expensiveMessage.nativeElement.textContent).toContain('Premium selection!');
    }

    if (affordableBook) {
      const affordableBookCard = debugElement.query(
        By.css(`.card:contains("${affordableBook.title}")`)
      );
      const affordableMessage = affordableBookCard.query(
        By.css('.text-success')
      );
      expect(affordableMessage).toBeTruthy();
      expect(affordableMessage.nativeElement.textContent).toContain('Budget-friendly!');
    }
  });

  it('should delete a book when the delete button is clicked', () => {
    const initialInventoryLength = component.inventory.length;
    const firstBook = component.inventory[0];
    const deleteButton = debugElement.query(
      By.css(`.card:contains("${firstBook.title}") .btn-danger`)
    );
    deleteButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.inventory.length).toBe(initialInventoryLength - 1);
    expect(component.inventory.find((book) => book.ISBN === firstBook.ISBN)).toBeUndefined();
  });

  it('should display "There are no books in inventory." when inventory is empty', () => {
    component.inventory = [];
    fixture.detectChanges();
    const noBooksMessage = debugElement.query(By.css('.alert.alert-info'));
    expect(noBooksMessage).toBeTruthy();
    expect(noBooksMessage.nativeElement.textContent).toContain('There are no books in inventory.');
  });

  it('should use trackByISBN to track items uniquely', () => {
    const firstBook = component.inventory[0];
    const result = component.trackByISBN(0, firstBook);
    expect(result).toBe(firstBook.ISBN);
  });

  it('should apply hover highlight directive', () => {
    const card = debugElement.query(By.css('.card'));
    expect(card.attributes['appHoverHighlight']).toBeDefined();
  });
});