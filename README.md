# minuteman
A minimal app for quickly taking meeting minutes.

## Motivation
When participating in organizations where Robert's Rules of Order are used, it's often the case that formal meeting minutes need to be taken and disseminated to the larger group. Unfortunately, if one is stuck recording these meeting minutes (especially if a participant in the ongoing discussions and decisions), it's very likely that the meeting minutes will be mis-recorded (or not recorded in a discernible way), and thus the record is not preserved for posterity. Additionally, when taking meeting minutes by hand and then typing them into a formal document at a later date, it relies on a context (the original meeting) inaccessible to the user at the time of typing.

minuteman solves this problem by creating the formal version of the meeting minutes as you are recording the "shorthand" or draft version of the minutes, likely while the meeting is ongoing. It is fast, easy to use, and offers an interface that gives the user the power to type, almost in shorthand, while recording formal, beautiful-looking documents that can then be disseminated immediately after the meeting.  

## Status
The minuteman project is currently in a **Alpha** state, meaning our initial set of functionality necessary for releasing version 1.0.0 has not yet been developed. Please see the Roadmap below, for more information.

## Setup and Installation

## Basic Usage
minuteman has two modes: "planning" mode and "secretarial" mode. The "planning" mode is used for planning future meetings, preparing agendas, and setting up organizations. The "secretarial" mode is for recording meeting minutes while a meeting is ongoing (or shortly after the meeting has concluded). The real power of minuteman comes from its ability to quickly record meeting minutes, as the meeting is progressing.

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
  * `calledToOrderAt()`: Returns the time, as a string, at which the meeting was called to order, in the form: "h:mma on MMMM DD, YYYY" (e.g. "12:01pm on July 12, 1996"). This will throw an exception if the meeting has not yet been called to order.
  * `adjournedAt()`: Returns the time, as a string, at which the meeting was adjourned, in the form: "h:mma on MMMM DD, YYYY". If the month, day, and year of the `adjourned` parameter match that of the `calledToOrder` parameter, the date will be omitted (e.g. "12:36pm"). This will throw an exception if the meeting has not yet been adjourned.

### Notes
  1. All times are in the local time of the meeting place. As such, no timezone information is stored. We can't correctly store time zone units in the minutes data structure, which uses moment.js (without the timezone plugin), so we simply don't have this information at the current time (no pun intended). Future work can be done to either a) store all times in UTC and convert back to local time zone for display purposes, or b) use the moment-timezone plugin to appropriately store timezone information.

## Roadmap
Version 1.0 really needs to have some amount of useful stuff in it. A user should be able to do the following, at a minimum, within version 1.0:

  * Create a document style for outputting minutes (probably in some form of mustache template).
  * ~~Add an organization, with officers and members.~~
  * Create a new set of minutes. Minutes should have the following:
    - A call to order time
    - A listing of members present and not present
    - An agenda containing sections which should be discussed. Within each of these, there should be topics.
      - Each topic should have the ability to contain discussion, motions, and votes. These are obtained through the use of the UI within minuteman that has specific modes of operation. This could be called something like "holding" the meeting (as opposed to "planning" the meeting).
    - An adjournment time

## API
### Member
#### Properties
  * `id`: An identifier for the member. This should be unique throughout the system. Currently, member ids are unique only to an organization, so this constraint is being violated right now.
  * `name`: A name, specified as `FirstName LastName`. Both of the names are optional, but if only one is specified, it is assumed to be a first name.

#### Methods
  * `constructor(id, name)`: Create a new `Member` object, given an id and name.
  * `equals(aOther)`: Determine if a member object (this) is equivalent to `aOther`. If `aOther` is not a `Member`, or if `aOther`'s fields do not exactly match the fields of `this`, return `false`. Otherwise, return `true`.

### Organization

### Minutes
