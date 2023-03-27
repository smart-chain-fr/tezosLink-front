import classes from "./classes.module.scss";
import React from "react";
import Card from "@Components/Elements/Card";
import { IResponseCountRequests } from "@/api/Metric";

type IProps = {
  count: IResponseCountRequests | null;
};

type IState = {};

export default class CountRequests extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
    this.renderContent = this.renderContent.bind(this);
  }

  public override render() {
    return (
      <div className={classes["root"]}>
        <Card
          title="Total Requests"
          content={<this.renderContent />}
          data={this.props.count !== null}
        />
      </div>
    );
  }

  private renderContent(): JSX.Element {
    return (
      <div className={classes["content"]}>
        <h1>{this.props.count?.count}</h1>
      </div>
    );
  }

}
