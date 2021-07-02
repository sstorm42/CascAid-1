import moment from 'moment';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Mention, MentionsInput } from 'react-mentions';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

export const InputRender = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => {
    const className = `form-group row ${touched ? (error ? 'has-danger' : '') : ''}`;

    return (
        <div className={className}>
            <div className="col-sm-4">
                <label className="form-label">{label}</label>
            </div>

            <div className="col-sm-8">
                <input {...input} placeholder={placeholder} type={type} className="form-control" />
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};
export const InputRenderWithLargeLabel = ({ input, label, type, placeholder, min, max, unit, step, meta: { touched, error, warning } }) => {
    const className = `form-group row ${touched ? (error ? 'has-danger' : '') : ''}`;

    return (
        <div className={className}>
            <div className="col-sm-6">
                <label className="form-label">{label}</label>
            </div>

            <div className="col-sm-6">
                {type === 'number' ? (
                    <div className="input-group">
                        <input {...input} placeholder={placeholder} type={type} className="form-control" min={min} max={max} unit={unit} step={step} />
                        {unit && (
                            <div className="input-group-append">
                                <span className="input-group-text">{unit}</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <input {...input} placeholder={placeholder} type={type} className="form-control" />
                )}
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};
export const TextRender = ({ input, label, placeholder, type, col1, col2, meta: { touched, error, warning } }) => {
    const className = `form-group row ${touched && error ? 'has-danger' : 'has-success'}`;
    return (
        <div className={className}>
            <label className={'col-sm-' + col1}>{label}</label>
            <div className={'col-sm-' + col2}>
                <textarea {...input} placeholder={placeholder} rows="5" className="form-control" />
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};
export const CheckBoxRender = ({ input, label, type, placeholder, col1, col2, meta: { touched, error, warning } }) => {
    return (
        <div className="form-group row">
            <label className={'col-sm-' + col1}>{label}</label>
            <div className={'col-sm-' + col2}>
                <input {...input} type={type} />
            </div>
        </div>
    );
};
export const InputNumberRender = ({ input, label, type, placeholder, step, min, max, unit, meta: { touched, error, warning } }) => {
    const className = `form-group row ${touched && error ? 'has-danger' : 'has-success'}`;
    return (
        <div className={className}>
            <label className="col-sm-4 col-form-label">{label}</label>
            <div className="col-sm-8">
                <div className="input-group">
                    <input
                        style={{ float: 'left' }}
                        {...input}
                        placeholder={placeholder}
                        step={step}
                        min={min}
                        max={max}
                        type={type}
                        className="form-control"
                    />
                    <span className="InputNumberUnitSpan">{unit}</span>
                </div>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};
export const SaInputRender = ({ input, label, type, placeholder, meta: { asyncValidating, touched, error, warning } }) => {
    const className = `form-group row ${touched ? (error ? 'has-danger' : '') : ''}`;

    return (
        <div style={{ marginBottom: '10px' }} className={className}>
            <label className="col-sm-4 signUpLabel">{label}</label>

            <div className={asyncValidating ? 'async-validating col-sm-8' : 'col-sm-8'}>
                <input {...input} placeholder={placeholder} type={type} className={'form-control ' + input.name} />
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};
export const SelectRender = ({ input, label, placeholder, type, col1, col2, meta: { touched, error }, children }) => {
    const className = `form-group ${touched ? (error ? 'has-danger' : '') : ''}`;
    return (
        <Row className={className}>
            <label className={'col-sm-' + col1}>{label}</label>
            <Col sm={col2}>
                <select {...input} className="form-control">
                    {children}
                </select>
                {touched && error && <span>{error}</span>}
            </Col>
        </Row>
    );
};
export const HalfInputRender = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => {
    return (
        <>
            <input {...input} placeholder={placeholder} type={type} className="form-control half-text-input" />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </>
    );
};

// export const SwitchRender = ({ input, label, type, id, checked, placeholder, meta: { touched, error, warning } }) => {
//     const className = `form-group row ${touched ? (error ? 'has-danger' : '') : ''}`;

//     return (
//         <div className={className}>
//             <div className="col-sm-9">
//                 <label className="form-label">{label}</label>
//             </div>

//             <div className="col-sm-3 custom-control custom-switch">
//                 {/* <input type="checkbox" className="custom-control-input" id={id} checked={checked} /> */}
//                 <input type="checkbox" className="custom-control-input" id="customSwitch1"></input>
//             </div>
//         </div>
//     );
// };
export const SwitchRender = ({ input, label, type, placeholder, id, defaultChecked, meta: { touched, error, warning } }) => {
    return (
        <div className="form-group row">
            <label className="col-sm-6" htmlFor={id}>
                {label}
            </label>
            <div className="col-sm-3 custom-control custom-switch" style={{ marginLeft: 20 }}>
                <input {...input} type="checkbox" className="custom-control-input" id={id} defaultChecked={input.value} />
                <label className="custom-control-label" htmlFor={id}>
                    {/* Toggle this switch element */}
                </label>
            </div>
        </div>
    );
};

export const DatePickerRender = ({ input, label, minDate, selectedDate, setDate, zIndex, meta: { touched, error, warning } }) => {
    console.log(input.value);
    const date = moment(input.value).isValid();
    selectedDate = date ? new Date(input.value) : '';
    console.log('🚀 ~ file: input-render.js ~ line 157 ~ DatePickerRender ~ selectedDate', selectedDate);
    input.value = selectedDate;
    return (
        <div className="form-group row">
            <label className="col-sm-4">{label}</label>
            <div className="col-sm-8 date-picker-div" style={{ zIndex: zIndex }}>
                <DatePicker className="form-control custom-date-picker" {...input} selected={selectedDate} minDate={minDate} dateFormat="MM/dd/yyyy" />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );
};

export const CreatableMultiSelectRender = ({ input, label, placeholder, options, col1, col2, zIndex, meta: { touched, error }, children }) => {
    const className = `form-group ${touched ? (error ? 'has-danger' : '') : ''}`;

    return (
        <Row className={className}>
            <label className={'col-sm-' + col1}>{label}</label>
            <Col sm={col2} style={{ zIndex: zIndex }}>
                <CreatableSelect
                    {...input}
                    onChange={(value) => input.onChange(value)}
                    onBlur={() => input.onBlur(input.value)}
                    options={options}
                    isMulti={true}
                    placeholder={placeholder}
                />
                {touched && error && <span>{error}</span>}
            </Col>
        </Row>
    );
};
export const MultiSelectRender = ({ input, label, placeholder, options, col1, col2, zIndex, meta: { touched, error }, children }) => {
    const className = `form-group ${touched ? (error ? 'has-danger' : '') : ''}`;

    return (
        <Row className={className}>
            <label className={'col-sm-' + col1}>{label}</label>
            <Col sm={col2} style={{ zIndex: zIndex }}>
                <Select {...input} onChange={(value) => input.onChange(value)} onBlur={() => input.onBlur(input.value)} options={options} isMulti={true} />
                {touched && error && <span>{error}</span>}
            </Col>
        </Row>
    );
};
export const DateTimePickerRender = ({ input, label, minDate, selectedDate, col1, col2, setDate, zIndex, meta: { touched, error, warning } }) => {
    console.log(input.value);
    const date = moment(input.value).isValid();
    selectedDate = date ? new Date(input.value) : '';
    console.log('🚀 ~ file: input-render.js ~ line 157 ~ DatePickerRender ~ selectedDate', selectedDate);
    input.value = selectedDate;
    return (
        <div className="form-group row">
            <label className={'form-label col-sm-' + col1}>{label}</label>
            <div className={'col-sm-' + col2} style={{ zIndex: zIndex }}>
                <DatePicker
                    showTimeSelect
                    className="form-control custom-date-picker"
                    {...input}
                    selected={selectedDate}
                    minDate={minDate}
                    dateFormat="MM/dd/yyyy h:mm aa"
                />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );
};

let style = {
    input: {
        overflow: 'auto',
        height: 70,
    },
    highlighter: {
        boxSizing: 'border-box',
        overflow: 'hidden',
        height: 70,
    },
};
export const MentionAreaRender = ({ input, label, placeholder, type, col1, col2, suggestionList, meta: { touched, error, warning } }) => {
    const className = `form-group row ${touched && error ? 'has-danger' : 'has-success'}`;
    return (
        <div className={className}>
            <label className={'col-sm-' + col1}>{label}</label>
            <div className={'col-sm-' + col2}>
                <MentionsInput {...input} style={style} a11ySuggestionsListLabel={'Suggested mentions'}>
                    <Mention
                        markup="@[__display__](user:__id__)"
                        trigger="@"
                        data={suggestionList}
                        renderSuggestion={(suggestion, search, highlightedDisplay) => <div className="user">{highlightedDisplay}</div>}
                        style={{
                            backgroundColor: '#cee4ee',
                        }}
                    />
                </MentionsInput>
                {/* <textarea placeholder={placeholder} rows="5" className="form-control" /> */}
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};
