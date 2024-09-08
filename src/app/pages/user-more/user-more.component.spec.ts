import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMoreComponent } from './user-more.component';

describe('UserMoreComponent', () => {
  let component: UserMoreComponent;
  let fixture: ComponentFixture<UserMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
