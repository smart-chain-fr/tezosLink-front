import classes from "./classes.module.scss";
import React from "react";

// Dynamic import mandatory to avoid the error : window undefined
// https://stackoverflow.com/questions/68596778/next-js-window-is-not-defined
import dynamic from "next/dynamic";
import Card from "@/components/Elements/Card";
import { IResponseMyRequests } from "@/api/Metric";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type IProps = {
  requests: IResponseMyRequests | null;
};

type IState = {};

export default class MyRequests extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.renderContent = this.renderContent.bind(this);
  }

  public override render() {
    return (
      <div className={classes["root"]}>
        <Card
          title="My Requests"
          content={<this.renderContent />}
          data={this.props.requests !== null}
        />
      </div>
    );
  }

  private renderContent(): JSX.Element {
    const options = {
      chart: {
        id: "basic-bar",
        height: "100%",
      },
      
      stroke: {
        curve: "smooth",
        colors: ["#42E8E0"],
      },
      markers: {
        size: 2,
        colors: ["#42E8E0"],
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      legend: {
        show: true,
        labels: {
          useSeriesColors: true,
        },
      },
      tooltip:{
        enabled: true,
        theme: 'dark',
      },
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
          rotate: 0,
          style: {
            colors: "#FFF",
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: "#FFF",
          },
        },
      },
    };
    const series = [
      {
        name: "Requests",
        type: "line",
        data: (this.props.requests ?? []).map((rq) => {
          return { x: rq.date, y: rq.count };
        }),
      },
    ];
    return (
      <Chart
          options={options as any}
          series={series}
          type="line"
          height="95%"
          width="100%"
        />
    );
  }

  override componentDidMount(): void {
    // to avoid hydration error with ssr
    this.setState({ componentMount: true });
  }
}
