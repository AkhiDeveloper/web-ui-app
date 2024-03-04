import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Group } from '../../models/group';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { GroupDrawerService } from '../../services/group-drawer/group-drawer.service';

@Component({
  selector: 'app-group-draw-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-draw-box.component.html',
  styleUrl: './group-draw-box.component.css'
})
export class GroupDrawBoxComponent implements OnChanges{
  @Input() group?: Group;
  @Input() groupSize: number = 0;
  @ViewChildren('memberboxes') memberBoxes?: QueryList<ElementRef>;
  drawingMembers?: any[];
  currentMemberIndex: number = 0;
  isDrawing: boolean;
  isLoading: boolean;
  isChanging: boolean;
  @Output() isDrawingEvent = new EventEmitter<boolean>();

  constructor(
    private groupDrawer: GroupDrawerService
  ){
    this.isChanging = true;
    this.isDrawing = false;
    this.isLoading = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading = true;
    this.isChanging = true;
    this.currentMemberIndex = 0;
    console.log(this.groupSize);
    setTimeout(() => {
      this.isChanging = false;
      this.drawingMembers = Array.from({length: this.groupSize});
      console.log(this.drawingMembers);
      this.isDrawing = false;
      this.isLoading = false;
    }, 100);
  }

  startDrawing(): void {
    this.isDrawing = true;
    this.isDrawingEvent.emit(this.isDrawing);
  }

  finishDrawing(): void {
    this.isDrawing = false;
    this.isDrawingEvent.emit(this.isDrawing);
  }

  draw(): void{
    console.log('draw is called');
    if(this.isDrawing){
      return;
    }
    this.startDrawing();
    if (!this.group){
      return;
    }
    console.log(this.group);
    this.groupDrawer.draw$(this.group).subscribe(
      (data) => {
        console.log('draw subscribed');
        const currentBoxRef = this.memberBoxes?.toArray()[this.currentMemberIndex];
        if(!currentBoxRef){
          return;
        }
        const currentBox = currentBoxRef.nativeElement as HTMLElement;
        currentBox.style.backgroundColor = 'green';
        currentBox.children[0].innerHTML = data.name;
        console.log('draw finished');
        this.currentMemberIndex++;
        this.finishDrawing();
      }
    );
  }
}
