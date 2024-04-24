import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private http  = inject(HttpClient);

  registerGroup(form : any){
    const options = { withCredentials : true };
    return this.http.post(`${environment.api}/group/create-group`, form, options);
  }

  getMyGroups(searchTerm?: string): Observable<any> {
    const options = {
      params: new HttpParams(),
      withCredentials: true
    };
    if (searchTerm) {
      options.params = options.params.set('search', searchTerm);
    }
    return this.http.get(`${environment.api}/group/all-groups-teacher`, options);
  }

  getInfoGroup(id : string) : Observable<any>{
    const options = { withCredentials : true };
    return this.http.get<any>(`${environment.api}/group/info-group/${id}`, options);
  }

  getInfoUnitsGroup(id : string) : Observable<any>{
    const options = { withCredentials : true };
    return this.http.get<any>(`${environment.api}/group/info-group-units/${id}`, options);
  }
  
  generateStatistics(form : FormData, id : string){
    return this.http.post(`${environment.api}/group/generate-report/${id}`, form, {responseType : 'blob'});
  }

  exportGroupsByTeacher(){
    return this.http.get(`${environment.api}/group/export-groups-by-teacher`, {responseType : 'blob', withCredentials : true});
  }

}