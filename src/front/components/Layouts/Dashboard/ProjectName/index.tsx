import classes from "./classes.module.scss";

type IProps = {
  name: string;
};

export default function ProjectName(props: IProps): JSX.Element {
  return <div className={classes["root"]}>Project {props.name}</div>;
}
