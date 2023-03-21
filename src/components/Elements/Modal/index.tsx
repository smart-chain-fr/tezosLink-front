import classes from "./classes.module.scss"

type IProps = {
    title: string,
    children: JSX.Element,
}

export default function Modal(props: IProps) {
    return (<>
        <div className={classes["overlay"]} />
        <div className={classes["root"]}>
            <div className={classes["title"]} id={'modal-title'}><h2>{props.title}</h2></div>
            {props.children}
        </div>
    </>
    )
}