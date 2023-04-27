import BaseApiService from "@/api/BaseApiService";
import { ITypeOfRequest } from "@/interfaces/interfaces";


export type ITypeOfRequestResponse = ITypeOfRequest[]

export default class TypeOfRequest extends BaseApiService {
  private static instance: TypeOfRequest;
  private baseUrl = this.getBaseUrl();
  private readonly typeOfRequest = this.baseUrl.concat("/types-of-requests");

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public async getTypeOfRequests(
  ): Promise<ITypeOfRequestResponse> {
    const url = new URL(this.typeOfRequest);
    try {
      return await this.getRequest<ITypeOfRequestResponse>(url);
    } catch (err) {
      this.onError(err);
      return Promise.reject(err);
    }
  }
}
