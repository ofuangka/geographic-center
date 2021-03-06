import {
  addProviders,
  inject,
  ComponentFixture,
  TestComponentBuilder
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GroupsComponent } from './groups.component';

describe('Component: Groups', () => {
  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    addProviders([GroupsComponent]);
    builder = tcb;
  }));

  it('should inject the component', inject([GroupsComponent],
      (component: GroupsComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(GroupsComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(GroupsComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-groups></app-groups>
  `,
  directives: [GroupsComponent]
})
class GroupsComponentTestController {
}

