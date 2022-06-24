import React from "react";
import moment from "moment";
import Moment from "react-moment";
import ReactTimeAgo from "react-time-ago";

const TicketDetails = ({ ticket, isFuture = false }) => {
    const deadlineDate = moment(ticket.deadlineDate);
    const submittedDate = moment(ticket.submittedDate);
    
    console.log('ticket?', {
        ticket,
        deadlineDate,
        submittedDate
    });

    return (
        <React.Fragment>
            <p className="fs-5">{ticket.title}</p>
            <p className="fs-6">Submitted on: <Moment format="dddd wo MMMM YYYY">{submittedDate}</Moment></p>
            <p className="fs-6">Due <ReactTimeAgo future={isFuture} date={deadlineDate} /></p>
        </React.Fragment>
    );
};

const TicketItem = ({ ticket, as: Component }) => {
    if (Component) {
        return (
            <Component>
                <TicketDetails ticket={ticket} />
            </Component>
        );
    }
    else {
        return (
            <div>
                <TicketDetails ticket={ticket} />
            </div>
        );
    }
};

export default TicketItem;