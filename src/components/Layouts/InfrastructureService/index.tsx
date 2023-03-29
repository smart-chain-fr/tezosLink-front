import Deployment, { IDeploymentResponse } from "@/api/Deployment";
import Pod, { IPodsResponse, IPodType } from "@/api/Pod";
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
        IPodType.TESTNET_GATEWAY
      );
      const gatewayMainnetData = await Deployment.getInstance().getDeployments(
        IPodType.MAINNET_GATEWAY
      );
      const apiData = await Deployment.getInstance().getDeployments(IPodType.API);
      const mainnetRollingNodeData = await Deployment.getInstance().getDeployments(
        IPodType.MAINNET_ROLLING_NODE
      );
      const mainnetArchiveNodeData = await Deployment.getInstance().getDeployments(
        IPodType.MAINNET_ARCHIVE_NODE
      );
      const testnetRollingNodeData = await Deployment.getInstance().getDeployments(
        IPodType.TESTNET_ROLLING_NODE
      );
      const testnetArchiveNodeData = await Deployment.getInstance().getDeployments(
        IPodType.TESTNET_ARCHIVE_NODE
      );
      const webData = await Deployment.getInstance().getDeployments(IPodType.WEB);

      const gatewayTestnetPods = await Pod.getInstance().getPods(
        IPodType.TESTNET_GATEWAY
      );
      const gatewayMainnetPods = await Pod.getInstance().getPods(
        IPodType.MAINNET_GATEWAY
      );

      const apiPods = await Pod.getInstance().getPods(IPodType.API);
      const mainnetRollingNodePods = await Pod.getInstance().getPods(IPodType.MAINNET_ROLLING_NODE);
      const mainnetArchiveNodePods = await Pod.getInstance().getPods(IPodType.MAINNET_ARCHIVE_NODE);
      const testnetRollingNodePods = await Pod.getInstance().getPods(IPodType.TESTNET_ROLLING_NODE);
      const testnetArchiveNodePods = await Pod.getInstance().getPods(IPodType.TESTNET_ARCHIVE_NODE);
      const webPods = await Pod.getInstance().getPods(IPodType.WEB);

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
