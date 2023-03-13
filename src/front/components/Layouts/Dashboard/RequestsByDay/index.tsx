import classes from "./classes.module.scss"
import React from "react";

// Dynamic import mandatory to avoid the error : window undefined
// https://stackoverflow.com/questions/68596778/next-js-window-is-not-defined
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


type requestByDay = {
    date: Date,
    value: number
}

type IProps = {
    requestsByDays: requestByDay[]
}

type IState = {
    options: ApexCharts.ApexOptions,
    series: ApexAxisChartSeries
    componentMount: boolean
}


export default class RequestsByDay extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                stroke: {
                    curve: 'smooth',
                    colors: ['#42E8E0']
                },
                markers: {
                    size: 2,
                    colors: ['#42E8E0'],
                },
                grid: {
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        show: true,
                        rotate: 0,
                        style: {
                            colors: this.props.requestsByDays.map(() => '#FFF'),
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                        },
                    },
                },
                yaxis: {
                    labels: {
                        show: true,
                        style: {
                            colors: ['#FFF'],
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                        },
                    },
                },
            },
            series: [
                {
                    name: 'Nb of request',
                    type: 'line',
                    data: this.props.requestsByDays.map(rq => {
                        return { x: rq.date.getTime(), y: rq.value }
                    })
                }
            ],
            componentMount: false
        };
    }

    public override render() {
        return (<div className={classes["root"]}>
            <div className={classes["title"]}>Requests last 30 days</div>
            {this.state.componentMount === true &&
                <Chart options={this.state.options}
                    series={this.state.series}
                    type='line'
                    height='95%'
                    width='100%'
                />
            }
        </div>)
    }

    override componentDidMount(): void {
        // to avoid hydration error with ssr
        this.setState({componentMount: true});
    }
}