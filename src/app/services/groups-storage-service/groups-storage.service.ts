import { Injectable } from '@angular/core';
import { Group } from '../../models/group';
import { Student } from '../../models/student';
import { GroupDetails } from '../../models/group-details';

@Injectable({
  providedIn: 'root'
})
export class GroupsStorageService {

  private groups: Group<Student>[];

  constructor(){
    this.groups = JSON.parse(localStorage.getItem('groups') ?? '[]');
    this.groups = this.groups.sort((a, b) => a.sn - b.sn);
  }

  private save(){
    const jsonString = JSON.stringify(this.groups);
    localStorage.setItem('groups', jsonString);
  }

  getAllMembers(): Student[] {
    const members: Student[] = [];
    this.groups.forEach(x => {
      x.details.members.forEach(m => members.push(m))
    });
    return members;
  }

  getAllGroups(): Group<Student>[]{
    return this.groups;
  }

  getLastGroup(): Group<Student>{
    return this.groups[this.groups.length - 1];
  }

  addGroup(id: string, details: GroupDetails<Student>): void {
    const lastSN = this.getLastGroup().sn;
    const current_group: Group<Student> = {
      id,
      sn: lastSN + 1,
      details: {
        ...details
      }
    };
    this.groups.push(current_group);
    this.save();
  }

  getGroupById(id: string): Group<Student> | null{
    const group = this.groups.find( x => x.id == id) ?? null;
    return group;
  }

  updateGroup(id: string, updates: GroupDetails<Student>): void{
    const group = this.getGroupById(id);
    if(!group){
      throw Error('group not found!');
    } 
    group.details = updates;
    this.save();
  }
}
