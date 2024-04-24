import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { PeriodService } from '../../../shared/services/period/period.service';
import { period } from '../../../shared/interfaces/period.interfaces';
import { AddNewPeriodComponent } from '../../components/period-add/add-new-period.component';
import { SystemService } from '../../../shared/services/system/system.service';



@Component({
  selector: 'app-periods',
  standalone: true,
  imports: [NgClass],
  templateUrl: './periods.component.html',
  styleUrl: './periods.component.css'
})
export class PeriodsComponent implements OnInit{

  public darkTheme = signal(false);
  public periods : period[] = [];
  public subjects : any[] = [];

  constructor(
    private periodService : PeriodService,
    private dialog : MatDialog,
    private router : Router,
    private systemService : SystemService
  ){}

  ngOnInit() : void {
    this.systemService.preferences$.subscribe((preferences : any) => {
      this.getPreferences();
    });
    
    this.getDataPeriods();
  }

  getPreferences(){
    this.darkTheme.set(this.systemService.getThemeState());
  }

  addPeriod() : void{
    this.dialog.open(AddNewPeriodComponent);
  }

  downloadPeriods(){
    this.periodService.exportPeriods().subscribe((data : Blob) => {
      const url = window.URL.createObjectURL(data);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'periodos.pdf';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(url);
    });

    setTimeout(() => {
      this.router.navigate([`/administrador/periodos`]).then(() => {
        window.location.reload();
      });
    }, 10000);
  }

  getDataPeriods(){
    this.periodService.getPeriods().subscribe((data : any) => {
      if(data.success === true){
        this.periods = data.periods;
        this.subjects = data.subjects;
      }
    });
  }

}