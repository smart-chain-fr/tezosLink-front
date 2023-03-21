import classes from "./classes.module.scss"

type IProps = {
  nodeArchiveStatus: boolean,
  nodeRollingStatus: boolean,
  network: string,
}

export default function StatusNode(props: IProps) {
  return <div className={classes["StatusViewHeader"]}>
  {(props.nodeArchiveStatus && props.nodeRollingStatus) ? <div className={classes["StatusViewIndicatorGreen"]} /> : <div className={classes["StatusViewIndicatorRed"]} />}
    <div className={classes["StatusViewTitle"]}>Nodes RPC services for {props.network} are {(props.nodeArchiveStatus && props.nodeRollingStatus) ? 'online' : 'offline'}.</div>
    <div className={classes["StatusViewSubtitle"]}>{props.nodeArchiveStatus ? <div className={classes["StatusViewIndicatorGreenLittle"]} /> : <div className={classes["StatusViewIndicatorRedLittle"]} />} Archive nodes are {props.nodeArchiveStatus ? 'online' : 'offline'}.</div>
    <div className={classes["StatusViewSubtitle"]}>{props.nodeRollingStatus ? <div className={classes["StatusViewIndicatorGreenLittle"]} /> : <div className={classes["StatusViewIndicatorRedLittle"]} />} Rolling nodes are {props.nodeRollingStatus ? 'online' : 'offline'}.</div>
  </div>
}