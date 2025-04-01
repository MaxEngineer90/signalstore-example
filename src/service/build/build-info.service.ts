import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuildInfo } from '../../models/build-info';

@Injectable({
  providedIn: 'root',
})
export class BuildInfoService {
  private http = inject(HttpClient);

  getBuildInfo(): Observable<BuildInfo> {
    return this.http.get<BuildInfo>('/build-info.json');
  }
}
