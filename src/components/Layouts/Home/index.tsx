import Header from "@/components/Materials/Header";
import BasePage from "@Components/Layouts/Base";
import Built from "./Built";
import classes from "./classes.module.scss";
import Footer from "./Footer";
import GetStarted from "./GetStarted";
import Head from "./Head";
import Metrics from "./Metrics";
import Panels from "./Panels";
import Trusted from "./Trusted";

export default class Home extends BasePage {
  public override render(): JSX.Element {
    return (
      <div className={classes["root"]}>
        <Header />
        <Head />
        <Built />
        <Trusted />
        <Metrics />
        <Panels />
        <GetStarted />
        <Footer />
      </div>
    );
  }
}
