import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { teacher } from '../../interfaces/teacher.interfaces';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private http = inject(HttpClient);

  getTeachers(searchTerm?: string) : Observable<teacher>{
    const options = {
      params: new HttpParams(),
      withCredentials: true
    };
    if (searchTerm) {
      options.params = options.params.set('search', searchTerm);
    }
    return this.http.get<teacher>(`${environment.api}/teacher/teachers-by-career`, options);
  }

  updateTeacherCareers(email : string){
    const options = { withCredentials : true };
    const body  = { correo : email }
    return this.http.put(`${environment.api}/teacher/teacher-update-careers`, body, options);
  }

  exportTeachers(){
    return this.http.get(`${environment.api}/teacher/teachers-export/excel`, {responseType : 'blob', withCredentials : true});
  }


}