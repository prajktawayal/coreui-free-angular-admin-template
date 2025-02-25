import { ComponentFixture, TestBed } from '@angular/core/testing';

import { lineMasterComponent } from './line-master.component';

describe('lineMasterComponent', () => {
  let component: lineMasterComponent;
  let fixture: ComponentFixture<lineMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [lineMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(lineMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
