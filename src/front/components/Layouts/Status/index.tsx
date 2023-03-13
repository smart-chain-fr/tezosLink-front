import StatusNode from "../../Elements/StatusNode";
import StatusProxy from "../../Elements/StatusProxy";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import classes from "./classes.module.scss";

type IState = {};

export type IProps = {
  status: {
    mainnetProxyStatus: boolean;
    mainnetArchiveStatus: boolean;
    mainnetRollingStatus: boolean;
    testnetName: string;
    testnetProxyStatus: boolean;
    testnetArchiveStatus: boolean;
    testnetRollingStatus: boolean;
    date: string;
  };
};

export default class StatusLayout extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
  }
  public override render(): JSX.Element | null {
    const status = this.props.status;
    return (
      <DefaultTemplate title={"Status"}>
        <div className={classes["root"]}>
          <div className={classes["content"]}>
            <h2>Services status</h2>
            <StatusProxy
              proxyStatus={status!.mainnetProxyStatus}
              network={"Mainnet"}
              date={status.date!}
            />
            <StatusNode
              nodeArchiveStatus={status!.mainnetArchiveStatus}
              nodeRollingStatus={status.mainnetRollingStatus}
              network={"Mainnet"}
            />
            <StatusProxy
              proxyStatus={status.testnetProxyStatus}
              network={status.testnetName}
              date={status.date!}
            />
            <StatusNode
              nodeArchiveStatus={status.testnetArchiveStatus}
              nodeRollingStatus={status.testnetRollingStatus}
              network={status.testnetName}
            />
          </div>
        </div>
      </DefaultTemplate>
    );
  }
}
