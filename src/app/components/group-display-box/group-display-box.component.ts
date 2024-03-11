import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Student } from '../../models/student';
import { Group } from '../../models/group';

@Component({
  selector: 'app-group-display-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-display-box.component.html',
  styleUrl: './group-display-box.component.css'
})
export class GroupDisplayBoxComponent implements OnChanges {
  @Input() group?: Group<Student>;
  memberBoxes: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.group) {
      return;
    }
    this.memberBoxes = [];
    console.log(this.group);
    for(let i = 0; i < this.group.details.maxMemberSize; i++){
      this.memberBoxes.push('');
    }
    for(let i = 0; i < this.group.details.members.length; i++) {
      this.memberBoxes[i] = this.group.details.members[i].name;
    }
  }
}
