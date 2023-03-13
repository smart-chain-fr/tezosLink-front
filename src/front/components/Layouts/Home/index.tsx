
import Built from "./Built";
import GetStarted from "./GetStarted";
import Head from "./Head";
import Metrics from "./Metrics";
import Panels from "./Panels";
import Trusted from "./Trusted";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate"
import classes from "./classes.module.scss";
import Footer from "./Footer";

export default class Home extends BasePage {
	public override render(): JSX.Element {
		return (
			<DefaultTemplate title={"HomePage"}>
				<div className={classes["root"]}>
                    <Head/>
                    <Built/>
                    <Trusted/>
                    <Metrics/>
                    <Panels/>
                    <GetStarted/>
					<Footer />
				</div>
			</DefaultTemplate>
		);
	}
}
