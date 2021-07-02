import React from 'react';
import { Table, Image, Button, Row, Col, Badge } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { DeleteButtonRender, UpArrowButtonRender, DownArrowButtonRender } from '../form_template/buttons-render';
const RequiredItemList = (props) => {
    const requiredItems = props.requiredItems;
    if (requiredItems && requiredItems.length > 0) {
        return (
            <>
                <Row>
                    <Col>
                        <h5>All Required Items</h5>
                    </Col>
                    <Col className="right-align">
                        <Badge pill variant="light" className="badge-single ">
                            Remember: Item without name, requirement and needed by valid date shall not be saved.
                        </Badge>
                    </Col>
                </Row>

                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Requirement</th>
                            <th>Needed By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requiredItems.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        <input
                                            className="form-control image-description-input"
                                            type="text"
                                            onChange={(e) => {
                                                props.handleItemEdit(i, 'name', e.target.value);
                                            }}
                                            value={item.name}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="form-control image-description-input"
                                            type="text"
                                            onChange={(e) => {
                                                props.handleItemEdit(i, 'requirement', e.target.value);
                                            }}
                                            value={item.requirement}
                                        />
                                    </td>
                                    <td>
                                        <DatePicker
                                            className="form-control custom-date-picker"
                                            onChange={(date) => props.handleItemEdit(i, 'neededBy', date)}
                                            selected={new Date(item.neededBy)}
                                            dateFormat="MM/dd/yyyy"
                                        />
                                    </td>
                                    <td className="block">
                                        <DeleteButtonRender
                                            onClick={() => {
                                                props.handleItemDelete(i);
                                            }}
                                        />
                                        {i > 0 && (
                                            <>
                                                &nbsp;
                                                <UpArrowButtonRender
                                                    onClick={() => {
                                                        props.handleItemPosition(i, 'up');
                                                    }}
                                                />
                                            </>
                                        )}
                                        &nbsp;
                                        {i < requiredItems.length - 1 && (
                                            <DownArrowButtonRender
                                                onClick={() => {
                                                    props.handleItemPosition(i, 'down');
                                                }}
                                            />
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </>
        );
    } else {
        return <h5>No Required Item Added</h5>;
    }
};
export default RequiredItemList;
