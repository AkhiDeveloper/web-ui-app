// Import any necessary dependencies

import { Student } from "../../models/student";

// Define the interface for your store state
export interface StudentState {
    students: Student[];
    loading: boolean;
    error: string | null;
}