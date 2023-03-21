import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import classes from "./classes.module.scss";

type IState = {};

type IProps = {};

export default class InfrastructureService extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={"World map"}>
        <div className={classes["root"]}>
          <div className={classes["header"]}>
            <div className={classes["title"]}>
              <h1>World map</h1>
            </div>
          </div>
          <div className={classes["content"]}></div>
        </div>
      </DefaultTemplate>
    );
  }
}
