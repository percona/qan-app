import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class ProfileDetailsService {
  private examples = new Subject();

  constructor() {
  }

  updateExamples(examples) {
    this.examples.next(examples);
  }

  get getExamplesSubject() {
    return this.examples
  }
}
