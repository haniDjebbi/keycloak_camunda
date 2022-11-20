import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

configUrl = 'http://localhost:8080/camunda/engine-rest/engine';

getEngineList() {
  return this.http.get(this.configUrl);
}
}
