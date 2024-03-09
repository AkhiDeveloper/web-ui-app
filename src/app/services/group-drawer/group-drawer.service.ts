import { Injectable } from '@angular/core';
import { Group } from '../../models/group';
import { Student } from '../../models/student';
import { DrawerService } from '../drawer/drawer.service';
import { AssetProviderService } from '../asset-provider/asset-provider.service';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupDrawerService {
  private students$: Observable<Student[]>;
  private selectedStudents: Student[];

  constructor(
    private drawerService: DrawerService,
    private assetProvider: AssetProviderService
  ) {
    this.students$ = this.assetProvider.getAssetStudentData$();
    this.selectedStudents = [];
  }

  draw$(group: Group): Observable<Student>{
    return this.students$.pipe(
      map(((students: Student[]) => {
        students = students.filter((student) => !this.selectedStudents.find((selected) => selected.id === student.id));
        console.log(students);
        let selected = this.drawerService.draw(students);
        this.selectedStudents.push(selected);
        return selected;
      }))
    );
  }
}
