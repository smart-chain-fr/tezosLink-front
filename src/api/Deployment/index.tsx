import BaseApiService from "@/api/BaseApiService";
import { IPodType } from "../Pod";

export type IDeploymentResponse = {
  total: number;
  running: number;
};

export type DeploymentTypes = IPodType

export default class Deployment extends BaseApiService {
  private static instance: Deployment;
  private baseUrl = this.getBaseUrl();
  private readonly deploymentUrl = this.baseUrl.concat("/deployments");

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public async getDeployments(
    type: DeploymentTypes
  ): Promise<IDeploymentResponse> {
    const url = new URL(this.deploymentUrl.concat("/").concat(`${type}`));
    try {
      return await this.getRequest<IDeploymentResponse>(url);
    } catch (err) {
      this.onError(err);
      return Promise.reject(err);
    }
  }
}
