import Link from "next/link";
import classes from "./classes.module.scss";
import TokenCopy from "../TokenCopy";

type IProps = {
  token: string;
};

export default function ProjectName(props: IProps): JSX.Element {
  return (
    <div className={classes["root"]}>
      <div className={classes["title"]}>private token</div>
      <TokenCopy token={props.token} />
      <p>
        Make sure to <b>save this token</b>, it is both your{" "}
        <b>access to this dashboard</b> and the <b>API key</b> to interact with
        the proxy.
      </p>
      <p>
        You can find information about how to use our gateway here :{" "}
        <Link href={"/documentation"}>documentation</Link>.
      </p>
    </div>
  );
}
