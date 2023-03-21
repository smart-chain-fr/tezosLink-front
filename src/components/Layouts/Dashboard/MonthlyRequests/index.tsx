import classes from "./classes.module.scss";
import React from "react";
import Card from "@Components/Elements/Card";

type IProps = {
  monthlyRequests: number | null;
};

type IState = {};

export default class MonthlyRequests extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
    this.renderContent = this.renderContent.bind(this);
  }

  public override render() {
    return (
      <div className={classes["root"]}>
        <Card
          title="Monthly Requests"
          content={<this.renderContent />}
          data={this.props.monthlyRequests !== null}
        />
      </div>
    );
  }

  private renderContent(): JSX.Element {
    return (
      <div className={classes["content"]}>
        <h1>{this.props.monthlyRequests}</h1>
      </div>
    );
  }

}
