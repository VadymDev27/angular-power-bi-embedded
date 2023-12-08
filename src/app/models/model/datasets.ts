export interface Datasets {
    value: {
        id: string,
        name: string,
        addRowsAPIEnabled: boolean,
        configuredBy: string,
        isRefreshable: boolean,
        isEffectiveIdentityRequired: boolean,
        isEffectiveIdentityRolesRequired: boolean,
        isOnPremGatewayRequired: boolean;
    }[];
}