export interface Report {
    id: string,
    reportType: string,
    name: string;
    webUrl: string;
    embedUrl: string;
    isOwnedByMe: boolean;
    datasetId: string;
    datasetWorkspaceId: string;
}