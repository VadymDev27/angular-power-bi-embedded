export interface Tiles {
    value: {
        id: string,
        title: string,
        embedUrl: string,
        rowSpan: number,
        colSpan: number,
        reportId: string,
        datasetId: string
    }[];
}