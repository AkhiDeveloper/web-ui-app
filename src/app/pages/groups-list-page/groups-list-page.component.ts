import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { Group } from '../../models/group';
import { GroupsStorageService } from '../../services/groups-storage-service/groups-storage.service';
import { CommonModule } from '@angular/common';
import { GroupDisplayBoxComponent } from '../../components/group-display-box/group-display-box.component';
import { GroupDrawerService } from '../../services/group-drawer/group-drawer.service';
import { Observable, map } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-groups-list-page',
  standalone: true,
  imports: [CommonModule, GroupDisplayBoxComponent, RouterModule],
  templateUrl: './groups-list-page.component.html',
  styleUrl: './groups-list-page.component.css'
})
export class GroupsListPageComponent implements OnInit {
  groups?: Group<Student>[];

  constructor(
    private groupStorageService: GroupsStorageService,
    private groupDrawService: GroupDrawerService
  ) {

  }

  ngOnInit(): void {
    this.groups = this.groupStorageService.getAllGroups();
  }

  isDrawCompleted$(): Observable<boolean> {
    return this.groupDrawService.anyParticipantsRemains$().pipe(
      map((anyRemain) => {
        return !anyRemain;
      })
    );
  }
}
