import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const selectStudentsState = (state: AppState) => state.students;

export const studentsSelector = createSelector(
    selectStudentsState,
    (state) => state.students
);

export const studentsLoadingSelector = createSelector(
    selectStudentsState,
    (state) => state.loading
);

export const studentsErrorSelector = createSelector(
    selectStudentsState,
    (state) => state.error
);