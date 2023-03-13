import classes from "./classes.module.scss"
import Metric from "@Assets/images/metrics.png"
import Image from "next/image"

export default function Metrics() {
  return <div className={classes["root"]}>
    <h1>Insights from your app</h1>
    <h3>The Tezos Link dashboard allows you to get valuable statistics from your utilization of the APIs</h3>
    <Image alt="metrics" src={Metric} width={1139} />
  </div>
}