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
    if(!this.groups){
      throw new Error('Groups not found!');
    }
    const currentGroup = this.groups.find(x => x.details.project === '');
    if(currentGroup) {
      this.currentGroupId = currentGroup.id;

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

  changeCurrentGroup(group: Group<Student>) {
    this.currentGroupId = group.id;
  }

  drawProjectForCurrentGroup(){
    this.addProject(this.currentGroupId);
  }

  goToNextGroup(){
    if(!this.groups){
      return;
    }
    const nextIndex = this.groups.findIndex(x => x.id === this.currentGroupId) + 1;
    if(nextIndex > this.groups.length){
      throw new Error('Current Group is last group');
    }
    const nextGroup = this.groups[nextIndex];
    this.changeCurrentGroup(nextGroup);
  }

  downloadFile(){
    const filename = 'groups.json';
    const jsonBlob = new Blob([JSON.stringify(this.groups)], { type: 'application/json' });
    const url = window.URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    // Clean up the URL object
    window.URL.revokeObjectURL(url);
  }
}
