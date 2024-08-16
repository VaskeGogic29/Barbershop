import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PocetnaPage } from './pocetna.page';

describe('PocetnaPage', () => {
  let component: PocetnaPage;
  let fixture: ComponentFixture<PocetnaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PocetnaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
