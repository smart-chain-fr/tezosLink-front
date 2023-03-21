import Card from "@/components/Elements/Card";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import classes from "./classes.module.scss";
import MetricInfo from "./MetricInfo";

type IState = {};

type IProps = {
  podType: string;
  name: string;
};

export default class PodMetrics extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={`Pod : ${this.props.name}`}>
        <div className={classes["root"]}>
          <div className={classes["header"]}>
            <div className={classes["title"]}>
              <h1>{this.props.podType}</h1>
            </div>
          </div>
          <div className={classes["sub-header"]}>
            {`POD ${this.props.name}`}
          </div>
          <div className={classes["content"]}>
            <Card
              title="Network Usage"
              data={true}
              content={<this.renderNetworkUsage />}
            />
            <Card
                title="CPU"
                data={true}
                content={<MetricInfo title="Usage" data={[]} />}
              />
              <Card
                title="RAM"
                data={true}
                content={<MetricInfo title="Usage" data={[]} />}
              />
          </div>
        </div>
      </DefaultTemplate>
    );
  }

  private renderNetworkUsage(): JSX.Element {
    return (
      <div className={classes["network-usage-container"]}>
        <MetricInfo title="Download" data={[]} />
        <MetricInfo title="Upload" data={[]} />
      </div>
    );
  }
}
