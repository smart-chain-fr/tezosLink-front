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
  mainnetRollingNodeData: IDeploymentResponse | null;
  mainnetArchiveNodeData: IDeploymentResponse | null;
  testnetRollingNodeData: IDeploymentResponse | null;
  testnetArchiveNodeData: IDeploymentResponse | null;
  webData: IDeploymentResponse | null;
  gatewayTestnetPods: IPodsResponse | null;
  gatewayMainnetPods: IPodsResponse | null;
  apiPods: IPodsResponse | null;
  mainnetRollingNodePods: IPodsResponse | null;
  mainnetArchiveNodePods: IPodsResponse | null;
  testnetRollingNodePods: IPodsResponse | null;
  testnetArchiveNodePods: IPodsResponse | null;
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
      mainnetRollingNodeData: null,
      mainnetArchiveNodeData: null,
      testnetRollingNodeData: null,
      testnetArchiveNodeData: null,
      webData: null,
      gatewayTestnetPods: null,
      gatewayMainnetPods: null,
      apiPods: null,
      mainnetRollingNodePods: null,
      mainnetArchiveNodePods: null,
      testnetRollingNodePods: null,
      testnetArchiveNodePods: null,
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
              title={"Mainnet Rolling"}
              active={this.state.mainnetRollingNodeData?.running ?? null}
              total={this.state.mainnetRollingNodeData?.total ?? null}
              seeMoreLink={
                this.state.mainnetRollingNodePods?.[0]
                  ? `/pod/${this.state.mainnetRollingNodePods[0].name}`
                  : null
              }
            />
            <PodInfo
              title={"Mainnet Archive"}
              active={this.state.mainnetArchiveNodeData?.running ?? null}
              total={this.state.mainnetArchiveNodeData?.total ?? null}
              seeMoreLink={
                this.state.mainnetArchiveNodePods?.[0]
                  ? `/pod/${this.state.mainnetArchiveNodePods[0].name}`
                  : null
              }
            />
            <PodInfo
              title={"Testnet Rolling"}
              active={this.state.testnetRollingNodeData?.running ?? null}
              total={this.state.testnetRollingNodeData?.total ?? null}
              seeMoreLink={
                this.state.testnetRollingNodePods?.[0]
                  ? `/pod/${this.state.testnetRollingNodePods[0].name}`
                  : null
              }
            />
            <PodInfo
              title={"Testnet Archive"}
              active={this.state.testnetArchiveNodeData?.running ?? null}
              total={this.state.testnetArchiveNodeData?.total ?? null}
              seeMoreLink={
                this.state.testnetArchiveNodePods?.[0]
                  ? `/pod/${this.state.testnetArchiveNodePods[0].name}`
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
      const mainnetRollingNodeData = await Deployment.getInstance().getDeployments(
        "mainnet-rolling-node"
      );
      const mainnetArchiveNodeData = await Deployment.getInstance().getDeployments(
        "mainnet-archive-node"
      );
      const testnetRollingNodeData = await Deployment.getInstance().getDeployments(
        "testnet-rolling-node"
      );
      const testnetArchiveNodeData = await Deployment.getInstance().getDeployments(
        "testnet-archive-node"
      );
      const webData = await Deployment.getInstance().getDeployments("tzlink-web");

      const gatewayTestnetPods = await Pod.getInstance().getPods(
        "testnet-tzlink-rpcgateway"
      );
      const gatewayMainnetPods = await Pod.getInstance().getPods(
        "mainnet-tzlink-rpcgateway"
      );

      const apiPods = await Pod.getInstance().getPods("tzlink-api");
      const mainnetRollingNodePods = await Pod.getInstance().getPods("mainnet-rolling-node");
      const mainnetArchiveNodePods = await Pod.getInstance().getPods("mainnet-archive-node");
      const testnetRollingNodePods = await Pod.getInstance().getPods("testnet-rolling-node");
      const testnetArchiveNodePods = await Pod.getInstance().getPods("testnet-archive-node");
      const webPods = await Pod.getInstance().getPods("tzlink-web");

      this.setState({
        gatewayTestnetData,
        gatewayMainnetData,
        apiData,
        mainnetRollingNodeData,
        mainnetArchiveNodeData,
        testnetRollingNodeData,
        testnetArchiveNodeData,
        webData,
        gatewayTestnetPods,
        gatewayMainnetPods,
        apiPods,
        mainnetRollingNodePods,
        mainnetArchiveNodePods,
        testnetRollingNodePods,
        testnetArchiveNodePods,
        webPods,
      });
    } catch (err) {
      console.error(err);
    }
  }
}
