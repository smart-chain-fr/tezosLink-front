import classes from "./classes.module.scss";
import React from "react";
import Card from "@Components/Elements/Card";
import Link from "next/link";
import { IMetric } from "@/interfaces/interfaces";
import { IResponseRequests } from "@/api/Metric";

type IProps = {
  lastRequests: IResponseRequests | null;
  projectUuid: string;
};

export default class LastRequests extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
  }

  public override render() {
    return (
      <div className={classes["root"]}>
        <Card
          title="Last Requests"
          content={<this.renderContent />}
          data={this.props.lastRequests !== null}
        />
      </div>
    );
  }

  private showRequests(request: IMetric) {
    const stringLength = 60;
    if (request.path.length > stringLength) {
      return request.path.substring(0, stringLength) + "...";
    }
    return request.path;
  }

  private renderContent(): JSX.Element {
    return (
      <div className={classes["content"]}>
        <div className={classes["list"]}>
          {(this.props.lastRequests ?? [])
            .slice(0, 5)
            .map((request: IMetric, index: number) => {
              return (
                <div className={classes["item"]} key={index}>
                  {this.showRequests(request)}
                </div>
              );
            })}
        </div>
        <div className={classes["link"]}>
          <Link href={`/dashboard/${this.props.projectUuid}/total-requests`}>
            See more
          </Link>
        </div>
      </div>
    );
  }
}
