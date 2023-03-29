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
              href="https://github.com/smart-chain-fr/tezosLink"
              target="_blank"
            >
              Github
            </a>
            <a href="https://www.reddit.com/r/tezos/" target="_blank">
              Reddit
            </a>
          </div>
          <div>
            <p>About Smart-\chain</p>
            <a href="https://www.smart-chain.fr/" target="_blank">
              Homepage
            </a>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    );
  }
}
