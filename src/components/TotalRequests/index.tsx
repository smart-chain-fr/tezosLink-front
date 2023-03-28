import Metric, {
  IResponsePath,
  IResponseRequests,
  NodeType,
  RequestStatus,
} from "@/api/Metric";

import { IMetric } from "@/interfaces/interfaces";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import { format } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";
import { Button } from "../Elements/Button";
import DateModalSelector from "../Elements/DateModalSelector";
import InfinitScrollVertical from "../Elements/InfinitScroll/Vertical";
import Selector from "../Elements/Selector";
import classes from "./classes.module.scss";
import BlacklistedChip from "./StatusChip/BlacklistedChip";
import CompletedChip from "./StatusChip/CompletedChip";
import FailedChip from "./StatusChip/FailedChip";
import SuccessfulChip from "./StatusChip/SuccessfulChip";

type IState = {
  data: IResponseRequests | null;
  from?: Date;
  to?: Date;
  node?: string;
  type?: string;
  status?: RequestStatus;
  types?: IResponsePath;
  showMobileFilters: boolean;
};

export type IProps = {
  uuid: string;
};

const NODE_PLACEHOLDER = "Select a node";
const TYPE_PLACEHOLDER = "Select a type";
export default class TotalRequest extends BasePage<IProps, IState> {
  private contentVersion = 0;

  public constructor(props: IProps) {
    super(props);
    this.state = {
      data: null,
      showMobileFilters: false,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.submitFilters = this.submitFilters.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.renderFilters = this.renderFilters.bind(this);
    this.toggleMobileFilters = this.toggleMobileFilters.bind(this);
  }

  private static scrollRef = React.createRef<HTMLTableSectionElement>();

  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={"Total Request"}>
        <div className={classes["root"]}>
          <div className={classes["header"]}>
            <div className={classes["title"]}>
              <h1>Total Request</h1>
            </div>
          </div>
          <div className={classes["content"]}>
            <div className={classes["filters-mobile"]}>
              <div className={classes["container-button"]}>
                <Button
                  text="FILTERS"
                  color="primary"
                  onClick={this.toggleMobileFilters}
                />
              </div>
              {this.state.showMobileFilters && this.renderFilters()}
            </div>
            <table className={classes["table"]} cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  <th className={classes["header-date"]}>DATE</th>
                  <th className={classes["header-node"]}>NODE</th>
                  <th className={classes["header-type-of-requests"]}>
                    TYPE OF REQUESTS
                  </th>
                  <th className={classes["header-status"]}>STATUS</th>
                </tr>
              </thead>
              <InfinitScrollVertical
                key={this.contentVersion}
                onNext={() => {}}
                triggerOnRestPixels={1}
                rootRef={TotalRequest.scrollRef}
              >
                {this.state.data?.data.map((metric: IMetric) => renderRow(metric))}
              </InfinitScrollVertical>
            </table>
            <div className={classes["filters-desktop"]}>
              {this.renderFilters()}
            </div>
          </div>
        </div>
      </DefaultTemplate>
    );
  }

  private submitFilters() {
    this.fetchData();
  }

  private async onDateChange(range: DateRange) {
    this.setState({
      from: range.from!,
      to: range.to!,
    });
  }

  private resetFilters() {
    this.setState({
      from: undefined,
      to: undefined,
      node: undefined,
      type: undefined,
      status: undefined,
    });
  }

  public override async componentDidMount(): Promise<void> {
    this.fetchData();
    this.getTypes();
  }

  private async fetchData(): Promise<void> {
    const data = await Metric.getInstance().getAll({
      projectUuid: this.props.uuid,
      from: this.state.from?.toISOString(),
      to: this.state.to?.toISOString(),
      node: (this.state.node as NodeType) ?? undefined,
      type: this.state.type,
      status: this.state.status,
    });
    this.setState({ data });
  }

  private async getTypes(): Promise<void> {
    const types = await Metric.getInstance().getPaths();
    this.setState({ types });
  }

  private toggleMobileFilters() {
    this.setState({ showMobileFilters: !this.state.showMobileFilters });
  }

  private renderFilters(): JSX.Element {
    return (
      <div className={classes["root-filters"]}>
        <div className={classes["filters-container"]}>
          <div className={classes["title"]}>FILTERS (4)</div>
          <div className={classes["filter-container"]}>
            <div className={classes["sub-title"]}>Date</div>
            <DateModalSelector
              value={{ from: this.state.from, to: this.state.to }}
              onChange={this.onDateChange}
            />
          </div>
          <div className={classes["filter-container"]}>
            <div className={classes["sub-title"]}>Select a node</div>
            <Selector
              defaultOption={this.state.node}
              options={[NODE_PLACEHOLDER, "Archive", "Rolling"]}
              selectCallback={(option) =>
                this.setState({
                  node: option !== NODE_PLACEHOLDER ? option : undefined,
                })
              }
            />
          </div>
          <div className={classes["filter-container"]}>
            <div className={classes["sub-title"]}>Type of requests</div>
            <Selector
              defaultOption={this.state.type}
              options={[TYPE_PLACEHOLDER, ...(this.state.types ?? [])]}
              selectCallback={(option) =>
                this.setState({
                  type: option !== TYPE_PLACEHOLDER ? option : undefined,
                })
              }
            />
          </div>
          <div className={classes["filter-container"]}>
            <div className={classes["sub-title"]}>Select a status</div>
            <div className={classes["status-filter-container"]}>
              <CompletedChip
                onClick={(option) => this.setState({ status: option })}
                clickable={true}
                active={this.state.status === RequestStatus.COMPLETED}
              />
              <BlacklistedChip
                onClick={(option) => this.setState({ status: option })}
                clickable={true}
                active={this.state.status === RequestStatus.BLACKLISTED}
              />

              <SuccessfulChip
                onClick={(option) => this.setState({ status: option })}
                clickable={true}
                active={this.state.status === RequestStatus.SUCCESSFUL}
              />
              <FailedChip
                onClick={(option) => this.setState({ status: option })}
                clickable={true}
                active={this.state.status === RequestStatus.FAILED}
              />
            </div>
          </div>
        </div>

        <div className={classes["divider"]} />

        <div className={classes["footer"]}>
          <Button
            text="CLEAR FILTERS"
            color="transparent"
            onClick={this.resetFilters}
          />
          <Button text="APPLY" color="primary" onClick={this.submitFilters} />
        </div>
      </div>
    );
  }
}

function renderRow(metric: IMetric) {
  return (
    <tr key={metric.uuid}>
      <td className={classes["date"]}>
        {format(new Date(metric.dateRequested), "yyyy-MM-dd - p")}
      </td>

      <td className={classes["node-type"]}>{metric.node}</td>

      <td className={classes["type-of-requests"]}>{metric.path}</td>
      <td className={classes["status"]}>
        {renderStatus(metric.status as RequestStatus)}
      </td>
    </tr>
  );
}

function renderStatus(status: RequestStatus) {
  switch (status) {
    case RequestStatus.COMPLETED:
      return <CompletedChip clickable={false} />;
    case RequestStatus.BLACKLISTED:
      return <BlacklistedChip clickable={false} />;
    case RequestStatus.SUCCESSFUL:
      return <SuccessfulChip clickable={false} />;
    case RequestStatus.FAILED:
      return <FailedChip clickable={false} />;
  }
}
