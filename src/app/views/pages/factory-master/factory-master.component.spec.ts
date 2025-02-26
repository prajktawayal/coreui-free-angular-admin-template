import { ComponentFixture, TestBed } from '@angular/core/testing';

import { factoryMasterComponent } from './factory-master.component';

describe('factoryMasterComponent', () => {
  let component: factoryMasterComponent;
  let fixture: ComponentFixture<factoryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [factoryMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(factoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
