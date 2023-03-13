import classes from "./classes.module.scss"
import classNames from "classnames"
import Image, { StaticImageData } from "next/image";

type Side = 'right' | 'left';

type IProps = {
  title: string,
  description: JSX.Element | string,
  image_src: StaticImageData,
  image_alt: string,
  side: Side
}

export default function BuiltArg(props: IProps) {
  return <div className={classNames(classes["root"], props.side === 'left' ? classes["reverse"] : '')}>
    <Image className={classes["img"]} alt={props.image_alt} src={props.image_src} />
    <div>
      <div className={classes["title"]}>{props.title}</div>
      <div className={classes["description"]}>{props.description}</div>
    </div>
  </div>
}