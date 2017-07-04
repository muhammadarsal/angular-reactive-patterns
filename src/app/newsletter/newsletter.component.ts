import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {NewsletterService} from '../services/newsletter.service';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterComponent implements OnInit{

  firstName$: Observable<string>;

  constructor(
    private newsletterService: NewsletterService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.firstName$ = this.userService.user$.map(user => user.firstName);
  }

  subscribeToNewsletter(emailField) {
    this.newsletterService.subscribeToNewsletter(emailField.value)
      .subscribe(
      () => {
        emailField.value = '';
        alert('Subscription successful ...');
      },
      console.error
      );
    }

  // subscribeToNewsletter(emailField) {
  //   this.subscribe.emit(emailField.value);
  //   emailField.value = '';
  // }


}
