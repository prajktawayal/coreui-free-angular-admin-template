import { ComponentFixture, TestBed } from '@angular/core/testing';

import { graphcompoenent } from './graph.component';

describe('GraphComponent', () => {
  let component: graphcompoenent;
  let fixture: ComponentFixture<graphcompoenent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [graphcompoenent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(graphcompoenent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
