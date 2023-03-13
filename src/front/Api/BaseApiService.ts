import { FrontendVariables } from "@Front/config/VariablesFront";


export enum ContentType {
	JSON = "application/json",
	FORM_DATA = "multipart/form-data;",
}

export default abstract class BaseApiService {
	private static baseUrl: string;
	private static variables: FrontendVariables;
	protected constructor() {
		BaseApiService.variables ??= FrontendVariables.getInstance();
		BaseApiService.baseUrl ??= BaseApiService.variables.NEXT_PUBLIC_API_URL;
		console.log("BaseApiService", BaseApiService.baseUrl);
	}

	protected getBaseUrl() {
		return BaseApiService.baseUrl;
	}

	protected buildHeaders(contentType: ContentType) {
		const headers = new Headers();

		if (contentType === ContentType.JSON) {
			headers.set("Content-Type", contentType);
		}
		return headers;
	}

	protected buildBody(body: { [key: string]: unknown }): string {
		return JSON.stringify(body);
	}

	protected async getRequest<T>(url: URL) {
		const request = async () =>
			await fetch(url, {
				method: "GET",
				headers: this.buildHeaders(ContentType.JSON),
			});
		return this.sendRequest<T>(request);
	}

	protected async postRequest<T>(url: URL, body: { [key: string]: unknown } = {}) {
		const request = async () =>
			await fetch(url, {
				method: "POST",
				headers: this.buildHeaders(ContentType.JSON),
				body: this.buildBody(body),
			});

		return this.sendRequest<T>(request);
	}

	protected async putRequest<T>(url: URL, body: { [key: string]: unknown } = {}) {
		const request = async () =>
			await fetch(url, {
				method: "PUT",
				headers: this.buildHeaders(ContentType.JSON),
				body: this.buildBody(body),
			});

		return this.sendRequest<T>(request);
	}

	protected async patchRequest<T>(url: URL, body: { [key: string]: unknown } = {}) {
		const request = async () =>
			await fetch(url, {
				method: "PATCH",
				headers: this.buildHeaders(ContentType.JSON),
				body: this.buildBody(body),
			});

		return this.sendRequest<T>(request);
	}

	protected async deleteRequest<T>(url: URL, body: { [key: string]: unknown } = {}) {
		const request = async () =>
			await fetch(url, {
				method: "DELETE",
				headers: this.buildHeaders(ContentType.JSON),
				body: this.buildBody(body),
			});

		return this.sendRequest<T>(request);
	}

	protected async putFormDataRequest<T>(url: URL, body: FormData) {
		const request = async () =>
			await fetch(url, {
				method: "PUT",
				headers: this.buildHeaders(ContentType.FORM_DATA),
				body,
			});

		return this.sendRequest<T>(request);
	}

	private async sendRequest<T>(request: () => Promise<Response>): Promise<T> {
		const response = await request();
		return this.processResponse<T>(response, request);
	}

	protected async processResponse<T>(response: Response, request: () => Promise<Response>): Promise<T> {
		let responseJson: any | null;
		try {
			responseJson = await response.json();
		} catch (err: unknown) {
			responseJson = null;
		}

		if (!response.ok) {
			return Promise.reject(response);
		}

		return responseJson as T;
	}

	protected onError(error: unknown) {
		console.error(error);
	}
}

export interface IResponse {
	http_status: number;
}

