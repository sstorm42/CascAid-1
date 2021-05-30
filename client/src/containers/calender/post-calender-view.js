import React, { Component } from 'react';
import { Container, Row, Col, Modal, Badge } from 'react-bootstrap';
import { Calendar, momentLocalizer, dateFnsLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './posts';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
const locales = {
    'en-US': require('date-fns/locale/en-US'),
};
// let allViews = Object.keys(Views).map((k) => Views[k]);

// const localizer = momentLocalizer(moment);
const allViews = ['month', 'day'];
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
function Event({ event }) {
    return (
        <span
            onClick={() => {
                alert(event.id);
            }}
        >
            <strong>{event.title}</strong>
            {/* {event.desc && ':  ' + event.desc} */}
        </span>
    );
}

function EventAgenda({ event }) {
    return (
        <span>
            <em style={{ color: 'magenta' }}>{event.title}</em>
            {/* <p>{event.desc}</p> */}
        </span>
    );
}
const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue',
        },
    });
const customSlotPropGetter = (date) => {
    if (date.getDate() === 7 || date.getDate() === 15)
        return {
            className: 'special-day',
        };
    else return {};
};
const post = {
    type: 'EVENT',
    title: 'Lorem ipsum dolor sit amet, conseur adipiscing elit.',
    description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mi neque, euismod a odio in, iaculis laoreet lectus. Morbi imperdiet porttitor leo sed lacinia. Cras volutpat lectus nec magna sollicitudin ultrices. Vivamus vel molestie sem, vitae aliquam orci. Aliquam viverra diam at convallis laoreet. Maecenas sed aliquet tellus. Praesent imperdiet pulvinar orci, vitae ultricies mauris posuere vel. Fusce id ex magna.
    
    Aenean dapibus leo vitae condimentum tincidunt. Maecenas non erat eget dolor interdum sollicitudin. Aenean sed neque id arcu posuere faucibus nec ut tellus. Mauris sed risus eros. Pellentesque tincidunt risus a mi semper, at facilisis dui tincidunt. Mauris accumsan magna in nunc semper, ac auctor urna gravida. Donec feugiat dignissim magna. Nunc tempus luctus rhoncus. Suspendisse interdum vitae nunc vel faucibus. Nulla varius, nisi sit amet luctus maximus, urna velit luctus metus, ut pulvinar augue est sit amet augue. Phasellus venenatis suscipit eros, vitae scelerisque justo iaculis non. In in lectus congue risus vestibulum efficitur eu sit amet nisl. Sed varius nulla nec efficitur semper. In mattis magna vitae vehicula varius. Etiam mauris purus, facilisis mollis ex sit amet, interdum efficitur augue. Etiam dapibus vestibulum lacus vel pellentesque.
    
    Nunc eu lorem scelerisque nisi ornare interdum consequat nec libero. Phasellus ante quam, bibendum eu mattis vel, sollicitudin at mauris. Etiam dapibus a dui placerat suscipit. Donec blandit iaculis purus vitae fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis semper mattis. Sed eleifend augue in sem auctor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
};
export default class BookingCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postModal: false,
            post: {},
        };
    }
    handlePostModal = (modalFlag) => {
        this.setState({
            postModal: modalFlag,
        });
    };
    handleChangePost = (post) => {
        this.setState({
            post: post,
        });
    };
    setDates = () => {
        events.map((event) => {
            return events.push({
                start: new Date(event.start),
                end: new Date(event.end),
                title: `${event.title})`,
                allDay: true,
            });
        });
        return events;
    };
    eventStyleGetter = (event, start, end, isSelected) => {
        var backgroundColor = '#' + event.hexColor;
        var style = {
            backgroundColor: 'red',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
        };
        return {
            style: style,
        };
    };

    render() {
        return (
            <Container className="parent-page">
                <Modal
                    style={{ zIndex: 10000 }}
                    show={this.state.postModal}
                    onHide={() => {
                        this.handlePostModal(false);
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>POST DETAILS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <h4>
                                    <Badge variant="dark">EVENT</Badge>
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h4>{post.title}</h4>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
                <Row>
                    <Col>
                        <Calendar
                            onShowMore={(events, date) => console.log(date)}
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
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
                                this.handleChangePost(e);
                                this.handlePostModal(true);
                            }}
                            eventPropGetter={this.eventStyleGetter}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

// const ColoredDateCellWrapper = ({ children }) =>
//     React.cloneElement(React.Children.only(children), {
//         style: {
//             backgroundColor: 'lightblue',
//         },
//     });
// const PostCalenderView = (props) => {
//     return (
//         <Container className="parent-page">
//             POST CALENDER VIEW
//             {/* <br />
//             <Calendar
//                 events={events}
//                 views={allViews}
//                 step={60}
//                 showMultiDayTimes
//                 // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
//                 defaultDate={new Date(2015, 3, 1)}
//                 components={{
//                     timeSlotWrapper: ColoredDateCellWrapper,
//                 }}
//                 localizer={props.localizer}
//             /> */}
//         </Container>
//     );
// };
// export default PostCalenderView;
