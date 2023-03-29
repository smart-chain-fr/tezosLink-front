import React from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

type IProps = {
  options: string[];
  value?: string;
  selectCallback: (option: string | undefined) => void;
};
type IState = {
  open: string;
};

export default class Selector extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      open: "close",
    };
    this.handleClick = this.handleClick.bind(this);
  }
  public override render(): JSX.Element {
    const selectedIndex = this.props.value
      ? this.props.options.indexOf(this.props.value)
      : undefined;
    return (
      <>
        {this.state.open == "open" && (
          <div className={classes["overlay"]} onClick={this.handleClick} />
        )}
        <div
          className={classNames(classes["root"], classes[this.state.open])}
          onClick={this.handleClick}
        >
          <select data-menu defaultValue={selectedIndex}>
            {this.props.options.map((option: string, key: number) => (
              <option key={key}>{option}</option>
            ))}
          </select>
          <div className={classes["selector"]}>
            <em></em>

            <ul
              style={{
                transform: `translateY(-${(selectedIndex ?? 0) * 36}px)`,
              }}
            >
              {this.props.options.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          </div>
          <ul
            style={{
              zIndex: 1,
              transform: `translateY(-${(selectedIndex ?? 0) * 36}px)`,
            }}
          >
            {this.props.options.map((option, i) => (
              <li key={option} onClick={() => this.handleSelect(i)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }


  private handleClick() {
    this.state.open === "open"
      ? this.setState({ open: "close" })
      : this.setState({ open: "open" });
  }

  private handleSelect(index: number) {
    this.props.selectCallback(this.props.options[index]);
  }
}
