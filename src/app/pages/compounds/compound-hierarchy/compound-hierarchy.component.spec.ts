import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundHierarchyComponent } from './compound-hierarchy.component';

describe('CompoundHierarchyComponent', () => {
  let component: CompoundHierarchyComponent;
  let fixture: ComponentFixture<CompoundHierarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompoundHierarchyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
