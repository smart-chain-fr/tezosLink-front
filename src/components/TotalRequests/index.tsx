import Metric, {
  IResponseRequests,
  NodeType,
  RequestStatus
} from "@/api/Metric";
import TypeOfRequest from "@/api/TypeOfRequests";

import { IMetric, ITypeOfRequest } from "@/interfaces/interfaces";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import { format } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";
import { Button } from "../Elements/Button";
import DateModalSelector from "../Elements/DateModalSelector";
import { IPendingScroll } from "../Elements/InfinitScroll";
import InfinitScrollVertical from "../Elements/InfinitScroll/Vertical";
import Selector from "../Elements/Selector";
import classes from "./classes.module.scss";
import BlacklistedChip from "./StatusChip/BlacklistedChip";
import CompletedChip from "./StatusChip/CompletedChip";
import FailedChip from "./StatusChip/FailedChip";
import SuccessfulChip from "./StatusChip/SuccessfulChip";

type IState = {
  data: IResponseRequests;
  from?: Date;
  to?: Date;
  node?: string;
  type?: string;
  status?: RequestStatus;
  types: ITypeOfRequest[];
  showMobileFilters: boolean;
  hasMoreDataToLoad: boolean;
};

export type IProps = {
  uuid: string;
};

const NODE_PLACEHOLDER = "Select a node";
const TYPE_PLACEHOLDER = "Select a type";

const emptyData = {
  data: [],
  metadata: {
    total: 0,
    count: 0,
    page: 0,
    _limit: 0,
  },
};
export default class TotalRequest extends BasePage<IProps, IState> {
  private _timer: NodeJS.Timeout | undefined = undefined;
  private static PAGE_SIZE = 5;
  private contentVersion = 0;

  public constructor(props: IProps) {
    super(props);
    this.state = {
      data: emptyData,
      showMobileFilters: false,
      hasMoreDataToLoad: true,
      types: [],
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.submitFilters = this.submitFilters.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.renderFilters = this.renderFilters.bind(this);
    this.toggleMobileFilters = this.toggleMobileFilters.bind(this);
    this.fetchDataOnScroll = this.fetchDataOnScroll.bind(this);
  }

  private scrollRef = React.createRef<HTMLTableElement>();

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

            <InfinitScrollVertical
              key={this.contentVersion}
              onNext={this.fetchDataOnScroll}
              triggerOnRestPixels={1}
              rootRef={this.scrollRef}
              className={classes["table"]}
              cellSpacing="0"
              cellPadding="0"
              selfScroll
            >
              <thead>
                <tr>
                  <th className={classes["date"]}>DATE</th>
                  <th className={classes["node-type"]}>NODE</th>
                  <th className={classes["type-of-requests"]}>
                    TYPE OF REQUESTS
                  </th>
                  <th className={classes["status"]}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data?.data.map((metric: IMetric) =>
                  renderRow(metric)
                )}
              </tbody>
            </InfinitScrollVertical>
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

  private async onDateChange(range?: DateRange) {
    const formattedRange = range ?? { from: undefined, to: undefined };
    this.setState(formattedRange);
  }

  private resetFilters() {
    this.setState({
      from: undefined,
      to: undefined,
      node: undefined,
      type: undefined,
      status: undefined,
    });
    this.fetchData();
  }

  public override async componentDidMount(): Promise<void> {
    if (this.scrollRef.current)
      this.scrollRef.current.style.maxHeight =
        Math.max(window.innerHeight - 200, 550) + "px";
    this.getTypes();
  }

  private async fetchData(): Promise<void> {
    const data = await Metric.getInstance().getAll({
      projectUuid: this.props.uuid,
      from: this.state.from?.toISOString(),
      to: this.state.to?.toISOString(),
      node: (this.state.node?.toLowerCase() as NodeType) ?? undefined,
      type: this.state.type,
      status: this.state.status,
      _limit: TotalRequest.PAGE_SIZE,
      _page: 1,
    });
    this.setState({
      data,
      hasMoreDataToLoad: data.data.length < data.metadata.total,
    });
  }

  private async getTypes(): Promise<void> {
    const types = await TypeOfRequest.getInstance().getTypeOfRequests();
    this.setState({ types });
  }

  private toggleMobileFilters() {
    this.setState({ showMobileFilters: !this.state.showMobileFilters });
  }

  private renderFilters(): JSX.Element {
    return (
      <div className={classes["root-filters"]}>
        <div className={classes["filters-container"]}>
          <div className={classes["title"]}>FILTERS</div>
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
              value={this.state.node}
              options={[
                { label: NODE_PLACEHOLDER, value: undefined },
                { label: "Archive", value: "archive" },
                { label: "Rolling", value: "rolling" },
              ]}
              selectCallback={(option) =>
                this.setState({
                  node: option?.value,
                })
              }
            />
          </div>
          <div className={classes["filter-container"]}>
            <div className={classes["sub-title"]}>Type of requests</div>
            <Selector
              value={this.state.type}
              options={[
                { label: TYPE_PLACEHOLDER, value: undefined },
                ...this.state.types.map((type) => ({
                  label: type.path,
                  value: type.uuid,
                })),
              ]}
              selectCallback={(option) =>
                this.setState({
                  type: option?.value,
                })
              }
            />
          </div>
          <div className={classes["filter-container"]}>
            <div className={classes["sub-title"]}>Select a status</div>
            <div className={classes["status-filter-container"]}>
              {/* <CompletedChip
                onClick={(option) => this.setState({ status: this.state.status !== option ? option : undefined})}
                clickable={true}
                active={this.state.status === RequestStatus.COMPLETED}
              /> */}
              <BlacklistedChip
                onClick={(option) =>
                  this.setState({
                    status: this.state.status !== option ? option : undefined,
                  })
                }
                clickable={true}
                active={this.state.status === RequestStatus.BLACKLISTED}
              />

              <SuccessfulChip
                onClick={(option) =>
                  this.setState({
                    status: this.state.status !== option ? option : undefined,
                  })
                }
                clickable={true}
                active={this.state.status === RequestStatus.SUCCESSFUL}
              />
              <FailedChip
                onClick={(option) =>
                  this.setState({
                    status: this.state.status !== option ? option : undefined,
                  })
                }
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

  private async fetchDataOnScroll(
    pendingScroll?: IPendingScroll
  ): Promise<void> {
    this._timer = setTimeout(async () => {
      clearTimeout(this._timer);
      if (!this.state.hasMoreDataToLoad) {
        pendingScroll?.reject();
        return;
      }
      const paginatedResult = await Metric.getInstance().getAll({
        projectUuid: this.props.uuid,
        from: this.state.from?.toISOString(),
        to: this.state.to?.toISOString(),
        node: (this.state.node?.toLowerCase() as NodeType) ?? undefined,
        type: this.state.type,
        status: this.state.status,
        _limit: TotalRequest.PAGE_SIZE,
        _page: this.state.data.metadata.page + 1,
      });

      paginatedResult.data = [...this.state.data.data, ...paginatedResult.data];

      this.setState(
        {
          data: paginatedResult,
          hasMoreDataToLoad:
            paginatedResult.data.length < paginatedResult.metadata.total,
        },
        () => {
          pendingScroll?.resolve();
        }
      );
    }, 300);
  }
}

function renderRow(metric: IMetric) {
  return (
    <tr key={metric.uuid}>
      <td className={classes["date"]}>
        {format(new Date(metric.dateRequested), "yyyy-MM-dd - p")}
      </td>

      <td className={classes["node-type"]}>{metric.node}</td>

      <td className={classes["type-of-requests"]}>
        {metric.typeOfRequest.path.length > 30
          ? metric.typeOfRequest.path.slice(0, 30) + "..."
          : metric.typeOfRequest.path}
      </td>
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
