import Link from "next/link";
import Image from "next/image";
import classNames from "classnames"
import TorusCable from "@Assets/images/torus-cables.svg";
import TorusBg from "@Assets/images/torus-bg.svg";
import TorusFg from "@Assets/images/torus-fg.svg";
import Meteor from "@Assets/images/particle.svg"
import TorusLogo from "@Assets/images/torus-logo.svg";
import PlusCardIcon from "@Assets/icons/plus-card.svg"
import classes from "./classes.module.scss"
import { Button } from "@Components/Elements/Button"

export default function Head() {
    return <div className={classes["root"]}>
    <div className={classes["left-panel"]}>
      <div className={classes["left-content"]}>
        <h1>Your gateway to the tezos network</h1>
        <h3>Free and scalable API access to the Tezos network<br/>and usage analytics for your projects</h3>
        <div className={classes["button"]}>
          <Link href="/new-project">
            <Button text="NEW PROJECT" icon={PlusCardIcon} />
          </Link>
        </div>
      </div>
    </div>
    <div className={classes["right-panel"]}>
      <Image alt="torus" className={classes["torus-cables"]} src={TorusCable} />
      <Image alt="torus" className={classes["torus-bg"]} src={TorusBg} />
      <Image alt="meteor" className={classNames(classes["meteor"], classes["meteor1"])} src={Meteor} />
      <Image alt="meteor" className={classNames(classes["meteor"], classes["meteor2"])} src={Meteor} />
      <Image alt="meteor" className={classNames(classes["meteor"], classes["meteor3"])} src={Meteor} />
      <Image alt="meteor" className={classNames(classes["meteor"], classes["meteor4"])} src={Meteor} />
      <Image alt="torus" className={classes["torus-fg"]} src={TorusFg} />
      <Image alt="torus" className={classes["torus-logo"]} src={TorusLogo} />
    </div>
  </div>
}