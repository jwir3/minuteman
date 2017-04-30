'use strict';

import moment from 'moment';

/**
 * An object representing the minutes from a real-world meeting that either took
 * place in the past, or is taking place now.
 */
class Minutes {
  constructor(scheduledStartTime) {
    this.scheduledStartTime = moment(scheduledStartTime);
  }

  get calledToOrderTime() {
    return this.calledToOrder;
  }

  set calledToOrderTime(time) {
    this.calledToOrder = time;
  }

  get adjournedTime() {
    return this.adjourned;
  }

  set adjournedTime(time) {
    this.adjourned = time;
  }

  get scheduledStartTime() {
    return this.meetingScheduledTime;
  }

  set scheduledStartTime(time) {
    if (time != null) {
      this.meetingScheduledTime = time;
    } else {
      this.meetingScheduledTime = moment();
    }
  }

  get scheduledStartTimeAsString() {
    return Minutes.formatDateTime(this.meetingScheduledTime);
  }

  static formatDateTime(dateTime) {
    if (dateTime == null) {
      throw ("Unable to format a null date/time");
    }

    return dateTime.format('MMMM D, YYYY hh:mma');
  }

  hasBeenCalledToOrder() {
    return this.calledToOrder != null;
  }

  hasBeenAdjourned() {
    return this.adjourned != null;
  }

  callToOrder() {
    if (this.hasBeenCalledToOrder()) {
      throw('Meeting has already been called to order');
    }

    this.calledToOrderTime = moment();
  }

  adjourn() {
    if (!this.hasBeenCalledToOrder()) {
      throw('Meeting has not yet been called to order');
    }

    if (this.hasBeenAdjourned()) {
      throw('Meeting was already adjourned at ');
    }

    this.adjournedTime = moment();
  }

  static parse(minutesJson) {
    var obj = JSON.parse(minutesJson);
    var newObj = new Minutes(obj.scheduledStartTime);
    if (obj.calledToOrder) {
      newObj.calledToOrderTime = moment(obj.calledToOrder);
    }

    if (obj.adjourned) {
      newObj.adjournedTime = moment(obj.adjourned);
    }

    return newObj;
  }
}

module.exports = Minutes;
