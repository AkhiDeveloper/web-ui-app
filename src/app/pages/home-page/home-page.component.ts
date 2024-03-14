import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsStorageService } from '../../services/groups-storage-service/groups-storage.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private router: Router, private groupStorage: GroupsStorageService) { }

  goToGroupDrawPage(){
    this.router.navigate(['/group-draw']);
  }

  reset() {
    this.groupStorage.removeAllGroups();
    this.goToGroupDrawPage();
  }

 resume() {
  this.goToGroupDrawPage();
 }
}
