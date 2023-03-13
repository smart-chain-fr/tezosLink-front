import Link from "next/link"
import classes from "./classes.module.scss"
import MiniTorusIcon from "@Assets/images/mini-torus.png"
import { Button } from "@Components/Elements/Button"
import PlusCardIcon from "@Assets/icons/plus-card.svg"
import Image from "next/image"

export default function GetStarted() {
    return <div className={classes["root"]}>
        <h1>Connect to TEZOS now</h1>
        <div className={classes["button"]}>
            <Link href="/new-project">
                <Button text="GET STARTED" icon={PlusCardIcon} />
            </Link>
        </div>
        <Image className={classes["left"]} alt="torus" src={MiniTorusIcon} height={300}/>
        <Image className={classes["right"]} alt="torus" src={MiniTorusIcon} height={300} />
    </div>
}