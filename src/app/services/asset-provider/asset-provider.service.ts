import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Student } from '../../models/student';
import { Setting } from '../../models/setting';

@Injectable({
  providedIn: 'root'
})
export class AssetProviderService {
  constructor(private http: HttpClient) { }

  getAssetStudentData$(): Observable<Student[]>{
    const fileName = 'student-data.csv';
     return this.getAssetCSVData$(fileName).pipe(
      map((data: any[]) => {
        const students: Student[] = [];
        let curr_id = 1;
        data.forEach((student: any) => {
          students.push({
            id: curr_id,
            rollNumber: student.roll_number,
            name: (student.name as string).toUpperCase(),
            email: student.email,
          });
          curr_id++;
        });
        return students;
      }
    ));
  }

  getSettingsData$(): Observable<Setting> {
    const fileName = 'setting.json';
    return this.getAssetData$(fileName).pipe(
      map((data: any) => {
        return {
          maxGroups: data.max_groups,
          groupSize: data.group_size
        };
      })
    );
  }

  getProjectsData$(): Observable<string[]> {
    const fileName = 'projects.json';
    return this.getAssetData$(fileName);
  }

  private getAssetCSVData$(filename: string) : Observable<any[]> {
    const fileUrl = `assets/${filename}`;
    const extension = this.getExtension(filename);
    if(extension !== 'csv'){
      throw new Error('Unsupported file type');
    }
    return this.http.get(fileUrl, {responseType: 'text'}).pipe(
      map((data: string) => {
        return this.convertCsvToJson(data);
      })
    )
  }

  private getAssetData$(filename: string) : Observable<any> {
    const fileUrl = `assets/${filename}`;
    return this.http.get(fileUrl, {responseType: 'text'}).pipe(
      map((data: string) => {
        const extension = this.getExtension(filename);
        switch(extension) {
          case 'json':
            return JSON.parse(data);
          case 'csv':
            return this.convertCsvToJson(data);
          default:
            throw new Error('Unsupported file type');
        }
      })
    )
  }

  private getExtension(filename: string) : string {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }

  private convertCsvToJson(data: string) : any[] {
    const lines = data.split('\n');
    const headers = lines[0].split(',');
    const result = [];
    for(let i = 1; i < lines.length; i++){
      const obj: any = {};
      const currentline = lines[i].split(',');
      for(let j = 0; j < headers.length; j++){
        obj[headers[j].trim().toLowerCase()] = currentline[j];
      }
      result.push(obj);
    }
    return result;
  }
}
