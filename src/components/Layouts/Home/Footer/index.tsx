import React from "react";
import classes from "./classes.module.scss";
import Logo from "@Assets/images/logo.svg";
import Image from "next/image";

type IProps = {};
type IState = {};

export default class Footer extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
  }

  public override render(): JSX.Element {
    return (
      <div className={classes["root"]}>
        <div className={classes["grid"]}>
          <Image alt="logo" src={Logo} />
          <div>
            <p>About Tezos Link</p>
            <a
              href="https://github.com/octo-technology/tezos-link"
              target="_blank"
            >
              Github
            </a>
            <a href="mailto:beta@octo.com" target="_blank">
              Support
            </a>
            <a href="https://www.reddit.com/r/tezos/" target="_blank">
              Reddit
            </a>
          </div>
          <div>
            <p>About OCTO</p>
            <a href="https://octo.com" target="_blank">
              Homepage
            </a>
            <a href="https://blog.octo.com" target="_blank">
              Our blog
            </a>
          </div>
          <div>
            <p>About the devs</p>
            <a
              href="https://www.linkedin.com/in/aymeric-bethencourt-96665046/"
              target="_blank"
            >
              Aymeric Bethencourt
            </a>
            <a
              href="https://fr.linkedin.com/in/ismail-bennis-b0a0b022/"
              target="_blank"
            >
             Ismail Bennis
            </a>
            <a
              href="https://fr.linkedin.com/in/frederic-eang"
              target="_blank"
            >
              Frederic Eang
            </a>
            <a
              href="https://www.linkedin.com/in/kevin-tan-8aaa49102/"
              target="_blank"
            >
              Kevin Tan
            </a>
          </div>
        </div>
      </div>
    );
  }
}
