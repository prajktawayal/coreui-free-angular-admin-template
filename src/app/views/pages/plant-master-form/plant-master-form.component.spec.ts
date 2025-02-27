import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantMasterFormComponent } from './plant-master-form.component';

describe('PlantMasterFormComponent', () => {
  let component: PlantMasterFormComponent;
  let fixture: ComponentFixture<PlantMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantMasterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
