import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgClass } from '@angular/common';

import { SubjectService } from '../../../shared/services/subject/subject.service';
import { subject } from '../../../shared/interfaces/subject.interface';
import { SubjectCardComponent } from "../../components/subject-card/subject-card.component";
import { SubjectsUploadFileComponent } from '../../components/subjects-upload-file/subjects-upload-file.component';
import { SystemService } from '../../../shared/services/system/system.service';

@Component({
    selector: 'app-subjects',
    standalone: true,
    templateUrl: './subjects.component.html',
    styleUrl: './subjects.component.css',
    imports: [NgClass, SubjectCardComponent]
})
export class SubjectsComponent implements OnInit{

  public darkTheme = signal(false);
  public subjects : subject[] = [];
  public subjectsInfo : any[] = [];

  constructor(
    private subjectService : SubjectService,
    private systemService : SystemService,
    private dialog : MatDialog
  ){}

  ngOnInit(): void {
    this.systemService.preferences$.subscribe((preferences : any) => {
      this.getPreferences();
    });

    this.getSubjects();
  }

  getPreferences(){
    this.darkTheme.set(this.systemService.getThemeState());
  }

  getSubjects(){
    this.subjectService.getSubjectsByCareer().subscribe((data : any) => {
      if(data.success === true){
        this.subjectsInfo = data.subjects;
        this.subjects = data.subjects[0]?.materias;
      }
    });
  }

  uploadSubjects(){
    this.dialog.open(SubjectsUploadFileComponent);
  }

}