import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
const FilterIndividual = (props) => {
    const submitting = props.submitting;
    const CheckBoxRender = (key, label) => {
        return (
            <Form.Group controlId={'formBasicCheckbox_' + key}>
                <Form.Check
                    type="checkbox"
                    label={label}
                    checked={props.filter[key]}
                    onChange={() => {
                        props.changeFilter(key, !props.filter[key]);
                    }}
                />
            </Form.Group>
        );
    };
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
            <Form>
                {CheckBoxRender('onlyFollowers', 'Only Followers')}
                {/*{CheckBoxRender('onlyInteractedWithPosts', 'Only Interacted With My Posts')} */}
                {CheckBoxRender('onlyLookingForVolunteering', 'Only Looking For Volunteerings')}
                {CheckBoxRender('onlyLookingForProject', 'Only Looking For Projects')}
                {CheckBoxRender('onlyLookingForMembership', 'Only Looking For memberships')}
            </Form>
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
