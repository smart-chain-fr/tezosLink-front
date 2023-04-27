import classes from "./classes.module.scss";
import React from "react";
import Card from "@Components/Elements/Card";
import Email from "@Assets/icons/email.svg";
import InputField from "@/components/Elements/InputField";
import { Button } from "@/components/Elements/Button";

type IProps = {};

type IState = {
  name: string;
  inputStatus: "neutral" | "success" | "error";
  errorMsg: string;
};

export default class Newsletter extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: "",
      inputStatus: "neutral",
      errorMsg: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.checkName = this.checkName.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  public override render() {
    return (
      <div className={classes["root"]}>
        <Card title="Get my metrics every week" content={<this.renderContent />} data={true} />
      </div>
    );
  }

  private renderContent(): JSX.Element {
    return (
      <div className={classes["content"]}>
        <div className={classes["input-container"]}>
          <InputField
            inputStatus={this.state.inputStatus}
            errorMsg={this.state.errorMsg}
            onChange={this.handleChangeInput}
            onBlur={this.handleBlur}
            type="text"
            icon={Email}
            name="email"
            placeholder="Your email address"
          />
        </div>
        <div className={classes["button-container"]}>
          <Button text="Register" onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }

  private handleBlur() {
    this.checkName(this.state.name);
  }

  private handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: event.target.value });
    if (this.state.inputStatus !== "neutral") {
      this.checkName(event.target.value);
    }
  }

  private async handleSubmit(): Promise<void> {}

  private checkName(name: string): boolean {
    if (name === "") {
      this.setState({
        errorMsg: "Project ID is required",
        inputStatus: "error",
      });
    } else if (name.length < 3) {
      this.setState({
        errorMsg: "Must have at least 3 characters",
        inputStatus: "error",
      });
    } else {
      this.setState({ errorMsg: "", inputStatus: "success" });
      return true;
    }
    return false;
  }
}
