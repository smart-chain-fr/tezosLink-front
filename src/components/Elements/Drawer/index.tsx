import Link from "next/link";
import React from "react";
import Image, { StaticImageData } from "next/image";
import classes from "./classes.module.scss";
import classNames from "classnames";
import LoginIcon from "@Assets/icons/login.svg"
import CardsIcon from "@Assets/icons/cards.svg"
import WorldIcon from "@Assets/icons/world.svg"
import InfrastructureIcon from "@Assets/icons/infrastructure.svg"
import PlusCardIcon from "@Assets/icons/plus-card.svg"
import DocsIcon from "@Assets/icons/documentation.svg"
import { NextRouter, withRouter } from "next/router";

type LinkObject = {
    name: string,
    link: string,
    icon: StaticImageData
}

type IState =  {
    Links: LinkObject[];
}

interface IProps {
    status: boolean,
    hideCallback: () => void,
}

interface WithRouterProps {
    router: NextRouter
}

interface IProps extends WithRouterProps {}

class Drawer extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
            this.state = { Links: [{name: "See my project", link: "/show-project", icon: LoginIcon },
                {name: "Create", link: "/new-project", icon: PlusCardIcon },
                {name: "Documentation", link: "/documentation", icon: DocsIcon },
                {name: "Status", link: "/status", icon: CardsIcon },
                {name: "Infrastructure Service", link: "/infrastructure-service", icon: InfrastructureIcon },
                {name: "World map", link: "/world-map", icon: WorldIcon },
            ]
        }
    }

    public override render() {
        return <>
            <div className={classNames(classes[String(this.props.status)], classes["shadow"])} onClick={this.props.hideCallback} />
            <div className={classNames(classes[String(this.props.status)], classes["root"])}>
                <h1>Menu</h1>
                {this.state.Links.map((link, index) => this.renderItem(link, index))}
            </div>
        </>
    }

    private renderItem(link: LinkObject, index: number): JSX.Element {
        return <div  key={index} className={classNames(classes["item"], classes[this.isCurrentPath(link.link)])}>
            <Link href={link.link} onClick={this.props.hideCallback}>
                <Image alt="icon" src={link.icon}/>
                {link.name}
            </Link>
        </div>
    }

    private isCurrentPath(link: string): string {
        if (this.props.router.pathname === link)
            return 'current-path'
        return 'other-path';
    }
}

export default withRouter(Drawer);