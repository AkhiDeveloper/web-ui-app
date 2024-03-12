import { Component, Input, OnInit } from '@angular/core';
import { AssetProviderService } from '../../services/asset-provider/asset-provider.service';
import { Observable, of } from 'rxjs';
import { Group } from '../../models/group';
import { Student } from '../../models/student';
import { GroupsStorageService } from '../../services/groups-storage-service/groups-storage.service';
import { DrawerService } from '../../services/drawer/drawer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-draw-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-draw-page.component.html',
  styleUrl: './projects-draw-page.component.css'
})
export class ProjectsDrawPageComponent implements OnInit {
  projects$: Observable<string[]> = of([]);
  groups?: Group<Student>[];
  currentGroupId: string = '';

  constructor(
    private assetProvider: AssetProviderService,
    private groupStorage: GroupsStorageService,
    private drawer: DrawerService
  ){ }

  ngOnInit(): void {
    this.projects$ = this.assetProvider.getProjectsData$();
    this.groups = this.groupStorage.getAllGroups() ?? undefined;
    if(this.groups){
      this.currentGroupId = this.groups[0].id;
    }
  }

  addProject(groupId: string): void{
    this.projects$.subscribe((projects) => {
      const selected = [...this.getSelectedProjects()];
      const remained = projects.filter((project) => !selected.find( s => s === project));
      const drawn = this.drawer.draw(remained);
      let current_group = this.groupStorage.getGroupById(groupId) ?? undefined;
      if(!current_group){
        throw new Error('Group not found!');
      }
      current_group.details.project = drawn;
      this.groupStorage.updateGroup(groupId, current_group.details);
      this.groups = this.groupStorage.getAllGroups();
      if(!this.groups) {
        throw new Error('Groups not found!');
      }
      let current_sn = current_group.sn;
      if(current_sn < this.groups.length){
        current_group = this.groups.find(x => x.sn === current_sn  + 1);
      }
      if(current_group){
        this.currentGroupId = current_group.id;
      }
      else{
        this.currentGroupId = '';
      }
    });
  }

  getSelectedProjects(): string[]{
    const selected: string[] = [];
    if(!this.groups) {
      return selected;
    }
    this.groups?.forEach((group) => {
      selected.push(group.details.project);
    });
    return selected;
  }
}
