export interface Groups {
    value: {
        id: string,
        isReadOnly: boolean,
        isOnDedicatedCapacity: boolean,
        type: string,
        name: string;
    }[];
}