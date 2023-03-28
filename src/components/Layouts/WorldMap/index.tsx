import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import classes from "./classes.module.scss";

import dynamic from "next/dynamic";
import worldMill from "@react-jvectormap/world/worldMill.json";
import countryCodes from "@Assets/country-codes.json";
import Metric, { IResponseWorldMap } from "@/api/Metric";

const VectorMap = dynamic(
  // @ts-ignore
  () => import("@react-jvectormap/core").then((m) => m.VectorMap),
  { ssr: false }
);

type IState = {
  data: IResponseWorldMap | null;
};

type IProps = {};

type Marker = {
  name: string;
  latLng: number[];
};

export default class WorldMap extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      data: null,
    };

    this.getWorldmapMarkers = this.getWorldmapMarkers.bind(this);
  }

  public override render(): JSX.Element {
    return (
      <DefaultTemplate title={"World map"}>
        <div className={classes["root"]}>
          <div className={classes["header"]}>
            <div className={classes["title"]}>
              <h1>World map</h1>
            </div>
          </div>
          <div className={classes["content"]}>
            <VectorMap
              map={worldMill}
              markers={this.getWorldmapMarkers()}
              markerStyle={{
                initial: {
                  fill: "#F8E23B",
                  stroke: "#383f47",
                },
              }}
            />
          </div>
        </div>
      </DefaultTemplate>
    );
  }

  public override async componentDidMount(): Promise<void> {
    this.fetchWorldMap();
  }

  private async fetchWorldMap() {
    try {
      const data = await Metric.getInstance().getWorldmapInfo();
      this.setState({ data });
    } catch (err) {
      console.error(err);
    }
  }

  private getWorldmapMarkers() {
    const markers: Marker[] = [];
    if (this.state.data) {
      for (const item of this.state.data.data) {
        const countryCode = countryCodes.ref_country_codes.find(
          (country) => country.alpha2 === item.country
        );
        if (!countryCode) continue;
        markers.push({
          latLng: [countryCode.latitude, countryCode.longitude],
          name: `${countryCode.country} : ${item.count}`,
        });
      }
      return markers;
    }
    return [];
  }
}
