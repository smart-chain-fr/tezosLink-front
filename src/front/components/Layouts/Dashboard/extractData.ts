import { IMetrics } from "@Front/interfaces/interfaces";

type requestByDay = {
    date: Date,
    value: number
}

type RPCUsage = {
    label: string
    value: number
}

export function getRpcUsage(metrics : IMetrics[] | undefined) : RPCUsage[] {
    let rpcUsage : RPCUsage[] = [];

    if (metrics === undefined)
        return rpcUsage;
    metrics.map((metric) => {
        if (!rpcUsage.some(rpc => rpc.label === metric.path)) {
            rpcUsage.push({
                label: metric.path,
                value: metrics.filter(m => m.path === metric.path).length
            })
        }
    })
    return rpcUsage;
}

export function getRequestByDays(metrics : IMetrics[] | undefined) : requestByDay[] {
    let requestByDay : requestByDay[] = [];

    if (metrics === undefined)
        return requestByDay;
    metrics.map((metric) => {
        if (!requestByDay.some(request => request.date === metric.date_requested)) {
            requestByDay.push({
                date: metric.date_requested,
                value: metrics.filter(m => m.date_requested === metric.date_requested).length
            })
        }
    })
    return requestByDay;
}

export function getLastRequest(metrics : IMetrics[] | undefined, nbOfRequest: number) : string[] {
    let lastRequest : string[] = [];
    
    if (metrics === undefined)
        return lastRequest;
    return metrics?.slice(0, nbOfRequest).map(metric => {return metric.path;})
}
