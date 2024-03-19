import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCardAddComponent } from './city-card-add.component';

describe('CityCardAddComponent', () => {
  let component: CityCardAddComponent;
  let fixture: ComponentFixture<CityCardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityCardAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityCardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
