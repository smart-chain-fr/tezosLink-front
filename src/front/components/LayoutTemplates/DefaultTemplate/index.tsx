import React, { ReactNode } from "react";

import Header from "@Components/Materials/Header";

import classes from "./classes.module.scss";

type IProps = {
	title: string;
	children?: ReactNode;
	/**
	 * @description scroll top with number or disabled with null
	 */
	scrollTop: number | null;
};
type IState = {};

export default class DefaultTemplate extends React.Component<IProps, IState> {
	public static defaultProps = {
		scrollTop: 0,
	};

	public override render(): JSX.Element {
		return (
			<>
				<Header />
				<div className={classes["root"]}>
					<div className={classes["content"]}>{this.props.children}</div>
				</div>
			</>

		);
	}

	public override componentDidMount() {
		window.document.title = this.props.title;
		if (this.props.scrollTop !== null) {
			window.scrollTo(0, this.props.scrollTop);
		}
	}
}