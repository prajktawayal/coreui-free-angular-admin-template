import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineMasterComponent} from './line-master.component';

describe('LineMasterComponent', () => {
  let component: LineMasterComponent;
  let fixture: ComponentFixture<LineMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineMasterComponent] // Use declarations instead of imports
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
