import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { Course } from '../shared/model/course';
import { Lesson } from '../shared/model/lesson';
import { Observable } from 'rxjs';

@Injectable()
export class CoursesService {

  constructor(private db: AngularFireDatabase) { }

  findAllCourses(): Observable<Course[]> {
	  return this.db.list('courses')
	  	.first()
	    .do(console.log);
  }

  findLatestLessons(): Observable<Lesson[]> {
  	return this.db.list('lessons', {
      query: {
        orderByKey: true,
        limitToLast: 10
      }
    })
    // first() converts the firebase's long-running observable to short-running
    .first() // .take(1) also works
    .do(console.log);
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
  	return this.db.list('courses', {
      query: {
        orderByChild: 'url',
        equalTo: courseUrl
      }
    })
    .first()
    .map( data => data[0])
  }

  findLessonsForCourse(courseId: string): Observable<Lesson[]> {
  	return this.db.list('lessons', {
      query: {
        orderByChild: 'courseId',
        equalTo: courseId
      }
    })
    .first();
  }
}
