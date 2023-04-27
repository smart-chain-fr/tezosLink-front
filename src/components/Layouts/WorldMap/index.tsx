import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import classes from "./classes.module.scss";

import worldMill from "@react-jvectormap/world/worldMill.json";
import dynamic from "next/dynamic";

const VectorMap = dynamic(
  // @ts-ignore
  () => import("@react-jvectormap/core").then((m) => m.VectorMap),
  { ssr: false }
);

type IState = {
  markers: Marker[];
};

type IProps = {
  markers: Marker[];
};

type Marker = {
  name: string;
  latLng: number[];
};

export default class WorldMap extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      markers: this.props.markers,
    };
  }

  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={"World map"}>
        <div className={classes["root"]}>
          <div className={classes["header"]}>
            <div className={classes["title"]}>
              <h1>World map requests</h1>
            </div>
          </div>
          <div className={classes["content"]}>
            <VectorMap
              regionStyle={{
                initial: {
                  fill: "#2B2E44",
                  stroke: "white",
                  //@ts-ignore
                  "stroke-width": 0.2,
                  "stroke-opacity": 1,
                  fillOpacity: 1,
                },
                hover: {
                  fill: "#42E8E0",
                  //@ts-ignore
                  "fill-opacity": 0.1,
                  stroke: "#42E8E0",
                  "stroke-width": 0.5,
                  "stroke-opacity": 1,

                }
              }}
              backgroundColor="#2E3247"
              map={worldMill}
              markers={this.state.markers}
              markerStyle={{
                initial: {
                  fill: "#42E8E0",
                  stroke: "#272B40",
                },
              }}
            />
          </div>
        </div>
      </DefaultTemplate>
    );
  }

  public override async componentDidMount(): Promise<void> {}
}
