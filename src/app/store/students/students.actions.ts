import { createAction, props } from "@ngrx/store";
import { Student } from "../../models/student";

export const loadStudents = createAction('[Students] Load Students');
export const loadStudentsSuccess = createAction('[Students] Load Students Success',props<{students: Student[]}>());
export const loadStudentsFailure = createAction('[Students] Load Students Failure',props<{error: string}>());