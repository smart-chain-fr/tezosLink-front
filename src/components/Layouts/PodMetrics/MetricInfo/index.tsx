import React from "react";
import classes from "./classes.module.scss";
// Dynamic import mandatory to avoid the error : window undefined
// https://stackoverflow.com/questions/68596778/next-js-window-is-not-defined
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type IProps = {
  title: string;
  options: ApexCharts.ApexOptions | null;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | null;
};
export default class MetricInfo extends React.Component<IProps> {
  public constructor(props: any) {
    super(props);
  }

  public override render(): JSX.Element {
    return (
      <div className={classes["root"]}>
        <div className={classes["header"]}>{this.props.title}</div>
        <div className={classes["content"]}>
          {this.props.options && this.props.series && (
            <Chart
              options={this.props.options}
              series={this.props.series}
              type="line"
              height="95%"
              width="100%"
            />
          )}
        </div>
      </div>
    );
  }
}
