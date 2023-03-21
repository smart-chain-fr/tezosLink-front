
import BaseApiService from "@/api/BaseApiService";
import { IProject } from "@/interfaces/Interfaces";

type IPostProject = {
	title: string;
	network: string;
};

export default class Project extends BaseApiService {
	private static instance: Project;
	private baseUrl = this.getBaseUrl();
	private readonly projectUrl = this.baseUrl.concat("/projects");

	private constructor() {
		super();
	}

	public static getInstance() {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}

	public async getAllProject(): Promise<IProject[]> {
		const url = new URL(this.projectUrl);
		try {
			return await this.getRequest<IProject[]>(url);
		} catch (err) {
			this.onError(err);
			return Promise.reject(err);
		}
	}

	public async getOneProject(uuid: string): Promise<IProject> {
		const url = new URL(this.projectUrl.concat("/").concat(uuid));
		try {
			return await this.getRequest<IProject>(url);
		} catch (err) {
			this.onError(err);
			return Promise.reject(err);
		}
	}

	public async postProject(params: IPostProject): Promise<IProject> {
		const url = new URL(this.projectUrl);
		try {
			return await this.postRequest<IProject>(url, params);
		} catch (err) {
			this.onError(err);
			return Promise.reject(err);
		}
	}
}

