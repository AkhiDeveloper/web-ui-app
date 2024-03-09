import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AssetProviderService } from "../../services/asset-provider/asset-provider.service";
import * as studentsActions from "./students.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class StudentsEffects {
  constructor(
    private actions$: Actions,
    private assetproviderServicer: AssetProviderService,
  ) {}

  loadStudents$ = createEffect(() => 
    this.actions$.pipe(ofType(studentsActions.loadStudents),
      mergeMap(() => {
        return this.assetproviderServicer.getAssetStudentData$().pipe(
          map(students => studentsActions.loadStudentsSuccess({students})),
          catchError(error => of(studentsActions.loadStudentsFailure({error})))
        );
      })
    ));
}