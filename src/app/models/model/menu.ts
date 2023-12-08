export class Menu {
    data: any[];

    constructor() {
        this.data = [
            {
                "id":"home",
                "name": "Home",
                "path": "/app/home",
                "icon": "bi bi-house",
                "sub_levels": null
            },
            {
                "id":"dashboards",
                "name": "Dashboards",
                "path": "/app/dashboards",
                "icon": "bi bi-speedometer",
                "sub_levels": null
            },
            {
                "id":"reports",
                "name": "Reports",
                "path": "/app/reports",
                "icon": "bi bi-card-checklist",
                "sub_levels": null
            }
        ];
    }

}