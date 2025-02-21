import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantMasterComponent } from './plant-master.component';

describe('PlantMasterComponent', () => {
  let component: PlantMasterComponent;
  let fixture: ComponentFixture<PlantMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
