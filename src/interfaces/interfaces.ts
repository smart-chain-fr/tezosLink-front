export interface IMetrics {
	uuid: string;
	path: string;
	remote_address: string;
	date_requested: Date;
	projectUuid: string;
	project: IProject[];
	createdAt: Date;
	updatedAt: Date;
}

export interface IProject {
	uuid: string;
	title: string;
	createdAt: Date;
	updatedAt: Date;
	network: string;
	metrics?: IMetrics[];
}

