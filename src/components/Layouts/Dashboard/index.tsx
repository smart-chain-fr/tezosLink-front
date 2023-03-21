import { Button } from "@Components/Elements/Button";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import classes from "./classes.module.scss";
import LastRequests from "./LastRequests";
import ProjectName from "./ProjectName";
import ProjectToken from "./ProjectToken";
import RequestsByDay from "./RequestsByDay";
import RpcUsage from "./RpcUsage";
import ModalCreatedProject from "./ModalCreatedProject";
import MonthlyRequests from "./MonthlyRequests";

type IState = {
  showModal: boolean;
};

type requestByDay = {
  date: Date;
  value: number;
};

type RPCUsage = {
  label: string;
  value: number;
};

type IProps = {
  network: string;
  title: string;
  uuid: string;
  firstTime: boolean;
  requestByDays: requestByDay[];
  lastRequests: string[];
  rpcUsage: RPCUsage[];
  rpcTotalCount?: number | undefined;
};

export default class Dashboard extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      showModal: this.props.firstTime,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={"Dashboard"}>
        <div className={classes["root"]}>
          <div className={classes["header"]}>
            <div className={classes["title"]}>
              <h1>Dashboard</h1>
              <div className={classes["network-button-container"]}>
                <Button text={this.props.network} color="secondary" />
              </div>
              <ProjectName name={this.props.title} />
            </div>
          </div>
          <RequestsByDay requestsByDays={null} />
          <MonthlyRequests monthlyRequests={null} />
          <RpcUsage
            rpcTotalCount={null}
            rpcUsage={null}
          />
           <LastRequests lastRequests={null} />
          <ProjectToken token={this.props.uuid} />

        </div>
        {this.state.showModal && (
          <ModalCreatedProject
            uuid={this.props.uuid}
            closeModal={this.closeModal}
          />
        )}
      </DefaultTemplate>
    );
  }

  private closeModal() {
    this.setState({ showModal: false });
  }
}
