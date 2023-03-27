import BaseApiService from "@/api/BaseApiService";
import { IMetricInfrastructure, IPod } from "@/interfaces/interfaces";

export type IPodsResponse = IPod[]; 

export type IPodMetricsResponse = IMetricInfrastructure[];

export type IPodType =
  | "tzlink-web"
  | "testnet-tzlink-rpcgateway"
  | "mainnet-tzlink-rpcgateway"
  | "tzlink-api"
  | "archive-node"
  | "rolling-node";

type PodMetricType =
  | "network-input"
  | "network-output"
  | "cpu-limit"
  | "cpu-requested"
  | "cpu-usage"
  | "ram-limit"
  | "ram-requested"
  | "ram-usage";

export default class Pod extends BaseApiService {
  private static instance: Pod;
  private baseUrl = this.getBaseUrl();
  private readonly podUrl = this.baseUrl.concat("/pods");

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public async getPods(type: IPodType): Promise<IPodsResponse> {
    const url = new URL(this.podUrl);
    url.searchParams.set("type", type);
    try {
      return await this.getRequest<IPodsResponse>(url);
    } catch (err) {
      this.onError(err);
      return Promise.reject(err);
    }
  }

  public async getPod(name: string): Promise<IPod> {
    const url = new URL(this.podUrl.concat("/").concat(name));
    try {
      return await this.getRequest<IPod>(url);
    } catch (err) {
      this.onError(err);
      return Promise.reject(err);
    }
  }

  public async getPodMetrics(
    podName: string,
    type?: PodMetricType,
    from?: string,
    to?: string
  ): Promise<IPodMetricsResponse> {
    const url = new URL(
      this.podUrl.concat("/").concat(podName).concat("/metrics")
    );
    if (type) url.searchParams.set("type", type);
    if (from) url.searchParams.set("from", from.toString());
    if (to) url.searchParams.set("to", to.toString());

    try {
      return await this.getRequest<IPodMetricsResponse>(url);
    } catch (err) {
      this.onError(err);
      return Promise.reject(err);
    }
  }
}
