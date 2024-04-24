import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { admin } from '../../../shared/interfaces/admin.interfaces';
import { TeacherService } from '../../../shared/services/teacher/teacher.service';
import { teacher } from '../../../shared/interfaces/teacher.interfaces';
import { SystemService } from '../../../shared/services/system/system.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit{

  public darkTheme = signal(false);
  public career !: string;
  public teachers : teacher[] = [];
  public searchTerm: string = '';

  constructor(
    private authService :  AuthService,
    private teacherService : TeacherService,
    private router : Router,
    private systemService : SystemService
  ){}

  ngOnInit(): void {
    this.systemService.preferences$.subscribe((preferences : any) => {
      this.getPreferences();
    });

   this.getCareerName(); 
   this.getTeacherList();
  }

  getPreferences(){
    this.darkTheme.set(this.systemService.getThemeState());
  }

  downloadTeachers(){
    this.teacherService.exportTeachers().subscribe((data : Blob) => {
      const url = window.URL.createObjectURL(data);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'docentes.pdf';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(url);
    });

    setTimeout(() => {
      this.router.navigate([`/administrador/docentes`]).then(() => {
        window.location.reload();
      });
    }, 10000);
  }

  registerTeacher() : void{
    this.router.navigate(['/administrador/crear-cuenta']);
  }

  getCareerName() : void{
    this.authService.userInfo().subscribe((data : any) => {
      if(data.success === true){
        this.career = data.user?.carrera;
      }
    });
  }

  getTeacherList() : void{
    this.teacherService.getTeachers(this.searchTerm).subscribe((data : any) => {
      if(data.success === true){
        this.teachers = data.teachers;
      }
    });
  }

  onSearch(): void {
    this.teacherService.getTeachers(this.searchTerm).subscribe((data : any) => {
      if(data.success === true){
        this.teachers = data.teachers;
      }
    });
  }

}