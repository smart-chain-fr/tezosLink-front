import Pod, { IPodsResponse, IPodType, PodMetricType } from "@/api/Pod";
import Card from "@/components/Elements/Card";
import Selector from "@/components/Elements/Selector";
import { IMetricInfrastructure } from "@/interfaces/interfaces";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import { format } from "date-fns";
import { NextRouter, withRouter } from "next/router";
import classes from "./classes.module.scss";
import MetricInfo from "./MetricInfo";

type IState = {
  networkInput: IMetricInfrastructure[] | null;
  networkOutput: IMetricInfrastructure[] | null;
  cpuUsage: IMetricInfrastructure[] | null;
  cpuRequest: IMetricInfrastructure[] | null;
  cpuLimit: IMetricInfrastructure[] | null;
  ramUsage: IMetricInfrastructure[] | null;
  ramRequest: IMetricInfrastructure[] | null;
  ramLimit: IMetricInfrastructure[] | null;
  pods: IPodsResponse | null;
};

interface WithRouterProps {
  router: NextRouter;
}

type IProps = {
  podName: string;
  podType: string;
} & WithRouterProps;

const PAGE_SIZE = 10;

class PodMetrics extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      networkInput: null,
      networkOutput: null,
      cpuUsage: null,
      cpuRequest: null,
      cpuLimit: null,
      ramUsage: null,
      ramRequest: null,
      ramLimit: null,
      pods: null,
    };

    this.getChartOptions = this.getChartOptions.bind(this);
    this.getNetworkSeries = this.getNetworkSeries.bind(this);
    this.getCpuSeries = this.getCpuSeries.bind(this);
    this.getRamSeries = this.getRamSeries.bind(this);
    this.handleChangeSelector = this.handleChangeSelector.bind(this);
  }

  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={`Pod : ${this.props.podName}`}>
        <div className={classes["root"]}>
          <div className={classes["header"]}>
            <div className={classes["title"]}>
              <h1>{this.props.podType}</h1>
            </div>
            {this.state.pods?.length !== 0 && (
              <div>
                <Selector
                  options={(this.state.pods ?? []).map((pod) => {
                    return { label: pod.name, value: pod.name };
                  })}
                  value={this.props.podName}
                  selectCallback={this.handleChangeSelector}
                />
              </div>
            )}
          </div>
          <div className={classes["sub-header"]}>
            {`POD : ${this.props.podName}`}
          </div>
          <div className={classes["content"]}>
            <Card
              title="Network"
              data={true}
              content={
                <MetricInfo
                  title="Usage"
                  options={this.getChartOptions("network")}
                  series={this.getNetworkSeries()}
                />
              }
            />
            <Card
              title="CPU"
              data={true}
              content={
                <MetricInfo
                  title="Usage"
                  options={this.getChartOptions("cpu")}
                  series={this.getCpuSeries()}
                />
              }
            />
            <Card
              title="RAM"
              data={true}
              content={
                <MetricInfo
                  title="Usage"
                  options={this.getChartOptions("ram")}
                  series={this.getRamSeries()}
                />
              }
            />
          </div>
        </div>
      </DefaultTemplate>
    );
  }

  public override async componentDidMount() {
    try {
      const pods = await Pod.getInstance().getPods(
        this.props.podType as IPodType
      );
      this.setState({
        pods,
      });
    } catch (err) {
      console.error(err);
    }
    this.fetchData(this.props.podName);
  }

  private async fetchData(podName: string) {
    try {
      Promise.all([
        this.fetchNetworkInput(podName),
        this.fetchNetworkOutput(podName),
        this.fetchCpuUsage(podName),
        this.fetchCpuRequest(podName),
        this.fetchCpuLimit(podName),
        this.fetchRamUsage(podName),
        this.fetchRamRequest(podName),
        this.fetchRamLimit(podName),
      ]).then((values) => {
        this.setState({
          networkInput: values[0],
          networkOutput: values[1],
          cpuUsage: values[2],
          cpuRequest: values[3],
          cpuLimit: values[4],
          ramUsage: values[5],
          ramRequest: values[6],
          ramLimit: values[7],
        });
      });
    } catch (err) {
      console.error(err);
    }
  }

  private async fetchNetworkInput(podName: string) {
    const networkInput = [];
    let page = 1;
    let data;
    let networkInputHasMoreDataToLoad = true;
    while (networkInputHasMoreDataToLoad) {
      data = await Pod.getInstance().getPodMetrics({
        podName,
        type: PodMetricType.NETWORK_RECEIVE,
        _limit: PAGE_SIZE,
        _page: page,
      });
      networkInput.push(...data.data);
      networkInputHasMoreDataToLoad = false; //networkInput.length < data.metadata.total;
      page++;
    }
    return networkInput;
  }

  private async fetchNetworkOutput(podName: string) {
    const networkOutput = [];
    let page = 1;
    let data;
    let networkOutputHasMoreDataToLoad = true;
    while (networkOutputHasMoreDataToLoad) {
      data = await Pod.getInstance().getPodMetrics({
        podName,
        type: PodMetricType.NETWORK_TRANSMIT,
        _limit: PAGE_SIZE,
        _page: page,
      });
      networkOutput.push(...data.data);
      networkOutputHasMoreDataToLoad = false;
      //networkOutput.length < data.metadata.total;
      page++;
    }
    return networkOutput;
  }

  private async fetchCpuUsage(podName: string) {
    const cpuUsage = [];
    let page = 1;
    let data;
    let cpuUsageHasMoreDataToLoad = true;
    while (cpuUsageHasMoreDataToLoad) {
      data = await Pod.getInstance().getPodMetrics({
        podName,
        type: PodMetricType.CPU_USAGE,
        _limit: PAGE_SIZE,
        _page: page,
      });
      cpuUsage.push(...data.data);
      cpuUsageHasMoreDataToLoad = false; //cpuUsage.length < data.metadata.total;
      page++;
    }
    return cpuUsage;
  }

  private async fetchCpuLimit(podName: string) {
    const cpuLimit = [];
    let page = 1;
    let data;
    let cpuLimitHasMoreDataToLoad = true;
    while (cpuLimitHasMoreDataToLoad) {
      data = await Pod.getInstance().getPodMetrics({
        podName,
        type: PodMetricType.CPU_LIMIT,
        _limit: PAGE_SIZE,
        _page: page,
      });
      cpuLimit.push(...data.data);
      cpuLimitHasMoreDataToLoad = false; //cpuLimit.length < data.metadata.total;
      page++;
    }
    return cpuLimit;
  }

  private async fetchCpuRequest(podName: string) {
    const cpuRequest = [];
    let page = 1;
    let data;
    let cpuRequestHasMoreDataToLoad = true;
    while (cpuRequestHasMoreDataToLoad) {
      data = await Pod.getInstance().getPodMetrics({
        podName,
        type: PodMetricType.CPU_REQUESTED,
        _limit: PAGE_SIZE,
        _page: page,
      });
      cpuRequest.push(...data.data);
      cpuRequestHasMoreDataToLoad = false; //cpuRequest.length < data.metadata.total;
      page++;
    }
    return cpuRequest;
  }

  private async fetchRamUsage(podName: string) {
    const ramUsage = [];
    let page = 1;
    let data;
    let ramUsageHasMoreDataToLoad = true;
    while (ramUsageHasMoreDataToLoad) {
      data = await Pod.getInstance().getPodMetrics({
        podName,
        type: PodMetricType.RAM_USAGE,
        _limit: PAGE_SIZE,
        _page: page,
      });
      ramUsage.push(...data.data);
      ramUsageHasMoreDataToLoad = false; //ramUsage.length < data.metadata.total;
      page++;
    }
    return ramUsage;
  }

  private async fetchRamLimit(podName: string) {
    const ramLimit = [];
    let page = 1;
    let data;
    let ramLimitHasMoreDataToLoad = true;
    while (ramLimitHasMoreDataToLoad) {
      data = await Pod.getInstance().getPodMetrics({
        podName,
        type: PodMetricType.RAM_LIMIT,
        _limit: PAGE_SIZE,
        _page: page,
      });
      ramLimit.push(...data.data);
      ramLimitHasMoreDataToLoad = false; //ramLimit.length < data.metadata.total;
      page++;
    }
    return ramLimit;
  }

  private async fetchRamRequest(podName: string) {
    const ramRequest = [];
    let page = 1;
    let data;
    let ramRequestHasMoreDataToLoad = true;
    while (ramRequestHasMoreDataToLoad) {
      data = await Pod.getInstance().getPodMetrics({
        podName,
        type: PodMetricType.RAM_REQUESTED,
        _limit: PAGE_SIZE,
        _page: page,
      });
      ramRequest.push(...data.data);
      ramRequestHasMoreDataToLoad = false; //ramRequest.length < data.metadata.total;
      page++;
    }
    return ramRequest;
  }

  private handleChangeSelector(option?: { label: string; value?: string }) {
    if (!option?.value || option.value === this.props.podName) return;
    this.props.router.push("/pod/" + option.value);
    this.fetchData(option.value);
  }

  private getChartOptions(type: "cpu" | "ram" | "network") {
    let yFormatter;
    if (type === "cpu") {
      yFormatter = (value: number) => `${value}`;
    }
    if (type === "ram") {
      yFormatter = (value: number) => `${value} MB`;
    }
    if (type === "network") {
      yFormatter = (value: number) => `${value} KB`;
    }
    return {
      chart: {
        id: "basic-bar",
        toolbar: {
          tools: {
            download: false,
            pan: false,
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
        // colors: ["#42E8E0", "#FCB13B", "#3efc3b"],
      },
      markers: {
        size: 2,
        // colors: ["#42E8E0", "#FCB13B", "#3efc3b"],
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      toolbar: {
        tools: {
          download: false,
        },
      },

      tooltip: {
        enabled: true,
        theme: "dark",
        //@ts-ignore
        x: {
          formatter: function (value) {
            return format(new Date(value), "Pp");
          },
        },
        y: {
          formatter: yFormatter,
        },
      },
      legend: {
        show: true,
        labels: {
          colors: "#FFF",
          useSeriesColors: true,
        },
        itemMargin: {
          horizontal: 20,
          vertical: 10,
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
          rotate: 0,
          datetimeUTC: false,
          style: {
            colors: "#FFF",
          },
        },
      },

      yaxis: {
        labels: {
          show: true,
          style: {
            colors: "#FFF",
          },
        },
      },
    } as ApexCharts.ApexOptions;
  }

  private getNetworkSeries() {
    return [
      {
        name: "Input",
        type: "line",
        data: (this.state.networkInput ?? []).map((rq) => {
          return {
            x: new Date(rq.dateRequested).getTime(),
            y: roundNetworkValue(rq.value),
          };
        }),
      },
      {
        name: "Output",
        type: "line",
        data: (this.state.networkOutput ?? []).map((rq) => {
          return {
            x: new Date(rq.dateRequested).getTime(),
            y: roundNetworkValue(rq.value),
          };
        }),
      },
    ] as ApexAxisChartSeries;
  }

  private getCpuSeries() {
    return [
      {
        name: "Usage",
        type: "line",
        data: (this.state.cpuUsage ?? []).map((rq) => {
          return {
            x: new Date(rq.dateRequested).getTime(),
            y: roundCpuValue(rq.value),
          };
        }),
      },
      {
        name: "Limit",
        type: "line",
        data: (this.state.cpuLimit ?? []).map((rq) => {
          return {
            x: new Date(rq.dateRequested).getTime(),
            y: roundCpuValue(rq.value),
          };
        }),
      },
      {
        name: "Request",
        type: "line",
        data: (this.state.cpuRequest ?? []).map((rq) => {
          return {
            x: new Date(rq.dateRequested).getTime(),
            y: roundCpuValue(rq.value),
          };
        }),
      },
    ] as ApexAxisChartSeries;
  }

  private getRamSeries() {
    return [
      {
        name: "Usage",
        type: "line",
        data: (this.state.ramUsage ?? []).map((rq) => {
          return {
            x: new Date(rq.dateRequested).getTime(),
            y: roundRamValue(rq.value),
          };
        }),
      },
      {
        name: "Limit",
        type: "line",
        data: (this.state.ramLimit ?? []).map((rq) => {
          return {
            x: new Date(rq.dateRequested).getTime(),
            y: roundRamValue(rq.value),
          };
        }),
      },
      {
        name: "Request",
        type: "line",
        data: (this.state.ramRequest ?? []).map((rq) => {
          return {
            x: new Date(rq.dateRequested).getTime(),
            y: roundRamValue(rq.value),
          };
        }),
      },
    ] as ApexAxisChartSeries;
  }
}

function roundRamValue(value: string) {
  return Math.round(parseInt(value) / 10000) / 100;
}

function roundCpuValue(value: string) {
  return Math.round(parseFloat(value) * 1000) / 1000;
}

function roundNetworkValue(value: string) {
  return Math.round(parseInt(value) / 10) / 100;
}

export default withRouter(PodMetrics);
