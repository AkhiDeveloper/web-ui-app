export interface GroupDetails<T> {
    name: string;
    members: T[];
    maxMemberSize: number;
    project: string;
}
