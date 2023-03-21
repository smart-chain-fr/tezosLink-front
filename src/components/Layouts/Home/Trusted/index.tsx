import classes from "./classes.module.scss";
import { Button } from "@Components/Elements/Button";
import Accenture from "@Assets/images/accenture.svg";
import Nomadic from "@Assets/images/nomadic.svg";
import PlusCardIcon from "@Assets/icons/plus-card.svg";
import tq from "@Assets/images/tq.svg";
import Image from "next/image";

export default function Trusted() {
  return (
    <div className={classes["root"]}>
      <h1>Trusted by hundreds of developers</h1>
      <h3>
        Used worldwide by dozens of production applications without having to
        install or manage a single node.
      </h3>
      <div className={classes["grid"]}>
        <Image alt="accenture" src={Accenture} />
        <Image alt="nomadic" src={Nomadic} />
        <Image alt="tq" src={tq} />
      </div>
      <div className={classes["button"]}>
        <a href="mailto:beta@octo.com" target="_blank">
          <Button text="CONTACT US FOR ENTERPRISE INFOS" icon={PlusCardIcon} />
        </a>
      </div>
    </div>
  );
}
