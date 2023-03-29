import { Button } from "@Components/Elements/Button";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import classes from "./classes.module.scss";
import LastRequests from "./LastRequests";
import ModalCreatedProject from "./ModalCreatedProject";
import ProjectName from "./ProjectName";
import ProjectToken from "./ProjectToken";

import Metric, {
  IResponseCountRequests,
  IResponseMyRequests,
  IResponseRequests,
  IResponseTypeOfRequests,
} from "@/api/Metric";
import DateModalSelector from "@/components/Elements/DateModalSelector";
import { DateRange } from "react-day-picker";
import CountRequests from "./CountRequests";
import MyRequests from "./MyRequests";
import Newsletter from "./Newsletter";
import TypeOfRequests from "./TypeOfRequests";

type IState = {
  showModal: boolean;
  myRequests: IResponseMyRequests | null;
  countRequests: IResponseCountRequests | null;
  typeOfRequests: IResponseTypeOfRequests | null;
  lastRequests: IResponseRequests | null;
  from?: Date;
  to?: Date;
};

type IProps = {
  network: string;
  title: string;
  uuid: string;
  firstTime: boolean;
};

export default class Dashboard extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    const now = new Date().getTime();
    let startOfDay = now - (now % 86400000);
    let endDate = startOfDay + 86400000;

    super(props);
    this.state = {
      showModal: this.props.firstTime,
      myRequests: null,
      countRequests: null,
      typeOfRequests: null,
      lastRequests: null,
      from: new Date(startOfDay),
      to: new Date(endDate),
    };
    this.closeModal = this.closeModal.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={"Dashboard"}>
        <div className={classes["root"]}>
          <div className={classes["header"]}>
            <div className={classes["title"]}>
              <h1>Dashboard</h1>
              <div className={classes["container-network"]}>
                <div className={classes["network-button-container"]}>
                  <Button text={this.props.network} color="secondary" />
                </div>
                <ProjectName name={this.props.title} />
              </div>
            </div>
            <DateModalSelector
              value={{ from: this.state.from, to: this.state.to }}
              onChange={this.onDateChange}
            />
          </div>

          <div className={classes["content"]}>
            <div className={classes["container-row"]}>
              <MyRequests requests={this.state.myRequests} />
              <CountRequests count={this.state.countRequests} />
            </div>
            <div className={classes["container-row"]}>
              <TypeOfRequests typeOfRequests={this.state.typeOfRequests} />
              <LastRequests
                lastRequests={this.state.lastRequests}
                projectUuid={this.props.uuid}
              />
            </div>
            <div className={classes["container-row"]}>
              <Newsletter />
              <ProjectToken token={this.props.uuid} />
            </div>
          </div>
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

  public override async componentDidMount() {
    this.fetchData(this.state.from, this.state.to);
  }

  private async onDateChange(range?: DateRange) {
    const formattedRange = range ?? { from: undefined, to: undefined}
    if(!range){
      const now = new Date().getTime();
      let startOfDay = now - (now % 86400000);
      let endDate = startOfDay + 86400000;
      formattedRange.from = new Date(startOfDay);
      formattedRange.to = new Date(endDate);
    }
    this.setState(
      formattedRange,
      () => {
        this.fetchData(this.state.from, this.state.to);
      }
    );
  }

  private async fetchData(from?: Date, to?: Date) {
    try {
      const myRequests = await Metric.getInstance().getMyRequestMetrics(
        this.props.uuid,
        from?.toISOString(),
        to?.toISOString()
      );
      const countRequests = await Metric.getInstance().countRequests(
        this.props.uuid,
        from?.toISOString(),
        to?.toISOString()
      );
      const typeOfRequests = await Metric.getInstance().getTypeOfRequests(
        this.props.uuid,
        from?.toISOString(),
        to?.toISOString()
      );
      const lastRequests = await Metric.getInstance().getAll({
        projectUuid: this.props.uuid,
        from: from?.toISOString(),
        to: to?.toISOString(),
      });
      this.setState({
        myRequests,
        countRequests,
        typeOfRequests,
        lastRequests,
      });
    } catch (err) {
      console.error(err);
    }
  }

  private closeModal() {
    this.setState({ showModal: false });
  }
}
