import { createReducer, on } from "@ngrx/store";
import { StudentState } from "./students.state";
import { loadStudents, loadStudentsFailure, loadStudentsSuccess } from "./students.actions";

// Define the initial state
const initialState: StudentState = {
    students: [],
    loading: false,
    error: null,
};

export const studentReducer = createReducer(
    initialState,
    on(loadStudents, (state) => ({...state, loading: true})),
    on(loadStudentsSuccess, (state, {students}) => ({...state, students, loading: false, error: null})),
    on(loadStudentsFailure, (state, {error}) => ({...state, loading: false, error})),
)