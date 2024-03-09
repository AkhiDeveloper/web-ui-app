import { Injectable } from '@angular/core';
import { Group } from '../../models/group';
import { Student } from '../../models/student';
import { DrawerService } from '../drawer/drawer.service';
import { AssetProviderService } from '../asset-provider/asset-provider.service';
import { Observable, map, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { studentsSelector } from '../../store/selectors';
import { AppState } from '../../store/app.state';
import { loadStudents } from '../../store/students/students.actions';

@Injectable({
  providedIn: 'root',
})
export class GroupDrawerService {
  private participants$: Observable<Student[]>;
  private selectedStudents: Student[];

  constructor(
    private drawerService: DrawerService,
    private assetProvider: AssetProviderService,
    private store: Store<AppState>
  ) {
    this.participants$ = store.pipe(select(studentsSelector));
    this.selectedStudents = [];
  }

  draw$(group: Group): Observable<Student>{
    return this.participants$.pipe(
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
