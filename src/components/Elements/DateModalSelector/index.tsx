import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { ActiveModifiers, DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import classes from "./classes.module.scss";
import ArrowIcon from "@Assets/icons/arrow-bottom.svg";

type IProps = {
  onChange: (date: DateRange) => void;
  value: DateRange;
};

type IState = {
  showModal?: boolean;
  date: DateRange;
};

export default class DateModalSelector extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      date: props.value,
    };
    this.onChange = this.onChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  override render(): React.ReactNode {
    return (
      <div className={classes["root"]}>
        <div
          className={classes["show-date-picker-button"]}
          onClick={this.toggleModal}
        >
          {!this.state.date.from && !this.state.date.to && "Select Date"}
          {this.state.date.from && format(this.state.date.from, "PPP")}
          {this.state.date.from && this.state.date.to && " - "}
          {this.state.date.to && format(this.state.date.to, "PPP")}
          <div className={classes["arrow-icon"]}>
            <Image alt="arrow icon" src={ArrowIcon} />
          </div>
        </div>
        {this.state.showModal && (
          <div className={classes["root-modal"]}>
            <div className={classes["overlay"]} onClick={this.toggleModal} />
            <div className={classes["date-picker"]}>
              <DayPicker
                mode={"range"}
                selected={this.state.date ?? undefined}
                onSelect={this.onChange}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  private toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  private onChange(
    /** The current range of the selected days. */
    range: DateRange | undefined,
    /** The day that was selected (or clicked) triggering the event. */
    selectedDay: Date,
    /** The modifiers of the selected day. */
    activeModifiers: ActiveModifiers,
    e: React.MouseEvent
  ) : DateRange {
    const formattedRange = range ?? { to: new Date(), from: new Date() };
    if (!formattedRange.to) formattedRange.to = formattedRange.from;
    if (this.props.onChange) this.props.onChange(formattedRange);
    this.setState({ date: formattedRange });
    return formattedRange;
  }
}
