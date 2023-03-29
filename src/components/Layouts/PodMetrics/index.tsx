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
                  options={(this.state.pods ?? []).map((pod) => pod.name)}
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
                  options={this.getChartOptions()}
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
                  options={this.getChartOptions()}
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
                  options={this.getChartOptions()}
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
    const cpuRequest = [];
    const cpuLimit = [];
    const ramUsage = [];
    const ramRequest = [];
    const ramLimit = [];
    let networkInputHasMoreDataToLoad = true;
    let networkOutputHasMoreDataToLoad = true;
    let cpuUsageHasMoreDataToLoad = true;
    let cpuRequestHasMoreDataToLoad = true;
    let cpuLimitHasMoreDataToLoad = true;
    let ramUsageHasMoreDataToLoad = true;
    let ramRequestHasMoreDataToLoad = true;
    let ramLimitHasMoreDataToLoad = true;
    let data;
    try {
      while (networkInputHasMoreDataToLoad) {
        data = await Pod.getInstance().getPodMetrics(
          podName,
          PodMetricType.NETWORK_RECEIVE
        );
        networkInput.push(...data.data);
        networkInputHasMoreDataToLoad =
          networkInput.length < data.metadata.total;
      }

      while (networkOutputHasMoreDataToLoad) {
        data = await Pod.getInstance().getPodMetrics(
          podName,
          PodMetricType.NETWORK_TRANSMIT
        );
        networkOutput.push(...data.data);
        networkOutputHasMoreDataToLoad =
          networkOutput.length < data.metadata.total;
      }
      while (cpuUsageHasMoreDataToLoad) {
        const data = await Pod.getInstance().getPodMetrics(
          podName,
          PodMetricType.CPU_USAGE
        );
        cpuUsage.push(...data.data);
        cpuUsageHasMoreDataToLoad = cpuUsage.length < data.metadata.total;
      }

      while (cpuRequestHasMoreDataToLoad) {
        const data = await Pod.getInstance().getPodMetrics(
          podName,
          PodMetricType.CPU_REQUESTED
        );
        cpuRequest.push(...data.data);
        cpuRequestHasMoreDataToLoad = cpuRequest.length < data.metadata.total;
      }

      while (cpuLimitHasMoreDataToLoad) {
        const data = await Pod.getInstance().getPodMetrics(
          podName,
          PodMetricType.CPU_LIMIT
        );
        cpuLimit.push(...data.data);
        cpuLimitHasMoreDataToLoad = cpuLimit.length < data.metadata.total;
      }

      while (ramUsageHasMoreDataToLoad) {
        const data = await Pod.getInstance().getPodMetrics(
          podName,
          PodMetricType.RAM_USAGE
        );
        ramUsage.push(...data.data);
        ramUsageHasMoreDataToLoad = ramUsage.length < data.metadata.total;
      }

      while (ramRequestHasMoreDataToLoad) {
        const data = await Pod.getInstance().getPodMetrics(
          podName,
          PodMetricType.RAM_REQUESTED
        );
        ramRequest.push(...data.data);
        ramRequestHasMoreDataToLoad = ramRequest.length < data.metadata.total;
      }

      while (ramLimitHasMoreDataToLoad) {
        const data = await Pod.getInstance().getPodMetrics(
          podName,
          PodMetricType.RAM_LIMIT
        );
        ramLimit.push(...data.data);
        ramLimitHasMoreDataToLoad = ramLimit.length < data.metadata.total;
      }

      this.setState({
        networkInput,
        networkOutput,
        cpuUsage,
        cpuRequest,
        cpuLimit,
        ramUsage,
        ramRequest,
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

  private getChartOptions() {
    return {
      chart: {
        id: "basic-bar",
        toolbar:{
          tools:{
            download: false,
            pan: false,
          }
        },
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
      toolbar: {
        tools: {
          download: false
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
      },
      legend: {
        show: true,
        labels: {
          colors: ["#42E8E0", "#FCB13B"],
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
        name: "Request",
        type: "line",
        data: (this.state.cpuRequest ?? []).map((rq) => {
          return { x: new Date(rq.dateRequested).getTime(), y: rq.value };
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
        name: "Request",
        type: "line",
        data: (this.state.ramRequest ?? []).map((rq) => {
          return { x: new Date(rq.dateRequested).getTime(), y: rq.value };
        }),
      },
    ] as ApexAxisChartSeries;
  }
}

// function getPodType(type: IPodType){
//   switch(type){
//     case IPodType.Deployment:
//   }
// }

export default withRouter(PodMetrics);
