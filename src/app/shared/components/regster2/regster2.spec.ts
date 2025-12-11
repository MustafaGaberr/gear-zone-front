import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Regster2 } from './regster2';

describe('Regster2', () => {
  let component: Regster2;
  let fixture: ComponentFixture<Regster2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Regster2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Regster2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
