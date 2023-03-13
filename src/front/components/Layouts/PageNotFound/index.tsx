import { Button } from "@Components/Elements/Button";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate"
import UnpluggedIcon from "@Assets/icons/unplugged.svg"
import Image from "next/image";
import CardsIcon from "@Assets/icons/cards.svg"
import Link from "next/link";
import classes from "./classes.module.scss";

export default class PageNotFound extends BasePage {
    public override render(): JSX.Element {
        return (
            <DefaultTemplate title={"Project Not Found"}>
                <div className={classes["root"]}>
                    <Image alt="Unplugged" height="50" src={UnpluggedIcon} /> Oops
                    <div className={classes["text"]}>There isn't anything here...</div>
                    <div className={classes["home-button"]}>
                        <Link href="/">
                            <Button text="Go to Home" icon={CardsIcon} />
                        </Link>
                    </div>
                </div>
            </DefaultTemplate>
        );
    }
}
