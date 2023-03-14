import BaseApiService from "@/front/api/BaseApiService";
import { Service } from "typedi";

interface IHttpReponse {
  status: number;
  reason: string | null;
}

interface IStatusNode {
  archive_node: IHttpReponse;
  rolling_node: IHttpReponse;
}

@Service()
export default class Status extends BaseApiService {
  private static instance: Status;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.instance) {
      return new this();
    } else {
      return this.instance;
    }
  }

  public async getHealthByUrl(url: string): Promise<IHttpReponse> {
    const healthUrl = new URL(url.concat("/health"));
    try {
      return await this.getRequest<IHttpReponse>(healthUrl);
    } catch (err) {
      this.onError(err);
      return Promise.reject(err);
    }
  }

  public async getStatusByUrl(url: string): Promise<IStatusNode> {
    const statusUrl = new URL(url.concat("/status"));
    try {
      return await this.getRequest<IStatusNode>(statusUrl);
    } catch (err) {
      this.onError(err);
      return Promise.reject(err);
    }
  }
}
