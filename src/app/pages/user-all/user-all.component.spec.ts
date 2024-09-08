import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAllComponent } from './user-all.component';

describe('UserAllComponent', () => {
  let component: UserAllComponent;
  let fixture: ComponentFixture<UserAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
