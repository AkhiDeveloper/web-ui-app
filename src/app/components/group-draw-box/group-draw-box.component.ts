import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Group } from '../../models/group';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { GroupDrawerService } from '../../services/group-drawer/group-drawer.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-group-draw-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-draw-box.component.html',
  styleUrl: './group-draw-box.component.css'
})
export class GroupDrawBoxComponent implements OnChanges{
  @Input() group?: Group<Student>;
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
    this.memberBoxes?.forEach((box) => {
      const currentBox = box.nativeElement as HTMLElement;
      currentBox.style.backgroundColor = 'white';
      currentBox.children[0].innerHTML = '';
    });
    setTimeout(() => {
      if(!this.group){
        return;
      }
      this.isChanging = false;
      this.drawingMembers = Array.from({length: this.group.details.maxMemberSize});
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
    if(this.isDrawing){
      return;
    }
    this.startDrawing();
    if (!this.group){
      return;
    }
    this.groupDrawer.draw$(this.group).subscribe(
      (data) => {
        this.group?.details.members.push(data);
        const currentBoxRef = this.memberBoxes?.toArray()[this.currentMemberIndex];
        if(!currentBoxRef){
          return;
        }
        const currentBox = currentBoxRef.nativeElement as HTMLElement;
        currentBox.style.backgroundColor = 'green';
        currentBox.children[0].innerHTML = data.name;
        this.currentMemberIndex++;
        this.finishDrawing();
      }
    );
  }
}
