'use strict';

import moment from 'moment';

/**
 * An object representing the minutes from a real-world meeting that either took
 * place in the past, or is taking place now.
 */
class Minutes {
  constructor(scheduledStartTime) {
    this.scheduledStartTime = scheduledStartTime;
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
    return this.formatDateTime(this.meetingScheduledTime);
  }

  formatDateTime(dateTime) {
    if (dateTime == null) {
      throw ("Unable to format a null date/time");
    }

    return dateTime.format('MMMM D, YYYY hh:mma');
  }
}

module.exports = Minutes;
