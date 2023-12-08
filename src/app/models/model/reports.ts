export interface Reports {
    value: {
        id: string,
        reportType: string,
        name: string;
        webUrl: string;
        embedUrl: string;
        isOwnedByMe: boolean;
        datasetId: string;
        datasetWorkspaceId: string;
    }[];
}