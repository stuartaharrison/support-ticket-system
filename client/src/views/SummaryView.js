import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TicketList, TicketSummary } from "../components";
import { useGetSessionQuery } from "../redux/apis/authApi";

const SummaryView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [futureDate, setFutureDate] = useState(new Date(new Date().setHours(currentDate.getHours() + 6)));
    const { data: session } = useGetSessionQuery();

    return (
        <Container className="mt-3">
            <TicketSummary className="mb-3" />
            <Row>
                <Col>
                    <TicketList
                        title="Overdue" 
                        condition={{ 
                            claimedBy: session._id,
                            isCompleted: false,
                            deadlineDate: `<${currentDate.toString()}`
                        }} 
                    />
                </Col>
                <Col>
                    <TicketList 
                        title="Due in 6 hours"
                        condition={{
                            claimedBy: session._id,
                            isCompleted: false,
                            deadlineBetween: `${currentDate.toString()}|${futureDate.toString()}`
                        }} 
                    />
                </Col>
                <Col>
                    <TicketList 
                        title="Future Tickets"
                        condition={{
                            claimedBy: session._id,
                            isCompleted: false,
                            deadlineDate: `>=${futureDate.toString()}`
                        }} 
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default SummaryView;