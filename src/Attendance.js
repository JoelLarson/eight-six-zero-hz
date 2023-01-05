class AttendanceEntry {
    eventName;
    badgeId;
    action;

    constructor(eventName, badgeId, action) {
        this.eventName = eventName;
        this.badgeId = badgeId;
        this.action = action;
    }
}

export { AttendanceEntry };