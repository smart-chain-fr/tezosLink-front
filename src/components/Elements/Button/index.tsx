import React from "react";
import { useState } from "react";
import classNames from "classnames";
import classes from "./classes.module.scss";
import Image from "next/image";
const PRIMARY = "primary";
export type ButtonColors = "primary" | "secondary" | "transparent";

type IProps = {
  text: string;
  icon?: string;
  color: ButtonColors;
  onClick?: () => void;
};

export function Button(props: IProps) {
  const [clicked, setClicked] = useState(false);
  const clickCallback = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
  };
  let buttonClasses: string = clicked ? "clicked" : "";

  return (
    <div
      className={classNames(
        classes["root"],
        classes[props.color],
        classes[buttonClasses]
      )}
      onClick={() => {
        clickCallback();
        props.onClick && props.onClick();
      }}
    >
      <div className={classes["text"]}>{props.text}</div>
      {props.icon && (
        <Image
          className={classNames(classes["icon"], classes[props.color])}
          src={props.icon}
          alt="icon"
        />
      )}
    </div>
  );
}

Button.defaultProps = {
  icon: undefined,
  color: PRIMARY,
};
