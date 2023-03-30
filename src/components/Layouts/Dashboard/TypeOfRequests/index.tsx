import React from "react";
import classes from "./classes.module.scss";

// Dynamic import mandatory to avoid the error : window undefined
// https://stackoverflow.com/questions/68596778/next-js-window-is-not-defined
import { IResponseTypeOfRequests } from "@/api/Metric";
import Card from "@Components/Elements/Card";
import dynamic from "next/dynamic";


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
      // colors: colors,
      chart: {
        // height: "500px"
      },
      labels: (this.props.typeOfRequests ?? []).map((element) => element.path),
      legend: {
        show: true,
        labels: {
          colors: "#fff",
          useSeriesColors: false,
          toggleDataSeries: false,
        },
        //@ts-ignore
        formatter: function (seriesName, opts) {
          if(seriesName.length > 30){
            return seriesName.slice(0, 30) + "...";
          }
          return seriesName ;
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
          expandOnClick: false,
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
          breakpoint: 1440,
          options: {
            chart: {
              height: 300,
            },
            legend: {
              position: "bottom",
              itemMargin: {
                horizontal: 10,
                vertical: 10,
              },
            },
          },
        },
        {
          breakpoint: 440,
          options: {
            chart: {
              height: 300,
            },
            legend: {
              position: "bottom",
              itemMargin: {
                horizontal: 10,
                vertical: 10,
              },
              //@ts-ignore
              formatter: function (seriesName, opts) {
                return seriesName.slice(0, 10) + "...";
              },
            },
            plotOptions: {
              pie: {
                donut: {
                 
                  labels: {
                    show: true,
                    value: {
                      color: "#42E8E0",
                      fontSize: "30px",
                      fontWeight: "bold",
                    },
                    total: {
                      
                      fontSize: "14px",
                    },
                  },
                },
              },
            },
          },
        },
      ],
    };
    const series = (this.props.typeOfRequests ?? []).map(
      (element) => element.count
    );
    return (
      <div className={classes["content-container"]}>
        <Chart
          options={options}
          series={series}
          type="donut"
          height={300}
        />
      </div>
    );
  }
}
