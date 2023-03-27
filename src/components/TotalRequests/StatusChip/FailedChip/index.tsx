import { RequestStatus } from "@/api/Metric";
import React from "react";
import classes from "./classes.module.scss";

type IProps = {
  clickable?: boolean;
  onClick?: (option: RequestStatus) => void;
  active?: boolean;

};

type IState = {
 
};

export default class FailedChip extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: this.props.clickable ? false : true,
    };

    this.onClick = this.onClick.bind(this);
  }

  override render(): React.ReactNode {
    return (
      <div
        className={classes["root"]}
        data-active={this.props.clickable ? this.props.active : true}

        data-clickable={this.props.clickable}
        onClick={this.onClick}
      >
        <div className={classes["content"]}>Failed</div>
      </div>
    );
  }

  private onClick() {
    if (this.props.clickable && this.props.onClick) {
      this.props.onClick(RequestStatus.FAILED);
    }
  }
}
