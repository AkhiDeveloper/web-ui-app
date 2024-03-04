import { Student } from "./student";

export interface Group {
    id: number;
    name: string;
    members: Student[];
}
