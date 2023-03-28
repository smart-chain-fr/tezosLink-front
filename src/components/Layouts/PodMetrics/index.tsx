import Pod, { IPodsResponse, IPodType } from "@/api/Pod";
import Card from "@/components/Elements/Card";
import Selector from "@/components/Elements/Selector";
import { IMetricInfrastructure } from "@/interfaces/interfaces";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import { NextRouter, withRouter } from "next/router";
import classes from "./classes.module.scss";
import MetricInfo from "./MetricInfo";

type IState = {
  networkInput: IMetricInfrastructure[] | null;
  networkOutput: IMetricInfrastructure[] | null;
  cpuUsage: IMetricInfrastructure[] | null;
  cpuRequested: IMetricInfrastructure[] | null;
  cpuLimit: IMetricInfrastructure[] | null;
  ramUsage: IMetricInfrastructure[] | null;
  ramRequested: IMetricInfrastructure[] | null;
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

class PodMetrics extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      networkInput: null,
      networkOutput: null,
      cpuUsage: null,
      cpuRequested: null,
      cpuLimit: null,
      ramUsage: null,
      ramRequested: null,
      ramLimit: null,
      pods: null,
    };

    this.getNetworkOptions = this.getNetworkOptions.bind(this);
    this.getNetworkSeries = this.getNetworkSeries.bind(this);
    this.getCpuOptions = this.getCpuOptions.bind(this);
    this.getCpuSeries = this.getCpuSeries.bind(this);
    this.getRamOptions = this.getRamOptions.bind(this);
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
                  options={(this.state.pods ?? []).map((pod) => pod.name)}
                  defaultOption={this.props.podName}
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
                  options={this.getNetworkOptions()}
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
                  options={this.getCpuOptions()}
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
                  options={this.getRamOptions()}
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
    const networkInput = [];
    const networkOutput = [];
    const cpuUsage = [];
    const cpuRequested = [];
    const cpuLimit = [];
    const ramUsage = [];
    const ramRequested = [];
    const ramLimit = [];
    let networkInputHasMoreDataToLoad = true;
    let networkOutputHasMoreDataToLoad = true;
    let cpuUsageHasMoreDataToLoad = true;
    let cpuRequestedHasMoreDataToLoad = true;
    let cpuLimitHasMoreDataToLoad = true;
    let ramUsageHasMoreDataToLoad = true;
    let ramRequestedHasMoreDataToLoad = true;
    let ramLimitHasMoreDataToLoad = true;
    let data;
    try {
      while (networkInputHasMoreDataToLoad) {
         data = await Pod.getInstance().getPodMetrics(
          podName,
          "network-receive"
        );
        networkInput.push(...data.data);
        networkInputHasMoreDataToLoad =
          networkInput.length < data.metadata.total;
      }

      while (networkOutputHasMoreDataToLoad) {
        data = await Pod.getInstance().getPodMetrics(
          podName,
          "network-transmit"
        );
        networkOutput.push(...data.data);
        networkOutputHasMoreDataToLoad =
          networkOutput.length < data.metadata.total;
      }
      while (cpuUsageHasMoreDataToLoad) {
        const data = await Pod.getInstance().getPodMetrics(
          podName,
          "cpu-usage"
        );
        cpuUsage.push(...data.data);
        cpuUsageHasMoreDataToLoad =
          cpuUsage.length < data.metadata.total;
      }

      while (cpuRequestedHasMoreDataToLoad) {
        const data = await Pod.getInstance().getPodMetrics(
          podName,
          "cpu-requested"
        );
        cpuRequested.push(...data.data);
        cpuRequestedHasMoreDataToLoad =
          cpuRequested.length < data.metadata.total;
      }

      while (cpuLimitHasMoreDataToLoad) {
        const data = await Pod.getInstance().getPodMetrics(
          podName,
          "cpu-limit"
        );
        cpuLimit.push(...data.data);
        cpuLimitHasMoreDataToLoad =
          cpuLimit.length < data.metadata.total;
      }

      while (ramUsageHasMoreDataToLoad) {
        const data =await Pod.getInstance().getPodMetrics(
          podName,
          "ram-usage"
        );
        ramUsage.push(...data.data);
        ramUsageHasMoreDataToLoad =
          ramUsage.length < data.metadata.total;
      }

      while (ramRequestedHasMoreDataToLoad) {
        const data = await Pod.getInstance().getPodMetrics(
          podName,
          "ram-requested"
        );
        ramRequested.push(...data.data);
        ramRequestedHasMoreDataToLoad =
          ramRequested.length < data.metadata.total;
      }

      while (ramLimitHasMoreDataToLoad) {
        const data = await Pod.getInstance().getPodMetrics(
          podName,
          "ram-limit"
        );
        ramLimit.push(...data.data);
        ramLimitHasMoreDataToLoad =
          ramLimit.length < data.metadata.total;
      }

  
      this.setState({
        networkInput,
        networkOutput,
        cpuUsage,
        cpuRequested,
        cpuLimit,
        ramUsage,
        ramRequested,
        ramLimit,
      });
    } catch (err) {
      console.error(err);
    }
  }

  private handleChangeSelector(value?: string) {
    if (!value || value === this.props.podName) return;
    this.props.router.push("/pod/" + value);
    this.fetchData(value);
  }

  private getNetworkOptions() {
    return {
      chart: {
        id: "basic-bar",
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#42E8E0", "#FCB13B"],
      },
      markers: {
        size: 2,
        colors: ["#42E8E0", "#FCB13B"],
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      tooltip: {
        enabled: true,
        theme: "dark",
      },
      legend: {
        show: true,
        labels: {
          useSeriesColors: true,
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
          rotate: 0,
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
          return { x: new Date(rq.dateRequested).getTime(), y: rq.value };
        }),
      },
      {
        name: "Output",
        type: "line",
        data: (this.state.networkOutput ?? []).map((rq) => {
          return { x: new Date(rq.dateRequested).getTime(), y: rq.value };
        }),
      },
    ] as ApexAxisChartSeries;
  }

  private getCpuOptions() {
    return {
      chart: {
        id: "basic-bar",
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#42E8E0", "#FCB13B", "#709587"],
      },
      markers: {
        size: 2,
        colors: ["#42E8E0", "#FCB13B", "#709587"],
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      legend: {
        show: true,
        labels: {
          useSeriesColors: true,
        },
      },
      tooltip: {
        enabled: true,
        theme: "dark",
      },
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
          rotate: 0,
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

  private getCpuSeries() {
    return [
      {
        name: "Usage",
        type: "line",
        data: (this.state.cpuUsage ?? []).map((rq) => {
          return { x: new Date(rq.dateRequested).getTime(), y: rq.value };
        }),
      },
      {
        name: "Limit",
        type: "line",
        data: (this.state.cpuLimit ?? []).map((rq) => {
          return { x: new Date(rq.dateRequested).getTime(), y: rq.value };
        }),
      },
      {
        name: "Requested",
        type: "line",
        data: (this.state.cpuRequested ?? []).map((rq) => {
          return { x: new Date(rq.dateRequested).getTime(), y: rq.value };
        }),
      },
    ] as ApexAxisChartSeries;
  }

  private getRamOptions() {
    return {
      chart: {
        id: "basic-bar",
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#42E8E0", "#FCB13B", "#709587"],
      },
      markers: {
        size: 2,
        colors: ["#42E8E0", "#FCB13B", "#709587"],
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      legend: {
        show: true,
        labels: {
          useSeriesColors: true,
        },
      },
      tooltip: {
        enabled: true,
        theme: "dark",
      },
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
          rotate: 0,
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

  private getRamSeries() {
    return [
      {
        name: "Usage",
        type: "line",
        data: (this.state.ramUsage ?? []).map((rq) => {
          return { x: new Date(rq.dateRequested).getTime(), y: rq.value };
        }),
      },
      {
        name: "Limit",
        type: "line",
        data: (this.state.ramLimit ?? []).map((rq) => {
          return { x: new Date(rq.dateRequested).getTime(), y: rq.value };
        }),
      },
      {
        name: "Requested",
        type: "line",
        data: (this.state.ramRequested ?? []).map((rq) => {
          return { x: new Date(rq.dateRequested).getTime(), y: rq.value };
        }),
      },
    ] as ApexAxisChartSeries;
  }
}

export default withRouter(PodMetrics);
