import { allSearchablePostTypes } from '@Constants/post-types';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
const EventFilter = (props) => {
    console.log(props);
    return (
        <>
            <label>Title</label>
            <input className="form-control" type="text" value={props.filter.title} onChange={(e) => props.changeFilter('title', e.target.value)} />
            <br />
            <label>Post Type</label>
            <Select
                onChange={(value) => props.changeFilter('postTypes', value)}
                isMulti={true}
                options={allSearchablePostTypes}
                value={props.filter.postTypes}
            />
            <br />
            <label>Impact Area</label>
            <Select
                onChange={(value) => props.changeFilter('impactAreas', value)}
                isMulti={true}
                options={props.impactAreas}
                value={props.filter.impactAreas}
            />
            <br />
            <label>Start Date</label>
            <DatePicker
                className="form-control custom-date-picker"
                onChange={(date) => props.changeFilter('startDate', date)}
                selected={props.filter.startDate}
                dateFormat="MM/dd/yyyy"
            />
            <br />
            <br />
            <label>End Date</label>
            <DatePicker
                className="form-control custom-date-picker"
                onChange={(date) => props.changeFilter('endDate', date)}
                selected={props.filter.endDate}
                dateFormat="MM/dd/yyyy"
            />
            <br />
            <br />
            <label>Address</label>
            <input className="form-control" type="text" value={props.filter.fullAddress} onChange={(e) => props.changeFilter('fullAddress', e.target.value)} />
            <br />
            <label>Keyword</label>
            <input
                className="form-control"
                type="text"
                value={props.filter.keyword}
                onChange={(e) => {
                    props.changeFilter('keyword', e.target.value);
                }}
            />
            <br />
            <Form>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Show Only Top Need"
                        checked={props.filter.topNeed}
                        onChange={() => {
                            props.changeFilter('topNeed', !props.filter.topNeed);
                        }}
                    />
                </Form.Group>
            </Form>
            <div style={{ height: 50 }} />
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => {
                    props.resetFilter();
                }}
            >
                Reset
            </Button>
            &nbsp;
            <Button
                size="sm"
                onClick={() => {
                    props.handleOnApplyFilter();
                }}
            >
                Search
            </Button>
            <div style={{ height: 25 }} />
        </>
    );
};
export default EventFilter;
