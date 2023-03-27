import classes from "./classes.module.scss";
import React from "react";

// Dynamic import mandatory to avoid the error : window undefined
// https://stackoverflow.com/questions/68596778/next-js-window-is-not-defined
import dynamic from "next/dynamic";
import Card from "@Components/Elements/Card";
import { IResponseTypeOfRequests } from "@/api/Metric";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type IProps = {
  typeOfRequests: IResponseTypeOfRequests | null;
};

type IState = {};

export default class TypeOfRequests extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
    this.renderContent = this.renderContent.bind(this);
  }

  public override render() {
    return (
      <div className={classes["root"]}>
        <Card
          title="Type of Requests"
          content={<this.renderContent />}
          data={this.props.typeOfRequests !== null}
        />
      </div>
    );
  }

  private renderContent(): JSX.Element {
    const options = {
      width: "500px",
      labels: (this.props.typeOfRequests ?? []).map(
        (element) => element.path
      ),
      legend: {
        show: true,
        labels: {
          colors: "#fff",
          useSeriesColors: false,
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        expandOnClick: true,
        pie: {
          customScale: 1.05,
          donut: {
            size: "80%",
            labels: {
              show: true,
              value: {
                color: "#42E8E0",
                fontSize: "37px",
                fontWeight: "bold",
              },
              total: {
                showAlways: true,
                show: true,
                label: "TOTAL REQUESTS",
                color: "#fff",
                fontSize: "13px",
              },
            },
          },
        },
      },
      tooltip: {
        theme: "dark",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
    const series = (this.props.typeOfRequests ?? []).map(
      (element) => element._count.path
    );
    return (
      <Chart
        options={options}
        series={series}
        type="donut"
        height="100%"
        width={"100%"}
      />
    );
  }
}
