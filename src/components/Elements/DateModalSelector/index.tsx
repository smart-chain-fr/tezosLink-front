import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { ActiveModifiers, DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import classes from "./classes.module.scss";
import ArrowIcon from "@Assets/icons/arrow-bottom.svg";

type IProps = {
  onChange: (date?: DateRange) => void;
  value: DateRange;
};

type IState = {
  showModal?: boolean;
};

export default class DateModalSelector extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      showModal: false,
    }


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
          {!this.props.value?.from && !this.props.value?.to && "Select Date"}
          {this.props.value?.from && format(this.props.value?.from, "PPP")}
          {this.props.value?.from && this.props.value?.to && " - "}
          {this.props.value?.to && format(this.props.value?.to, "PPP")}
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
                selected={this.props.value ?? undefined}
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
  ): DateRange | undefined {
    // if(!range){
    //   const now = new Date().getTime();
    //   let startOfDay = now - (now % 86400000);
    //   let endDate = startOfDay + 86400000;
    //   return {
    //     from: new Date(startOfDay),
    //     to: new Date(endDate)
    //   }
    // }
    // if(!range.to){
    //   range.to = new Date()
    // }
    // if(!range.from){
    //   range.to = new Date()
    // }
    // if(range.from) {
    //   let startOfDay = range.from.getTime()  - (range.from.getTime()  % 86400000);
    //   range.from = new Date(startOfDay);
    // }
    // if(range.to) {
    //   let startOfDay = range.to.getTime()  - (range.to.getTime()  % 86400000);
    //   let endDate = startOfDay + 86400000;
    //   range.to = new Date(endDate);
    // }
    
    if (this.props.onChange) this.props.onChange(range);
    // this.setState({ date: range });
    return range;
  }
}
