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
