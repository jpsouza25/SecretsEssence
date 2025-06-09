import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLivroComponent } from './card-livro.component';

describe('CardLivroComponent', () => {
  let component: CardLivroComponent;
  let fixture: ComponentFixture<CardLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLivroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
