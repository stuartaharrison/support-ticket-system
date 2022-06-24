import React from "react";
import { Container } from "react-bootstrap";
import { TicketTable } from "../components"; 
import { useGetSessionQuery } from "../redux/apis/authApi";

const UserTicketsView = () => {
    const { data: session } = useGetSessionQuery();
    const { _id: currentUserId } = session || null;

    return (
        <Container className="mt-3">
            <TicketTable
                condition={{
                    submittedBy: currentUserId
                }}
            /> 
        </Container>
    );
};

export default UserTicketsView;