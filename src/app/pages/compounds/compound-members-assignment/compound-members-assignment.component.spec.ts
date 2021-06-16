import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundMembersAssignmentComponent } from './compound-members-assignment.component';

describe('CompoundMembersAssignmentComponent', () => {
  let component: CompoundMembersAssignmentComponent;
  let fixture: ComponentFixture<CompoundMembersAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompoundMembersAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundMembersAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
