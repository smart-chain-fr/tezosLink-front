import Deployment, { IDeploymentResponse } from "@/api/Deployment";
import Pod, { IPodsResponse } from "@/api/Pod";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import classes from "./classes.module.scss";
import PodInfo from "./PodInfo";

type IState = {
  gatewayTestnetData: IDeploymentResponse | null;
  gatewayMainnetData: IDeploymentResponse | null;
  apiData: IDeploymentResponse | null;
  rollingNodeData: IDeploymentResponse | null;
  archiveNodeData: IDeploymentResponse | null;
  webData: IDeploymentResponse | null;
  gatewayTestnetPods: IPodsResponse | null;
  gatewayMainnetPods: IPodsResponse | null;
  apiPods: IPodsResponse | null;
  rollingNodePods: IPodsResponse | null;
  archiveNodePods: IPodsResponse | null;
  webPods: IPodsResponse | null;
};

type IProps = {};

export default class InfrastructureService extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      gatewayTestnetData: null,
      gatewayMainnetData: null,
      apiData: null,
      rollingNodeData: null,
      archiveNodeData: null,
      webData: null,
      gatewayTestnetPods: null,
      gatewayMainnetPods: null,
      apiPods: null,
      rollingNodePods: null,
      archiveNodePods: null,
      webPods: null,
    };
  }

  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={"Infrastructure Service"}>
        <div className={classes["root"]}>
          <div className={classes["header"]}>
            <div className={classes["title"]}>
              <h1>Infrastructure Service</h1>
            </div>
          </div>
          <div className={classes["content"]}>
            <PodInfo
              title={"Web"}
              active={this.state.webData?.running ?? null}
              total={this.state.webData?.total ?? null}
              seeMoreLink={
                this.state.webPods?.[0]
                  ? `/pod/${this.state.webPods?.[0].name}`
                  : null
              }
            />
            <PodInfo
              title={"Api"}
              active={this.state.apiData?.running ?? null}
              total={this.state.apiData?.total ?? null}
              seeMoreLink={
                this.state.apiPods?.[0]
                  ? `/pod/${this.state.apiPods[0].name}`
                  : null
              }
            />
            <PodInfo
              title={"Proxy Mainnet"}
              active={this.state.gatewayMainnetData?.running ?? null}
              total={this.state.gatewayMainnetData?.total ?? null}
              seeMoreLink={
                this.state.gatewayMainnetPods?.[0]
                  ? `/pod/${this.state.gatewayMainnetPods[0].name}`
                  : null
              }
            />
            <PodInfo
              title={"Proxy Testnet"}
              active={this.state.gatewayTestnetData?.running ?? null}
              total={this.state.gatewayTestnetData?.total ?? null}
              seeMoreLink={
                this.state.gatewayTestnetPods?.[0]
                  ? `/pod/${this.state.gatewayTestnetPods[0].name}`
                  : null
              }
            />
            <PodInfo
              title={"Rolling"}
              active={this.state.rollingNodeData?.running ?? null}
              total={this.state.rollingNodeData?.total ?? null}
              seeMoreLink={
                this.state.rollingNodePods?.[0]
                  ? `/pod/${this.state.rollingNodePods[0].name}`
                  : null
              }
            />
            <PodInfo
              title={"Archive"}
              active={this.state.archiveNodeData?.running ?? null}
              total={this.state.archiveNodeData?.total ?? null}
              seeMoreLink={
                this.state.archiveNodePods?.[0]
                  ? `/pod/${this.state.archiveNodePods[0].name}`
                  : null
              }
            />
          </div>
        </div>
      </DefaultTemplate>
    );
  }

  public override async componentDidMount(): Promise<void> {
    this.getData();
  }

  private async getData(): Promise<void> {
    try {
      const gatewayTestnetData = await Deployment.getInstance().getDeployments(
        "testnet-tzlink-rpcgateway"
      );
      const gatewayMainnetData = await Deployment.getInstance().getDeployments(
        "mainnet-tzlink-rpcgateway"
      );
      const apiData = await Deployment.getInstance().getDeployments("tzlink-api");
      const rollingNodeData = await Deployment.getInstance().getDeployments(
        "rolling-node"
      );
      const archiveNodeData = await Deployment.getInstance().getDeployments(
        "archive-node"
      );
      const webData = await Deployment.getInstance().getDeployments("tzlink-web");

      const gatewayTestnetPods = await Pod.getInstance().getPods(
        "testnet-tzlink-rpcgateway"
      );
      const gatewayMainnetPods = await Pod.getInstance().getPods(
        "mainnet-tzlink-rpcgateway"
      );

      const apiPods = await Pod.getInstance().getPods("tzlink-api");
      const rollingNodePods = await Pod.getInstance().getPods("rolling-node");
      const archiveNodePods = await Pod.getInstance().getPods("archive-node");
      const webPods = await Pod.getInstance().getPods("tzlink-web");

      this.setState({
        gatewayTestnetData,
        gatewayMainnetData,
        apiData,
        rollingNodeData,
        archiveNodeData,
        webData,
        gatewayTestnetPods,
        gatewayMainnetPods,
        apiPods,
        rollingNodePods,
        archiveNodePods,
        webPods,
      });
    } catch (err) {
      console.error(err);
    }
  }
}
