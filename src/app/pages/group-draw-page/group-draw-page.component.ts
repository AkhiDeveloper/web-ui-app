import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { AssetProviderService } from '../../services/asset-provider/asset-provider.service';
import { GroupDrawerService } from '../../services/group-drawer/group-drawer.service';
import { CommonModule } from '@angular/common';
import { GroupDrawBoxComponent } from "../../components/group-draw-box/group-draw-box.component";
import { Group } from '../../models/group';
import { Student } from '../../models/student';
import { GroupsStorageService } from '../../services/groups-storage-service/groups-storage.service';
import {v4 as uuidv4} from 'uuid';
import { GroupDisplayBoxComponent } from '../../components/group-display-box/group-display-box.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-group-draw-page',
    standalone: true,
    templateUrl: './group-draw-page.component.html',
    styleUrl: './group-draw-page.component.css',
    imports: [CommonModule, GroupDrawBoxComponent, GroupDisplayBoxComponent]
})
export class GroupDrawPageComponent implements OnInit{
  groupSize: number;
  currentGroup?: Group<Student>;
  isDrawing: boolean;
  allGroupDone$?: Observable<boolean>;
  // @ViewChild(GroupDrawBoxComponent) groupDrawBox?: GroupDrawBoxComponent;

  constructor(
    private assetProvider: AssetProviderService,
    private groupStorageService: GroupsStorageService,
    private groupDrawerService: GroupDrawerService,
    private router: Router
  ) {
    this.groupSize = 0;
    this.isDrawing = true;
  }

  ngOnInit(): void {
    this.allGroupDone$ = this.groupDrawerService.anyParticipantsRemains$().pipe(
      map((result)=> !result)
    );
    this.allGroupDone$.subscribe((allDone)=>{
      if(allDone) {
        this.goToNextPage();
      }
    })
    this.assetProvider.getSettingsData$().subscribe((settings) => {
      this.groupSize = settings.groupSize;
      const lastGroup = this.groupStorageService.getLastGroup();
      if(!lastGroup){
        this.nextGroup();
      }
      else{
        this.currentGroup = {...lastGroup};
        this.isDrawing = false;
      }
    });
  }

  changeDrawingStatus(isDrawing: boolean): void {
    this.isDrawing = isDrawing;
  }

  goToNextPage(){
    this.router.navigateByUrl('/groups-list');
  }
  
  draw(){
    if(this.currentGroup){
      this.groupDrawerService.draw$(this.currentGroup).subscribe((student)=>{
        let updatedGroup: Group<Student> | null = null;
        if(this.currentGroup){
          updatedGroup = this.groupStorageService.getGroupById(this.currentGroup.id);
        }
        else{
          updatedGroup = this.groupStorageService.getLastGroup();
        }
        if(updatedGroup){
          this.currentGroup = {...updatedGroup};
        }
      });
    }
  }

  isAllMembersDrawn(): boolean {
    if(!this.currentGroup){
      return true;
    }
    const details = this.currentGroup.details;
    if(details.members.length < details.maxMemberSize) {
      return false;
    };
    return true;
  }

  nextGroup(): void {
    const totalGroups = this.groupStorageService.getAllGroups().length;
    this.groupStorageService.addGroup(uuidv4(), {
      name: 'Group ' + String.fromCharCode(65 + totalGroups),
        members: [],
        maxMemberSize: this.groupSize,
    });
    const lastGroup = this.groupStorageService.getLastGroup();
    if(lastGroup){
      this.currentGroup = {...lastGroup};
      this.isDrawing = false;
    }
  }
}
