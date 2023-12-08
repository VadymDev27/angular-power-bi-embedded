export interface Dataset {
    id: string,
    name: string,
    addRowsAPIEnabled: boolean,
    configuredBy: string,
    isRefreshable: boolean,
    isEffectiveIdentityRequired: boolean,
    isEffectiveIdentityRolesRequired: boolean,
    isOnPremGatewayRequired: boolean;
}