import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from "../shared/model/course";
import {Lesson} from "../shared/model/lesson";
import * as _ from 'lodash';
import {CoursesService} from "../services/courses.service";
import {NewsletterService} from "../services/newsletter.service";
import {UserService} from "../services/user.service";
import {Observable} from "rx";


@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  constructor(private route: ActivatedRoute,
        private coursesService: CoursesService,
        private newsletterService: NewsletterService,
        private userService:UserService) {

  }

  onSubscribe(email:string) {
    this.newsletterService.subscribeToNewsletter(email)
      .subscribe(
        () => {
          alert('Subscription successful ...');
        },
        console.error
      );
  }

  ngOnInit() {
    
    this.course$ = this.route.params
      .switchMap(params => this.coursesService.findCourseByUrl( params['id']))
      .first()
      .publishLast().refCount();    
    
    this.lessons$ = this.course$
      .switchMap(course =>this.coursesService.findLessonsForCourse(course.id))
      .first()
      .publishLast().refCount();    
    
    // this.route.params
    //   .subscribe( params => {

    //     const courseUrl = params['id'];

    //     this.coursesService.findCourseByUrl(courseUrl)
    //       .subscribe(data => {
    //         this.course = data;

    //         this.coursesService.findLessonsForCourse(this.course.id)
    //           .subscribe(lessons => this.lessons = lessons);
    //       });

    //   });
  }

  loginAsJohn() {
    this.userService.login('john@gmail.com', 'test123').subscribe();
  }

}
