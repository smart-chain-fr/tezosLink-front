import Link from "next/link";
import classes from "./classes.module.scss";
import TokenCopy from "../TokenCopy";
import React from "react";
import Card from "@/components/Elements/Card";

type IProps = {
  token: string;
};

type IState = {
  componentMount: boolean;
};

export default class ProjectToken extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      componentMount: false,
    };

    this.renderContent = this.renderContent.bind(this);
  }
  public override render() {
    return (
      <div className={classes["root"]}>
        <Card
          title="Private Token"
          content={<this.renderContent />}
          data={this.props.token !== null}
        />
      </div>
    );
  }

  private renderContent(): JSX.Element {
    return (
      <div className={classes["container"]}>
          {this.state.componentMount === true && (
            <div className={classes["root"]}>
              <TokenCopy token={this.props.token} />
              <p>
                Make sure to <b>save this token</b>, it is both your{" "}
                <b>access to this dashboard</b> and the <b>API key</b> to
                interact with the proxy.
              </p>
              <p>
                You can find information about how to use our gateway here :{" "}
                <Link href={"/documentation"}>documentation</Link>.
              </p>
            </div>
          )}
        </div>
    );
  }

  override componentDidMount(): void {
    // to avoid hydration error with ssr
    this.setState({ componentMount: true });
  }
}
