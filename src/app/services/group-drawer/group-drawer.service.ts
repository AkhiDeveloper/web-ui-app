import { Injectable } from '@angular/core';
import { Group } from '../../models/group';
import { Student } from '../../models/student';
import { DrawerService } from '../drawer/drawer.service';
import { AssetProviderService } from '../asset-provider/asset-provider.service';
import { Observable, map } from 'rxjs';
import { GroupsStorageService } from '../groups-storage-service/groups-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GroupDrawerService {
  private participants$: Observable<Student[]>;

  constructor(
    private drawerService: DrawerService,
    private assetProvider: AssetProviderService,
    private groupStorageService: GroupsStorageService
  ) {
    this.participants$ = this.assetProvider.getAssetStudentData$();
  }

  anyParticipantsRemains$(): Observable<boolean>{
    return this.participants$.pipe(
      map((students) => {
        const remained = students.filter((student) => !this.groupStorageService.getAllMembers().find((selected) => selected.id === student.id));
        if(remained.length > 0){
          return true;
        }
        return false;
      })
    )
  }

  draw$(group: Group<Student>): Observable<Student>{
    return this.participants$.pipe(
      map(((students: Student[]) => {
        students = students.filter((student) => !this.groupStorageService.getAllMembers().find((selected) => selected.id === student.id));
        if(students.length < 1) {
          throw Error('All Students are selected');
        }
        let selected = this.drawerService.draw(students);
        group.details.members.push(selected);
        this.groupStorageService.updateGroup(group.id, group.details);
        return selected;
      }))
    );
  }
}
