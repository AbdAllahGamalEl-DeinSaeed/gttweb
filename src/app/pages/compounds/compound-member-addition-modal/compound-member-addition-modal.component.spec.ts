import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundMemberAdditionModalComponent } from './compound-member-addition-modal.component';

describe('CompoundMemberAdditionModalComponent', () => {
  let component: CompoundMemberAdditionModalComponent;
  let fixture: ComponentFixture<CompoundMemberAdditionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompoundMemberAdditionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundMemberAdditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
