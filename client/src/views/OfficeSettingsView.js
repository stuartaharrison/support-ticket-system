import React, { useState } from "react";
import { Button, Container, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BaseTable, BaseTableDropdown, Breadcrumbs, OfficeSettingsModal } from "../components";
import { useCreateOfficeMutation, useFetchOfficesQuery, usePatchOfficeMutation } from "../redux/apis/officesApi";

const OfficeSettingsView = ({ fetchPollingInterval = 30000 }) => {
    // refetch the list of offices every 30 seconds
    const [office, setOffice] = useState(null);
    const { data, error, isLoading } = useFetchOfficesQuery(null, {
        pollingInterval: fetchPollingInterval
    });

    return (
        <Container className="mt-3">
            <Breadcrumbs />
            <p className="fs-2">Offices</p>
            <div className="d-flex">
                <Button variant="primary" onClick={() => {
                    setOffice({
                        officeName: ''
                    });
                }}>
                   <FontAwesomeIcon icon="fa-circle-plus" />&nbsp;Add
                </Button>
            </div>
            <BaseTable
                columns={[
                    { title: 'Name', value: 'officeName' },
                    {
                        title: '',
                        component: ({ data }) => (
                            <Dropdown align="end">
                                <Dropdown.Toggle as={BaseTableDropdown}>
                                    <FontAwesomeIcon icon="fa-ellipsis" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setOffice(data)}>
                                        <FontAwesomeIcon icon="fa-pen-to-square" />&nbsp;&nbsp;Edit
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )
                    }
                ]}
                data={data}
                errorMsg={error}
                isLoading={isLoading}
            />
            <OfficeSettingsModal
                office={office}
                setOffice={setOffice}
                createOfficeMutation={useCreateOfficeMutation}
                updateOfficeMutation={usePatchOfficeMutation}
            />
        </Container>
    );
};

export default OfficeSettingsView;