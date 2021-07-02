import React from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
const SearchMenu = (props) => {
    const submitting = props.submitting;
    console.log('🚀 ~ file: filter-organization.js ~ line 6 ~ SearchMenu ~ submitting', submitting);
    console.log(props);
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                props.handleOnApplyFilter();
            }}
        >
            <label>Organization Name</label>
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
            <label>Organization Type</label>
            <Select
                onChange={(value) => props.changeFilter('organizationTypes', value)}
                isMulti={true}
                options={props.organizationTypes}
                value={props.filter.organizationTypes}
            />
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
export default SearchMenu;
