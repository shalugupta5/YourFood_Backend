import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDishDialogComponent } from './edit-dish-dialog.component';

describe('EditDishDialogComponent', () => {
  let component: EditDishDialogComponent;
  let fixture: ComponentFixture<EditDishDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDishDialogComponent]
    });
    fixture = TestBed.createComponent(EditDishDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
