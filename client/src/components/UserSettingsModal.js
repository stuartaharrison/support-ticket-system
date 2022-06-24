import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap"; 
import FormInput from "./FormInput";
import SelectDropdown from "./SelectDropdown";
import { useFetchOfficesQuery } from "../redux/apis/officesApi";

const UserSettingsModal = ({ user, setUser, createUserMutation, updateUserMutation }) => {
    const [createUser] = createUserMutation();
    const [patchUser] = updateUserMutation();
    const [operations, setOperations] = useState([]);
    const [newPassword, setNewPassword] = useState('');
    const { data: offices, isLoading } = useFetchOfficesQuery();

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
        if (user && user.hasOwnProperty('_id')) {
            // update the office details
            patchUser({ id: user._id, newPassword, operations }).unwrap().then(_ => {
                setOperations([]);
                setUser(null);
                setNewPassword('');
            });
        }
        else {
            // create new office
            createUser({ ...user, password: newPassword }).unwrap().then(_ => {
                setOperations([]);
                setUser(null);
                setNewPassword('');
            });
        }
    };

    return (
        <Modal show={user} onHide={() => setUser(null)}>
            <Modal.Header closeButton>
                {user && user.hasOwnProperty('_id') ? `Edit: ${user.username}` : 'Create a new User'}
            </Modal.Header>
            <Modal.Body>
                {user && (
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <FormInput 
                                    label="Username"
                                    obj={user}
                                    setObj={setUser}
                                    operations={operations}
                                    setOperations={setOperations}
                                    valueProp="username"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <SelectDropdown
                                    label="Type"
                                    value={user.userType}
                                    options={[
                                        { label: 'Admin', value: 'admin' },
                                        { label: 'Standard User', value: 'user' },
                                        { label: 'Technician', value: 'technician' }
                                     ]}
                                     onChange={(record) => {
                                        setUser({
                                            ...user,
                                            userType: record.value
                                        });
                                     }}
                                />
                            </Col>
                            <Col>
                                <SelectDropdown
                                    label="Office"
                                    value={user.defaultOffice}
                                    options={buildOfficeOptions()}
                                    onChange={(record) => {
                                        setUser({
                                            ...user,
                                            defaultOffice: record.value
                                        });
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <FormInput
                                    type="email"
                                    label="Email Address"
                                    obj={user}
                                    setObj={setUser}
                                    operations={operations}
                                    setOperations={setOperations}
                                    valueProp="email"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <FormInput
                                    label="Forenames"
                                    obj={user}
                                    setObj={setUser}
                                    operations={operations}
                                    setOperations={setOperations}
                                    valueProp="forenames"
                                />
                            </Col>
                            <Col>
                                <FormInput
                                    label="Surname"
                                    obj={user}
                                    setObj={setUser}
                                    operations={operations}
                                    setOperations={setOperations}
                                    valueProp="surname"
                                />
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                            <Form.Check
                                label="Is Active"
                                checked={user && user.isActive}
                                onChange={() => {
                                    setUser({
                                        ...user,
                                        isActive: !user.isActive
                                    })
                                }}
                            />
                        </div>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setUser(null)}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                    {user && user.hasOwnProperty('_id') ? 'Save Changes' : 'Create'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserSettingsModal;