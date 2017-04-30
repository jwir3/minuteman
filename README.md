# minuteman
A minimal app for quickly taking meeting minutes

## Minutes Specification
Minutes files are in `json` file format. They have the following structure:
```
{
  "organizationName": "...",
  "meetingScheduledTime": "...",
  "calledToOrder": "...",
  "adjourned": "..."
}
```

### Properties
  * `organizationName`: A `String` containing the name of the organization for which the meeting is being held.
  * `meetingScheduledTime`: A `Moment` which has the value of the time at which the meeting was scheduled (see note 1, below).
  * `calledToOrder`: A `Moment` which has the value of the time at which the meeting was called to order (see note 1, below).
  * `adjourned`: A `Moment` which has the value of the time at which the meeting was adjourned (see note 1, below).

### Methods
  * `callToOrder()`: Calls the meeting to order, and records the time at which the meeting was called to order in the `Minutes` as the current `Moment`.
  * `adjourn()`: Adjourns the meeting, and records the time at which the meeting was adjourned in the `Minutes` as the current `Moment`. Will throw an exception if the meeting has not yet been called to order.
  * `calledToOrderAt()`: Returns the time, as a string, at which the meeting was called to order, in the form: "hh:mma on MMMM DD, YYYY" (e.g. "12:01pm on July 12, 1996"). This will throw an exception if the meeting has not yet been called to order.
  * `adjournedAt()`: Returns the time, as a string, at which the meeting was adjourned, in the form: "hh:mma on MMMM DD, YYYY". If the month, day, and year of the `adjourned` parameter match that of the `calledToOrder` parameter, the date will be omitted (e.g. "12:36pm"). This will throw an exception if the meeting has not yet been adjourned.

### Notes
  1. All times are in the local time of the meeting place. As such, no timezone information is stored. We can't correctly store time zone units in the minutes data structure, which uses moment.js (without the timezone plugin), so we simply don't have this information at the current time (no pun intended). Future work can be done to either a) store all times in UTC and convert back to local time zone for display purposes, or b) use the moment-timezone plugin to appropriately store timezone information.

## Roadmap
Version 1.0 really needs to have some amount of useful stuff in it. A user should be able to do the following, at a minimum, within version 1.0:

  * Create a document style for outputting minutes (probably in some form of mustache template).
  * Add an organization, with officers and members.
  * Create a new set of minutes. Minutes should have the following:
    - A call to order time
    - A listing of members present and not present
    - An agenda containing sections which should be discussed. Within each of these, there should be topics.
      - Each topic should have the ability to contain discussion, motions, and votes. These are obtained through the use of the UI within minuteman that has specific modes of operation. This could be called something like "holding" the meeting (as opposed to "planning" the meeting).
    - An adjournment time
