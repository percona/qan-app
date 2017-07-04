declare module 'app/plugins/sdk' {
    export class MetricsPanelCtrl {
        scope: any;
        loading: boolean;
        datasource: any;
        datasourceName: any;
        $q: any;
        $timeout: any;
        datasourceSrv: any;
        timeSrv: any;
        templateSrv: any;
        timing: any;
        range: any;
        rangeRaw: any;
        interval: any;
        intervalMs: any;
        resolution: any;
        timeInfo: any;
        skipDataOnInit: boolean;
        dataStream: any;
        dataSubscription: any;
        dataList: any;
        events: any;
        editorTabs: Array<any>;
        addEditorTab(a: string, b: string, c: number);
        pluginId: any;
        editorTabIndex: number;
        updateTimeRange();
        display_fn: any;
        params_fn: any;
        panel: any;
        constructor($scope: any, $injector: any);
    }
}
