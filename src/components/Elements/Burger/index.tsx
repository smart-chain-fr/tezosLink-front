import classes from "./classes.module.scss";
import classNames from "classnames";

type IProps = {
	state: boolean,
	callback: () => void
};

export default function Burger({ state, callback }: IProps) {
	return (
		<div className={classes["root"]} onClick={() => callback()}>
			<div className={classes["box"]} >
				<div className={classNames(classes["inner-top"], classes["inner"], classes[String(state)])} />
				<div className={classNames(classes["inner-middle"], classes["inner"], classes[String(state)])} />
				<div className={classNames(classes["inner-bottom"], classes["inner"], classes[String(state)])} />
			</div>
		</div>
	);
}
