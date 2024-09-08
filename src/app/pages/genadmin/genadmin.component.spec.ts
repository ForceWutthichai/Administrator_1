import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenadminComponent } from './genadmin.component';

describe('GenadminComponent', () => {
  let component: GenadminComponent;
  let fixture: ComponentFixture<GenadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
