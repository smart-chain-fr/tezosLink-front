import { Button } from "@Components/Elements/Button";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import IslandIcon from "@Assets/icons/island.svg";
import Image from "next/image";
import CardsIcon from "@Assets/icons/cards.svg";
import Link from "next/link";
import classes from "./classes.module.scss";

export default class PodNotFound extends BasePage {
  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={"Project Not Found"}>
        <div className={classes["root"]}>
          <Image alt="Unplugged" height="50" src={IslandIcon} /> Oops
          <div className={classes["text"]}>Unknown Pod...</div>
          <div className={classes["home-button"]}>
            <Link href="/infrastructure-service">
              <Button text="Go to Infrastructure Service" icon={CardsIcon} />
            </Link>
          </div>
        </div>
      </DefaultTemplate>
    );
  }
}
