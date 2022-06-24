import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TicketModal } from "../components";
import { useGetSessionQuery, useLogoutSessionMutation } from "../redux/apis/authApi";
import { useCreateTicketMutation, useCountTicketsQuery, usePatchTicketMutation } from "../redux/apis/ticketsApi";

const Header = () => {
    const [ticket, setTicket] = useState(null);
    const [logoutSession] = useLogoutSessionMutation();
    const { data: session } = useGetSessionQuery();
    const { data: ticketCount } = useCountTicketsQuery();

    const handleLogoutAsync = async () => {
        await logoutSession().unwrap().then(_ => {
            window.location.reload();
        }).catch(_ => {});
    };

    return (
        <React.Fragment>
            <TicketModal 
                ticket={ticket} 
                setTicket={setTicket}
                createTicketMutation={useCreateTicketMutation}
                updateTicketMutation={usePatchTicketMutation}
            />
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" fixed="top">
                <Container fluid>
                    <Navbar.Brand>Ticket System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">
                                Dashboard
                            </Nav.Link>
                            {session && (
                                <Nav.Link as={Link} to="/tickets">
                                    {session.userType === 'user' && (<span>My Tickets</span>)}
                                    {session.userType === 'user`' && ticketCount && (<span>&nbsp;({ticketCount.totalUserOpenTickets})</span>)}

                                    {session.userType !== 'user' && (<span>Tickets</span>)}
                                    {session.userType !== 'user' && ticketCount && (<span>&nbsp;({ticketCount.totalUnclaimed})</span>)}
                                </Nav.Link>
                            )}
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={(e) => {
                                e.preventDefault();
                                setTicket({ 
                                    title: '',
                                    description: '',
                                    submittedBy: session ? session._id : null,
                                    submittedDate: new Date(),
                                    deadlineDate: new Date(),
                                    isCompleted: false,
                                    office: session ? session.officeId : null,
                                    claimedBy: session ? session._id : null,
                                    claimedOnDate: new Date()
                                });
                            }}>
                                <FontAwesomeIcon icon="fa-file-circle-plus" />&nbsp;New Ticket
                            </Nav.Link>
                            <NavDropdown title={`${session ? session.displayName : 'User'}`} align="end">
                                {session && session.userType === 'admin' && (
                                    <React.Fragment>
                                        <NavDropdown.Item as={Link} to="/settings">
                                            System Settings
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />  
                                    </React.Fragment>
                                )}
                                <NavDropdown.Item onClick={handleLogoutAsync}>Signout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
};

export default Header;