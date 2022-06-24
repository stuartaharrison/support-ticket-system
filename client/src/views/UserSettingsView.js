import React, { useState } from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryTable, BaseTableDropdown, Breadcrumbs, UserSettingsModal } from "../components";
import { useCreateUserMutation, useFetchUsersQuery, usePatchUserMutation } from "../redux/apis/usersApi";

const UserSettingsView = ({ fetchPollingInterval = 30000 }) => {
    const [user, setUser] = useState(null);

    return (
        <Container className="mt-3">
            <Breadcrumbs />
            <p className="fs-2">Users</p>
            <Row>
                <Col>
                    <Button variant="primary" onClick={() => {
                        setUser({
                            username: '',
                            password: '',
                            userType: 'user',
                            defaultOffice: null,
                            email: '',
                            forenames: null,
                            surname: null,
                            isActive: true
                        });
                    }}>
                        <FontAwesomeIcon icon="fa-user-plus" />&nbsp;New User
                    </Button>
                </Col>
                <Col>
                
                </Col>
            </Row>
            <QueryTable
                columns={[
                    { title: 'Username', value: 'username' },
                    { title: 'Type', value: 'userType' },
                    { 
                        title: 'Office',
                        component: ({ data }) => (
                            <span>{data.office ? data.office.officeName : 'None'}</span>
                        )
                    },
                    { title: 'Email Address', value: 'email' },
                    { 
                        title: '',
                        component: ({ data }) => (
                            <Dropdown align="end">
                                <Dropdown.Toggle as={BaseTableDropdown}>
                                    <FontAwesomeIcon icon="fa-ellipsis" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setUser(data)}>
                                        <FontAwesomeIcon icon="fa-pen-to-square" />&nbsp;&nbsp;Edit
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )
                    }
                ]}
                query={useFetchUsersQuery}
                refreshInterval={fetchPollingInterval}
            />
            <UserSettingsModal
                user={user}
                setUser={setUser}
                createUserMutation={useCreateUserMutation}
                updateUserMutation={usePatchUserMutation}
            />
        </Container>
    );
};

export default UserSettingsView;