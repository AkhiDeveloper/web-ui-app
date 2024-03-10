import { GroupDetails } from "./group-details";

export interface Group<T> {
    id: string;
    sn: number;
    details: GroupDetails<T>
}
