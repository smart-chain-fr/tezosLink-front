import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import classes from "./classes.module.scss";
import PodInfo from "./PodInfo";

type IState = {};

type IProps = {};

export default class InfrastructureService extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={"Infrastructure Service"}>
        <div className={classes["root"]}>
          <div className={classes["header"]}>
            <div className={classes["title"]}>
              <h1>Infrastructure Service</h1>
            </div>
          </div>
          <div className={classes["content"]}>
            <PodInfo
              title={"Proxy"}
              active={1}
              total={1}
              seeMoreLink={"/test"}
            />
            <PodInfo
              title={"Proxy"}
              active={1}
              total={1}
              seeMoreLink={"/test"}
            />
            <PodInfo
              title={"Proxy"}
              active={1}
              total={1}
              seeMoreLink={"/test"}
            />
            <PodInfo
              title={"Proxy"}
              active={1}
              total={1}
              seeMoreLink={"/test"}
            />
             <PodInfo
              title={"Proxy"}
              active={1}
              total={1}
              seeMoreLink={"/test"}
            />
             <PodInfo
              title={"Proxy"}
              active={1}
              total={1}
              seeMoreLink={"/test"}
            />
          </div>
        </div>
      </DefaultTemplate>
    );
  }
}
