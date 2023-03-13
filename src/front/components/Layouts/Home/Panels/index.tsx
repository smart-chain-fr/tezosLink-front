import Link from "next/link"
import classes from "./classes.module.scss"
import BooksIcon from "@Assets/icons/books.svg"
import ArrowBlackIcon from "@Assets/icons/arrow-black.svg"
import ArroWhiteIcon from "@Assets/icons/arrow-white.svg"
import SupportIcon from "@Assets/icons/support.svg"
import Image from "next/image"

export default function Panels() {
    return <div className={classes["root"]}>
    <Link href="/documentation">
      <div className={classes["panel1"]}>
        <Image className="logo" alt="books" src={BooksIcon} />
        <div>
          <h3>DOCUMENTATION</h3>
          <p>Learn how to use Tezos Link</p>
        </div>
        <Image className="arrow" alt="arrow" src={ArrowBlackIcon} />
      </div>
    </Link>
    <a href="mailto:beta@octo.com" target="_blank">
      <div className={classes["panel2"]}>
        <Image className="logo" alt="books" src={SupportIcon} />
        <div>
          <h3>SUPPORT</h3>
          <p>Ask us your questions</p>
        </div>
        <Image className="arrow" alt="arrow" src={ArroWhiteIcon} />
      </div>
    </a>
  </div>
}