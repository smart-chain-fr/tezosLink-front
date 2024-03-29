import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import classes from "./classes.module.scss";
import { NextRouter, withRouter } from "next/router";

import icon from "@Assets/icons/user.svg";
import InputField from "../../Elements/InputField";
import { Button } from "@Components/Elements/Button";
import SignUpIcon from "@Assets/icons/sign-up.svg";
import Project from "@/api/Project";
import Selector from "@/components/Elements/Selector";

type IState = {
  network: string;
  name: string;
  inputStatus: "neutral" | "success" | "error";
  errorMsg: string;
};

interface WithRouterProps {
  router: NextRouter;
}

export interface IProps extends WithRouterProps {}

class NewProject extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      network: "MAINNET",
      name: "",
      inputStatus: "neutral",
      errorMsg: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.checkName = this.checkName.bind(this);
    this.handleChangeSelector = this.handleChangeSelector.bind(this);
  }

  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={"Create Project"}>
        <div className={classes["root"]}>
          <h1>New Project</h1>
          <div>
            <Selector
              options={[
                {
                  value: "MAINNET",
                  label: "MAINNET",
                },
                {
                  value: "TESTNET",
                  label: "TESTNET",
                },
              ]}
              value={this.state.network}
              selectCallback={this.handleChangeSelector}
            />
            <InputField
              inputStatus={this.state.inputStatus}
              errorMsg={this.state.errorMsg}
              onChange={this.handleChangeInput}
              onBlur={this.handleBlur}
              type="text"
              icon={icon}
              name="title"
              placeholder="Project title"
            />
            <Button
              text="Create project"
              icon={SignUpIcon}
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </DefaultTemplate>
    );
  }
  private handleChangeSelector(
    option?: { value?: string; label: string }
  ) {
    if (option !== undefined) this.setState({ network: option.value! });
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

  private async handleSubmit(): Promise<void> {
    try {
      if (this.checkName(this.state.name)) {
        const uuid: string = (
          await Project.getInstance().postProject({
            title: this.state.name,
            network: this.state.network,
          })
        ).uuid;
        this.props.router.push("/dashboard/" + uuid);
      }
    } catch (err) {
      console.error(err);
    }
  }

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
export default withRouter(NewProject);
