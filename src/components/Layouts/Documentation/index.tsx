import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import classNames from "classnames";
import classes from "./classes.module.scss";

type IProps = {
  menu: string;
  content: string;
};

type IState = {
  menu: any;
  content: any;
};

export default class Documentation extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      menu: "",
      content: "",
    };
  }

  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={"Documentation"}>
        <div className={classes["root"]}>
          <div className={classNames(classes["left-side"], classes["menu"])}>
            <h2>Getting started</h2>
            <div dangerouslySetInnerHTML={{ __html: this.state.menu }} />
          </div>
          <div
            className={classNames(classes["right-side"], classes["content"])}
          >
            <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
          </div>
        </div>
      </DefaultTemplate>
    );
  }

  // async componentDidMount() {
  //     this.setState({
  //         menu : (await remark().use(remarkHtml).process(this.props.menu)).value,
  //         content: (await remark().use(remarkHtml).process(this.props.content)).value,
  //     })
  // }
}
