import { Injectable } from '@angular/core';
import { Group } from '../../models/group';
import { Student } from '../../models/student';
import { DrawerService } from '../drawer/drawer.service';
import { AssetProviderService } from '../asset-provider/asset-provider.service';
import { Observable, map } from 'rxjs';

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
        let selected = this.drawerService.draw(students);
        this.selectedStudents.push(selected);
        return selected;
      }))
    );
  }
}
