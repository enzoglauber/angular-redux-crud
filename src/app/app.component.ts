import { Component, ViewChild } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { UsersActions } from './actions/users.actions';
import { Users } from './model/users';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-redux-crud';

  @select('users') public users$: Observable<Users>;
  @select(['users', 'active']) active$;
  activeUser;
  
  constructor(public actions: UsersActions) {
    setTheme('bs4'); // or 'bs4'
    actions.getUsers();
  }


  ngOnInit() {
    this.active$.subscribe(res => {
      this.activeUser = res;
    });
  }

  save(f: any) {
    // Merge form data with data model
    // (since form does not include all fields)
    const newUser = Object.assign({}, this.activeUser, f.value);
    this.actions.save(newUser);
  }

}
