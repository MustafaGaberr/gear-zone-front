import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlanckLayout } from './blanck-layout';

describe('BlanckLayout', () => {
  let component: BlanckLayout;
  let fixture: ComponentFixture<BlanckLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlanckLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlanckLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
