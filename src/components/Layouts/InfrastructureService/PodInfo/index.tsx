import Link from "next/link";
import React from "react";
import classes from "./classes.module.scss";

type IProps = {
  title: string;
  active: number | null;
  total: number | null;
  seeMoreLink: string | null;
};

export default class PodInfo extends React.Component<IProps> {
  public constructor(props: any) {
    super(props);
  }

  public override render(): JSX.Element {
    return (
      <div className={classes["root"]}>
        <div className={classes["header"]}>{this.props.title}</div>
        <div className={classes["content"]}>
          <div className={classes["content-header"]}>
            <h4>POD</h4>
            {this.props.seeMoreLink && (
              <div className={classes["link"]}>
                <Link href={this.props.seeMoreLink}>See more</Link>
              </div>
            )}
          </div>
          <div className={classes["pod-info"]}>
            <div className={classes["info-container"]}>
              <div className={classes["info-block"]} data-info={"active"}>
                <h1>{this.props.active ?? "..."}</h1>
                <div>ACTIVE</div>
              </div>
              <div className={classes["separator"]}></div>
              <div className={classes["info-block"]}>
                <h1>{this.props.total ?? "..."}</h1>
                <div>TOTAL</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
