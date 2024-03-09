import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { AssetProviderService } from '../../services/asset-provider/asset-provider.service';
import { GroupDrawerService } from '../../services/group-drawer/group-drawer.service';
import { CommonModule } from '@angular/common';
import { GroupDrawBoxComponent } from "../../components/group-draw-box/group-draw-box.component";
import { Group } from '../../models/group';

@Component({
    selector: 'app-group-draw-page',
    standalone: true,
    templateUrl: './group-draw-page.component.html',
    styleUrl: './group-draw-page.component.css',
    imports: [CommonModule, GroupDrawBoxComponent]
})
export class GroupDrawPageComponent implements OnInit{
  groupSize: number;
  currentGroup: Group;
  isDrawing: boolean;
  @ViewChild(GroupDrawBoxComponent) groupDrawBox?: GroupDrawBoxComponent;

  constructor(
    private assetProvider: AssetProviderService,
  ) {
    this.groupSize = 0;
    this.currentGroup = {
      id: 0,
      name: '',
      members: []
    }
    this.isDrawing = true;
  }

  ngOnInit(): void {
    this.assetProvider.getSettingsData$().subscribe((settings) => {
      this.groupSize = settings.groupSize;
      this.nextGroup();
      this.isDrawing = false;
    });
  }
  
  callDrawFunction(): void {
    if (this.groupDrawBox) {
      this.groupDrawBox.draw();
    }
  }

  changeDrawingStatus(isDrawing: boolean): void {
    this.isDrawing = isDrawing;
  }
  
  draw(){
    this.groupDrawBox?.draw();
  }

  isAllMembersDrawn(): boolean {
    console.log('group members length', this.currentGroup.members.length, this.groupSize);
    return this.currentGroup.members.length === this.groupSize;
  }

  nextGroup(): void {
    this.currentGroup = {
      id: this.currentGroup.id + 1,
      name: 'Group ' + String.fromCharCode(65 + this.currentGroup.id),
      members: []
    }
  }
}
