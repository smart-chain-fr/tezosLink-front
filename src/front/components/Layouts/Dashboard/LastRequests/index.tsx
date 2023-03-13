import classes from "./classes.module.scss"
import React from "react"
import Card from "@Components/Elements/Card";

type IProps = {
    lastRequests : string[]
}

export default class LastRequests extends React.Component<IProps> {

    public constructor(props: IProps) {
        super(props);
        this.renderContent = this.renderContent.bind(this);
    }

    public override render() {
        return <div className={classes["root"]}>
                <Card   title="Last Request"
                        content={<this.renderContent/>}
                        data={this.props.lastRequests && this.props.lastRequests.length > 0}/>
            </div>
    }

    private showRequests(request: string, isFirst: boolean) {
        const stringLength = isFirst ? 40 : 60
        if (request.length > stringLength) {
            return request.substring(0, stringLength) + '...'
        }
        return request;
    }

    private renderContent() : JSX.Element {
        return (<>
            <div className={classes["list"]}>
                {this.props.lastRequests.slice(0, 5).map((request: string, index: number) => {
                    return (
                        <div className={classes["item"]} key={index}>
                            <div className={classes["tooltip"]} data-tooltip={request}>
                                {this.showRequests(request, index === 0)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>)

    }
}