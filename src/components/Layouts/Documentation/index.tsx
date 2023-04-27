import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import classNames from "classnames";
import React from "react";
import classes from "./classes.module.scss";
import ReactMarkdown from "react-markdown"

type IProps = {
  menu: string;
  content: string;
};

type IState = {};

// function flatten(text: string, child: any): boolean {
//   return typeof child === 'string' ? text + child : React.Children.toArray(child.props.children).reduce(flatten, text)
// }
// function HeadingRenderer(props: any) {
//   const children = React.Children.toArray(props.children)
//   const text = children.reduce(flatten, '')
//   const slug = text.toLowerCase().replace(/\W/g, '-')
//   return React.createElement('h' + props.level, { id: slug }, props.children)
// }

export default class Documentation extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
  }

  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={"Documentation"}>
        <div className={classes["root"]}>
          <div className={classNames(classes["left-side"], classes["menu"])}>
            <h2>Getting started</h2>
            <ReactMarkdown className={'markdown'} >{this.props.menu}</ReactMarkdown>
          </div>
          <div
            className={classNames(classes["right-side"], classes["content"])}
          >
            <ReactMarkdown className={'markdown'} >{this.props.content}</ReactMarkdown>
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
