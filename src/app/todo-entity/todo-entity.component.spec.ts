import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEntityComponent } from './todo-entity.component';

describe('TodoEntityComponent', () => {
  let component: TodoEntityComponent;
  let fixture: ComponentFixture<TodoEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoEntityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
