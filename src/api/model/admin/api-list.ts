export interface RequestItemVO {
    controllerName: string;
    methodName: string;
    requestType: string;
    requestUrl: string;
    methodParmaTypes: string[];
    returnName: string;
    returnValueMap: Map<string, any>;
}