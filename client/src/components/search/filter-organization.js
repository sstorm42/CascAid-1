import React from 'react';
import Select from 'react-select';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
const SearchMenu = (props) => {
    console.log(props);
    return (
        <>
            <label>Organization Name</label>
            <input className="form-control" type="text" value={props.filter.name} onChange={(e) => props.changeFilter('name', e.target.value)} />
            <br />
            <label>Impact Area</label>
            <Select onChange={(value) => props.changeFilter('impactAreas', value)} isMulti={true} options={props.impactAreas} value={props.filter.impactAreas} />
            <br />
            <label>Organization Type</label>
            <Select onChange={(value) => props.changeFilter('organizationTypes', value)} isMulti={true} options={props.organizationTypes} value={props.filter.organizationTypes} />
            <br />
            <label>Service Area</label>
            <input
                className="form-control"
                type="text"
                value={props.filter.serviceArea}
                onChange={(e) => {
                    props.changeFilter('serviceArea', e.target.value);
                }}
            />
            <br />
            <label>Organization Address</label>
            <input
                className="form-control"
                type="text"
                value={props.filter.address}
                onChange={(e) => {
                    props.changeFilter('address', e.target.value);
                }}
                placeholder="zip code/city/state/country"
            />
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
            <br />
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
export default SearchMenu;
