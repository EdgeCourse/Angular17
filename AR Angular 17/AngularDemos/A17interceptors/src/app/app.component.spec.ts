import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule.withRoutes([
          { path: 'book-inventory', component: DummyComponent },
          { path: 'contact', component: DummyComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a navigation bar with links', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav).toBeTruthy();

    const links = nav.querySelectorAll('a');
    expect(links.length).toBe(2);

    expect(links[0].textContent).toContain('Book Inventory');
    expect(links[1].textContent).toContain('Contact');
  });

  it('should have routerLink directives', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(links.length).toBe(2);

    expect(links[0].injector.get(RouterLink).routerLink).toBe('/book-inventory');
    expect(links[1].injector.get(RouterLink).routerLink).toBe('/contact');
  });

  it('should have routerLinkActive directives', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkActive));
    expect(links.length).toBe(2);
  });

  it('should have a router-outlet', () => {
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should apply activelink class to the active route', async () => {
    const router = TestBed.inject(RouterModule).router;
    await router.navigate(['/book-inventory']);
    fixture.detectChanges();

    const bookInventoryLink = fixture.nativeElement.querySelector('a[routerLink="/book-inventory"]');
    expect(bookInventoryLink.classList).toContain('activelink');

    await router.navigate(['/contact']);
    fixture.detectChanges();

    const contactLink = fixture.nativeElement.querySelector('a[routerLink="/contact"]');
    expect(contactLink.classList).toContain('activelink');

    expect(bookInventoryLink.classList).not.toContain('activelink');
  });

  it('should apply activelink class only when exact match for book inventory', async () => {
    const router = TestBed.inject(RouterModule).router;
    await router.navigate(['/book-inventory/some-other-path']);
    fixture.detectChanges();

    const bookInventoryLink = fixture.nativeElement.querySelector('a[routerLink="/book-inventory"]');
    expect(bookInventoryLink.classList).not.toContain('activelink');

    await router.navigate(['/book-inventory']);
    fixture.detectChanges();

    expect(bookInventoryLink.classList).toContain('activelink');
  });

});

@Component({
  template: '',
})
class DummyComponent {}