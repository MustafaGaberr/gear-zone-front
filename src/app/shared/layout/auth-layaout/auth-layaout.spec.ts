import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayaout } from './auth-layaout';

describe('AuthLayaout', () => {
  let component: AuthLayaout;
  let fixture: ComponentFixture<AuthLayaout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLayaout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLayaout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
