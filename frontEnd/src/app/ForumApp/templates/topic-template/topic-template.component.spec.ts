import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicTemplateComponent } from './topic-template.component';

describe('TopicTemplateComponent', () => {
  let component: TopicTemplateComponent;
  let fixture: ComponentFixture<TopicTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
