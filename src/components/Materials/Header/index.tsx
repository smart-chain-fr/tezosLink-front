import Link from "next/link";
import React from "react";
import Image from "next/image";
import TezosLinkLogo from "@Assets/link_logo.svg";
import Logo from "@Assets/logo.svg";
import classes from "./classes.module.scss";
import { Button } from "@Components/Elements/Button";
import Burger from "@Components/Elements/Burger";
import Drawer from "@Components/Elements/Drawer";
import LoginIcon from "@Assets/icons/login.svg";
import PlusCardIcon from "@Assets/icons/plus-card.svg";

type IProps = {};
type IState = {
  status: boolean;
};

export default class Header extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      status: false,
    };

    this.switchStatus = this.switchStatus.bind(this);
  }

  public override render(): JSX.Element {
    return (
      <>
        <Drawer status={this.state.status} hideCallback={this.switchStatus} />
        <div className={classes["root"]}>
          <Burger state={this.state.status} callback={this.switchStatus} />
          <div className={classes["menu"]}>
            <Link href="/">
              <Image alt="TEZOS LINK" src={TezosLinkLogo} />
            </Link>
          </div>
          <div className={classes["triangle-under-logo"]}></div>
          <div className={classes["logo"]}>
            <Link href="/">
              <Image alt="entire stack" src={Logo} />
            </Link>
          </div>
          <div className={classes["button"]}>
            <Link href="/show-project">
              <Button color="transparent" text="MY PROJECT" icon={LoginIcon} />
            </Link>
            <Link href="/new-project">
              <Button text="CREATE" icon={PlusCardIcon} />
            </Link>
          </div>
        </div>
      </>
    );
  }

  private switchStatus() {
    this.state.status
      ? this.setState({ status: false })
      : this.setState({ status: true });
  }
}
