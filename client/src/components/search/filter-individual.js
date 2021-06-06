import React from 'react';
import Select from 'react-select';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
const FilterIndividual = (props) => {
    const submitting = props.submitting;

    console.log(props);
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                props.handleOnApplyFilter();
            }}
        >
            <label>Individual Name</label>
            <input className="form-control" type="text" value={props.filter.name} onChange={(e) => props.changeFilter('name', e.target.value)} />
            <br />
            <label>Impact Area</label>
            <Select
                onChange={(value) => props.changeFilter('impactAreas', value)}
                isMulti={true}
                options={props.impactAreas}
                value={props.filter.impactAreas}
            />
            <br />
            <label>Skills</label>
            <Select onChange={(value) => props.changeFilter('skills', value)} isMulti={true} options={props.skills} value={props.filter.skills} />
            <br />
            <br />
            <Button
                type="button"
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
                type="submit"
                size="sm"
                // onClick={() => {
                //     props.handleOnApplyFilter();
                // }}
                disabled={submitting}
            >
                Search
            </Button>
            <div style={{ height: 25 }} />
        </form>
    );
};
export default FilterIndividual;
