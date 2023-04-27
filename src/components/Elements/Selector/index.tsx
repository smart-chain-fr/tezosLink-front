import React from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

type IProps = {
  options: { label: string; value?: string }[];
  value?: string;
  selectCallback: (option?: { label: string; value?: string }) => void;
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
      ? this.props.options.findIndex(
          (option) => option.value === this.props.value
        )
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
            {this.props.options.map((option, key: number) => (
              <option key={key}>{option.label}</option>
            ))}
          </select>
          <div className={classes["selector"]}>
            <em></em>

            <ul
              style={{
                transform: `translateY(-${(selectedIndex ?? 0) * 36}px)`,
              }}
            >
              {this.props.options.map((option, i) => (
                <li key={i}>{option.label}</li>
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
              <li key={i} onClick={() => this.handleSelect(i)}>
                {option.label}
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
