import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { period } from '../../interfaces/period.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  private http = inject(HttpClient);

  registerPeriod(form : any){
    const options = { withCredentials : true };
    return this.http.post(`${environment.api}/period/period-register`,form, options);
  }

  getPeriods() : Observable<period>{
    const options = { withCredentials : true };
    return this.http.get<period>(`${environment.api}/period/period-careers`, options);
  }
  getPeriodsDescriptions() : Observable<any>{
    const options = { withCredentials : true };
    return this.http.get<any>(`${environment.api}/period/period-descriptions`, options);
  }

  exportPeriods(){
    return this.http.get(`${environment.api}/period/period-export/excel`, {responseType : 'blob', withCredentials : true});
  }

}