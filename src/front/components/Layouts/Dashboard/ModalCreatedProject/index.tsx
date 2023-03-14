import classes from "./classes.module.scss";
import { Button } from "@Components/Elements/Button";
import Modal from "@Components/Elements/Modal";
import TokenCopy from "../TokenCopy";
import Confettis from "../Confettis";
import React from "react";

type IProps = {
  uuid: string;
  closeModal: () => void;
};

export default class ModalCreatedProject extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.renderModal = this.renderModal.bind(this);
  }

  public override render() {
    return <Modal title="Well Down!" children={<this.renderModal />} />;
  }

  private renderModal(): JSX.Element {
    return (
      <>
        <Confettis />
        <>
          <h3>Usage</h3>
          <p>
            We've generated a Project ID for you, this identifier is both your{" "}
            <b>login to this dashboard</b> and
            <b> your credential to access the request URL.</b>
          </p>
          <div className={classes["code"]}>
            {"curl https://<network>.tezoslink.net/v1/YOUR-PROJECT-ID"}
          </div>
          <h3>Your Project ID</h3>
          <b>Make sure to save the following Project ID:</b>
          <TokenCopy token={this.props.uuid} />
          <Button
            color={"secondary"}
            onClick={this.props.closeModal}
            text="Got it!"
          />
        </>
      </>
    );
  }
}
