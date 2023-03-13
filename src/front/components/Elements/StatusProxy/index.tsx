import classes from "./classes.module.scss"

type IProps = {
  proxyStatus: boolean,
  network: string,
  date: string
}

export default function StatusProxy(props: IProps) {
  return <div className={classes["StatusViewHeader"]}>
    {props.proxyStatus ? <div className={classes["StatusViewIndicatorGreen"]} /> : <div className={classes["StatusViewIndicatorRed"]} />}
    <div className={classes["StatusViewTitle"]}>Proxy service for {props.network} is {props.proxyStatus ? 'online' : 'offline'}.</div>
    <div className={classes["StatusViewSubtitle"]}>As of {props.date}.</div>
  </div>
}