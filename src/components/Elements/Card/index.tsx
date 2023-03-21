import classes from "./classes.module.scss"

type IProps = {
    title: string,
    content: JSX.Element,
    data: boolean
}

export default function Card(props: IProps): JSX.Element {
    return <div className={classes["root"]}>
        <div className={classes["title"]}>{props.title}</div>
            {props.data ?
            props.content :
            <div className={classes["no-data"]}>No data</div>}
    </div>
}