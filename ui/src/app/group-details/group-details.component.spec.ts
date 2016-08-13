import {
  addProviders,
  inject,
  ComponentFixture,
  TestComponentBuilder
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GroupDetailsComponent } from './group-details.component';

describe('Component: GroupDetails', () => {
  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    addProviders([GroupDetailsComponent]);
    builder = tcb;
  }));

  it('should inject the component', inject([GroupDetailsComponent],
      (component: GroupDetailsComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(GroupDetailsComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(GroupDetailsComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-group-details></app-group-details>
  `,
  directives: [GroupDetailsComponent]
})
class GroupDetailsComponentTestController {
}

