import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsMalanpurComponent } from './ems-malanpur.component';

describe('EmsMalanpurComponent', () => {
  let component: EmsMalanpurComponent;
  let fixture: ComponentFixture<EmsMalanpurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmsMalanpurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmsMalanpurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
