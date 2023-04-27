export interface IMetric {
  uuid: string;
  path: string;
  projectUuid: string;
  project: IProject;
  createdAt: string;
  updatedAt: string;
  remoteAddress: string;
  dateRequested: string;
  node: string;
  status: string;
  typeOfRequest: ITypeOfRequest;
}

export interface IMetricInfrastructure {
  uuid: string;
  podName: string;
  label: string;
  value: string;
  dateRequested: string;
  type: string;
  pod: IPod;
  createdAt: string;
  updatedAt: string;
}
export interface IPod {
  name: string;
  type: string;
  metricsInfrastructure: IMetricInfrastructure[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProject {
  uuid: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  network: string;
  metrics: IMetric[];
}
 
export interface ITypeOfRequest {
  uuid: string;
  path: string;
}