# minuteman
A minimal app for quickly taking meeting minutes

## Minutes Specification
Minutes files are in `json` file format. They have the following structure:
```
{
  "organizationName": "...",
  "meetingScheduledTime": "...",
  "callToOrder": "...",
  "adjourn": "..."
}
```

### Definitions
  * `organizationName`: A `String` containing the name of the organization for which the meeting is being held.
  * `meetingScheduledTime`: A `Date` which has the value of the time at which the meeting was scheduled, in UTC.
  * `callToOrder`: A `Date` which has the value of the time at which the meeting was called to order, in UTC.
  * `adjourn`: A `Date` which has the value of the time at which the meeting was adjourned, in UTC.

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
