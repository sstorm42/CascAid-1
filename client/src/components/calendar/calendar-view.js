import React from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { getColorByPostType } from '@Constants/post-types';

const locales = {
    'en-US': require('date-fns/locale/en-US'),
};

const allViews = Object.keys(Views).map((k) => Views[k]);
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const Event = ({ event }) => {
    return (
        <span>
            <strong>{event.title}</strong>
        </span>
    );
};
const EventAgenda = ({ event }) => {
    return (
        <span>
            <em style={{ color: 'white' }}>{event.title}</em>
        </span>
    );
};
const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'white',
        },
    });
// const customSlotPropGetter = (date) => {
//     if (date.getDate() === 7 || date.getDate() === 15)
//         return {
//             className: 'special-day',
//         };
//     else return {};
// };
const CalendarView = (props) => {
    const posts = props.posts;
    const setPost = props.setPost;
    const setPostModal = props.setPostModal;
    const eventStyleGetter = (post, start, end, isSelected) => {
        var style = {
            backgroundColor: getColorByPostType(post.postType),

            opacity: 0.8,
            color: 'white',
            borderRadius: '3px',
            // border: '0px',
            // display: 'block',
        };
        return {
            style: style,
        };
    };
    return (
        <Calendar
            onShowMore={(events, date) => console.log(date)}
            localizer={localizer}
            events={posts}
            startAccessor="startDateTime"
            endAccessor="endDateTime"
            style={{ height: 700 }}
            views={allViews}
            components={{
                event: Event,
                agenda: {
                    event: EventAgenda,
                },
                timeSlotWrapper: ColoredDateCellWrapper,
            }}
            onSelectEvent={(e) => {
                console.log(e);
                setPost(e);
                setPostModal(true);
            }}
            eventPropGetter={eventStyleGetter}
        />
    );
};
export default CalendarView;
