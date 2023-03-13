import React, { RefObject } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames"
import Image from "next/image"
import ErrorIcon from "@Assets/icons/input-error.svg"
import SuccessIcon from "@Assets/icons/input-success.svg"

type IProps = {
    inputRef?: RefObject<HTMLInputElement>,
    icon?: string,
    placeholder?: string,
    name?: string,
    value?: string,
    onChange: any,
    onBlur?: any,
    inputStatus: 'success' | 'error' | 'neutral',
    errorMsg?: string
    type: string
};

export default class InputField extends React.Component<IProps> {
    public constructor(props: IProps) {
        super(props);
    }
    public override render(): JSX.Element {
        return <>
            <div className={classNames(classes["root"])}>
                {this.props.icon && <Image className={classes["icon"]} alt={this.props.icon} src={this.props.icon} />}
                <input className={classNames(classes["component"], classes[this.props.inputStatus])}
                    ref={this.props.inputRef}
                    type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    autoComplete={this.props.name}
                />
                <div className={classNames(classes["status"], classes[this.props.inputStatus])}>
                    {this.props.inputStatus === "success" &&
                        <Image alt="success icon" src={SuccessIcon} />}
                    {this.props.inputStatus === "error" &&
                        <Image alt="error icon" src={ErrorIcon} />
                    }
                </div>
            </div>
            {this.props.errorMsg && <div className={classes["errorMsg"]}>{this.props.errorMsg}</div>}
        </>
    }
}