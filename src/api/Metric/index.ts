import BaseApiService from "@/api/BaseApiService";
import { IMetric } from "@/interfaces/interfaces";

export type IPostProject = {
  title: string;
  network: string;
};

export type IResponseMyRequests = { date: Date; count: number }[];

export type IResponseCountRequests = { count: number };

export type IResponseTypeOfRequests = {
  _count: {
    path: number;
  };
  path: string;
}[];

export type IResponseWorldMap = {
  data: { country: string; count: number }[];
};

export type IResponseRequests = {
  data: IMetric[];
  metadata: {
    count: number;
    limit: number;
    page: number;
    total: number;
  };
};

export type NodeType = "rolling" | "archive";

export enum RequestStatus {
  "COMPLETED" = "completed",
  "BLACKLISTED" = "blacklisted",
  "SUCCESSFUL" = "successful",
  "FAILED" = "failed",
}

export type IGetAllQuery = {
  projectUuid: string;
  from?: string;
  to?: string;
  node?: NodeType;
  type?: string;
  status?: RequestStatus;
  _page?: number;
  _limit?: number;
};

export type IResponsePath = string[];

export default class Metric extends BaseApiService {
  private static instance: Metric;
  private baseUrl = this.getBaseUrl();
  private readonly projectUrl = this.baseUrl.concat("/metrics");

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public async getMyRequestMetrics(
    projectUuid: string,
    from?: string,
    to?: string
  ): Promise<IResponseMyRequests> {
    const url = new URL(this.projectUrl.concat("/").concat("my-requests"));
    url.searchParams.set("projectUuid", projectUuid.toString());
    if (from) url.searchParams.set("from", from.toString());
    if (to) url.searchParams.set("to", to.toString());
    try {
      return await this.getRequest<IResponseMyRequests>(url);
    } catch (err) {
      this.onError(err);
      return Promise.reject(err);
    }
  }

  public async countRequests(
    projectUuid: string,
    from?: string,
    to?: string
  ): Promise<IResponseCountRequests> {
    const url = new URL(this.projectUrl.concat("/").concat("count-requests"));
    url.searchParams.set("projectUuid", projectUuid.toString());
    if (from) url.searchParams.set("from", from.toString());
    if (to) url.searchParams.set("to", to.toString());
    try {
      return await this.getRequest<IResponseCountRequests>(url);
    } catch (err) {
      this.onError(err);
      return Promise.reject(err);
    }
  }

  public async getTypeOfRequests(
    projectUuid: string,
    from?: string,
    to?: string
  ): Promise<IResponseTypeOfRequests> {
    const url = new URL(
      this.projectUrl
        .concat("/")

        .concat("type-of-requests")
    );
    url.searchParams.set("projectUuid", projectUuid.toString());
    if (from) url.searchParams.set("from", from.toString());
    if (to) url.searchParams.set("to", to.toString());
    try {
      return await this.getRequest<IResponseTypeOfRequests>(url);
    } catch (err) {
      this.onError(err);
      return Promise.reject(err);
    }
  }

  public async getAll(query: IGetAllQuery): Promise<IResponseRequests> {
    const url = new URL(this.projectUrl);
    url.searchParams.set("projectUuid", query.projectUuid.toString());
    if (query.from) url.searchParams.set("from", query.from.toString());
    if (query.to) url.searchParams.set("to", query.to.toString());
    if (query.node) url.searchParams.set("node", query.node.toString());
    if (query.type) url.searchParams.set("type", query.type.toString());
    if (query.status) url.searchParams.set("status", query.status.toString());
    if (query._page)
      url.searchParams.set("_page", query._page ? query._page.toString() : "1");
    url.searchParams.set(
      "_limit",
      query._limit ? query._limit.toString() : "20"
    );
    try {
      return await this.getRequest<IResponseRequests>(url);
    } catch (err) {
      this.onError(err);
      return Promise.reject(err);
    }
  }

  public async getWorldmapInfo(): Promise<IResponseWorldMap> {
    const url = new URL(this.projectUrl.concat("/").concat("world-map"));
    try {
      return await this.getRequest<IResponseWorldMap>(url);
    } catch (err) {
      this.onError(err);
      return Promise.reject(err);
    }
  }

  public async getPaths(): Promise<IResponsePath> {
    const url = new URL(this.projectUrl.concat("/").concat("paths"));
    try {
      return await this.getRequest<IResponsePath>(url);
    } catch (err) {
      this.onError(err);
      return Promise.reject(err);
    }
  }
}
