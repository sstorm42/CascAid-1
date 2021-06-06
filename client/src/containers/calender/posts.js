const now = new Date();

export default [
    {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        startDateTime: new Date(2021, 3, 0),
        endDateTime: new Date(2021, 3, 1),
    },
    {
        id: 1,
        title: 'Long Event',
        startDateTime: new Date(2021, 3, 7),
        endDateTime: new Date(2021, 3, 10),
    },

    {
        id: 2,
        title: 'DTS startDateTimeS',
        startDateTime: new Date(2021, 2, 13, 0, 0, 0),
        endDateTime: new Date(2021, 2, 20, 0, 0, 0),
    },

    {
        id: 3,
        title: 'DTS endDateTimeS',
        startDateTime: new Date(2021, 10, 6, 0, 0, 0),
        endDateTime: new Date(2021, 10, 13, 0, 0, 0),
    },

    {
        id: 4,
        title: 'Some Event',
        startDateTime: new Date(2021, 3, 9, 0, 0, 0),
        endDateTime: new Date(2021, 3, 10, 0, 0, 0),
    },
    {
        id: 5,
        title: 'Conference',
        startDateTime: new Date(2021, 3, 11),
        endDateTime: new Date(2021, 3, 13),
        desc: 'Big conference for important people',
    },
    {
        id: 6,
        title: 'Meeting',
        startDateTime: new Date(2021, 3, 12, 10, 30, 0, 0),
        endDateTime: new Date(2021, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
        id: 7,
        title: 'Lunch',
        startDateTime: new Date(2021, 3, 12, 12, 0, 0, 0),
        endDateTime: new Date(2021, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch',
    },
    {
        id: 8,
        title: 'Meeting',
        startDateTime: new Date(2021, 3, 12, 14, 0, 0, 0),
        endDateTime: new Date(2021, 3, 12, 15, 0, 0, 0),
    },
    {
        id: 9,
        title: 'Happy Hour',
        startDateTime: new Date(2021, 3, 12, 17, 0, 0, 0),
        endDateTime: new Date(2021, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day',
    },
    {
        id: 10,
        title: 'Dinner',
        startDateTime: new Date(2021, 3, 12, 20, 0, 0, 0),
        endDateTime: new Date(2021, 3, 12, 21, 0, 0, 0),
    },
    {
        id: 11,
        title: 'Birthday Party',
        startDateTime: new Date(2021, 3, 13, 7, 0, 0),
        endDateTime: new Date(2021, 3, 13, 10, 30, 0),
    },
    {
        id: 12,
        title: 'Late Night Event',
        startDateTime: new Date(2021, 3, 17, 19, 30, 0),
        endDateTime: new Date(2021, 3, 18, 2, 0, 0),
    },
    {
        id: 12.5,
        title: 'Late Same Night Event',
        startDateTime: new Date(2021, 3, 17, 19, 30, 0),
        endDateTime: new Date(2021, 3, 17, 23, 30, 0),
    },
    {
        id: 13,
        title: 'Multi-day Event',
        startDateTime: new Date(2021, 3, 20, 19, 30, 0),
        endDateTime: new Date(2021, 3, 22, 2, 0, 0),
    },
    {
        id: 14,
        title: 'Today',
        startDateTime: new Date(new Date().setHours(new Date().getHours() - 3)),
        endDateTime: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 15,
        title: 'Point in Time Event',
        startDateTime: now,
        endDateTime: now,
    },
];
