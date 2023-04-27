import classes from "./classes.module.scss"
import BuiltArg from "../BuiltArg";
import BuiltForDev from "@Assets/images/arg1.svg"
import BuiltForEase from "@Assets/images/arg2.svg"
import BuiltForBuilders from "@Assets/images/arg3.svg"
import Scalable from "@Assets/images/architecture.png"
import { StaticImageData } from "next/image";

type Side = 'right' | 'left';

type IProps = {
  title: string,
  description: JSX.Element | string,
  image_src: StaticImageData,
  image_alt: string,
  side: Side
}

export default function Built() {
  const args: IProps[] = [
    {
      title: "BUILT FOR DEVELOPERS",
      description: "Connect your app immediately with our instant access APIs. We support RPC over HTTPS interfaces, providing high speed connections to the Tezos network.",
      image_src: BuiltForDev,
      image_alt: "tezos",
      side: "left"
    },
    {
      title: "BUILT FOR EASE",
      description: "Start using Tezos Link with a single URL. Our 24/7 team of experts is ready to handle all network changes and upgrades so you can focus on building your applications.",
      image_src: BuiltForEase,
      image_alt: "tezos",
      side: "right"
    },
    {
      title: "BUILT FOR BUILDERS",
      description: "We believe in a future powered by decentralized networks and protocols. We provide world-class infrastructure for developers so you can spend your time building and creating.",
      image_src: BuiltForBuilders,
      image_alt: "tezos",
      side: "left"
    },
    {
      title: "SCALABLE",
      description: <p>Our architecture supports the workload required by your project, by scaling up Tezos nodes when we see an increase of requests. The infrastructure is open-sourced in our<a href="https://github.com/smart-chain-fr/tezosLink" target="_blank"> Github project</a></p>,
      image_src: Scalable,
      image_alt: "tezos",
      side: "right"
    },
  ];

  return <div className={classes["root"]}>
    <div className={classes["content"]}>
      <h1>Develop now with our Tezos APIs</h1>
      <h3>
        Tezos Link's infrastructure will ensure your decentralized application scales to meet your user demand.
      </h3>
      {
        args.map((arg, key) => {
          return <BuiltArg key={key} {...arg} />
        })}
    </div>
  </div>
}
