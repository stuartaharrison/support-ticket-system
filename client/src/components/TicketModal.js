import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import DateInput from "./DateInput";
import FormInput from "./FormInput";
import SelectDropdown from "./SelectDropdown";
import { useGetSessionQuery } from "../redux/apis/authApi";
import { useFetchOfficesQuery } from "../redux/apis/officesApi";
import { useListUsersQuery } from "../redux/apis/usersApi";

const markdownConverter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

const TicketModal = ({ ticket, setTicket, createTicketMutation, updateTicketMutation }) => {
    const [createTicket] = createTicketMutation();
    const [patchTicket] = updateTicketMutation();
    const [operations, setOperations] = useState([]);
    const [mdeSelectedTab, setMdeSelectedTab] = useState("write");
    const { data: session } = useGetSessionQuery();
    const { data: offices, isLoading: isFetchingOfficeList } = useFetchOfficesQuery();
    const { data: userOptions, isLoading: isLoadingUserOptions } = useListUsersQuery();

    const buildOfficeOptions = () => {
        let retval = [{ label: 'None', value: null }];
        if (!offices || offices.length === 0) {
            return retval;
        }

        for (var i = 0; i < offices.length; i++) {
            retval.push({
                label: offices[i].officeName,
                value: offices[i]._id
            });
        }

        return retval.sort((a, b) => a.label.localeCompare(b.label));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ticket && ticket.hasOwnProperty('_id')) {
            // update the office details
            patchTicket({ id: ticket._id, operations }).unwrap().then(_ => {
                setOperations([]);
                setTicket(null);
            });
        }
        else {
            // create new office
            createTicket(ticket).unwrap().then(_ => {
                setOperations([]);
                setTicket(null);
            });
        }
    };

    return (
        <Modal size="lg" show={ticket} onHide={() => setTicket(null)}>
            <Modal.Header closeButton>
                {ticket && ticket.hasOwnProperty('_id') ? `Edit Ticket (#${ticket._id})` : 'New Ticket' }
            </Modal.Header>
            <Modal.Body>
                {ticket && (
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <FormInput 
                                    label="Title"
                                    obj={ticket}
                                    setObj={setTicket}
                                    operations={operations}
                                    setOperations={setOperations}
                                    valueProp="title"
                                />
                            </Col>
                            {session && session.userType !== 'user' && (
                                <Col>
                                    <SelectDropdown
                                        label="Status"
                                        value={ticket.isCompleted}
                                        options={[
                                            { label: 'Completed', value: true },
                                            { label: 'Not Completed', value: false }
                                        ]}
                                        onChange={(record) => {
                                            setTicket({
                                                ...ticket,
                                                isCompleted: record.value
                                            });
                                        }}
                                    />
                                </Col>
                            )}
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <ReactMde
                                    value={ticket.description}
                                    onChange={(e) => setTicket({
                                        ...ticket,
                                        description: e
                                    })}
                                    selectedTab={mdeSelectedTab}
                                    onTabChange={setMdeSelectedTab}
                                    generateMarkdownPreview={(md) => Promise.resolve(markdownConverter.makeHtml(md))}
                                />
                            </Col>
                        </Row>
                        {session && session.userType !== 'user' && (
                            <React.Fragment>
                                <Row className="mb-3">
                                    <Col>
                                        <SelectDropdown
                                            label="Submitted By"
                                            value={ticket.submittedBy}
                                            options={[
                                                { label: 'None', value: null },
                                                ...userOptions || []
                                            ]}
                                            onChange={(record) => {
                                                setTicket({
                                                    ...ticket,
                                                    submittedBy: record.value
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col>
                                        <SelectDropdown
                                            label="Assigned To"
                                            value={ticket.claimedBy}
                                            options={[
                                                { label: 'None', value: null },
                                                ...userOptions || []
                                            ]}
                                            onChange={(record) => {
                                                setTicket({
                                                    ...ticket,
                                                    claimedBy: record.value
                                                });
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <SelectDropdown
                                            label="Office"
                                            value={ticket.office}
                                            options={buildOfficeOptions()}
                                            onChange={(record) => {
                                                setTicket({
                                                    ...ticket,
                                                    office: record.value
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col>
                                        <DateInput
                                            label="Deadline" 
                                            obj={ticket}
                                            setObj={setTicket}
                                            operations={operations}
                                            setOperations={setOperations}
                                            valueProp="deadlineDate"
                                        />
                                    </Col>
                                </Row>
                            </React.Fragment>
                        )}
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setTicket(null)}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                    {ticket && ticket.hasOwnProperty('_id') ? 'Save Changes' : 'Create'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TicketModal;