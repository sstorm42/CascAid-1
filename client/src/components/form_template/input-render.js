import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export const InputRender = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => {
    const Classname = `form-group row ${touched ? (error ? 'has-danger' : '') : ''}`;

    return (
        <div className={Classname}>
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
    const Classname = `form-group row ${touched ? (error ? 'has-danger' : '') : ''}`;

    return (
        <div className={Classname}>
            <div className="col-sm-6">
                <label className="form-label">{label}</label>
            </div>

            <div className="col-sm-6">
                {type === 'number' ? (
                    <div className="input-group">
                        <input {...input} placeholder={placeholder} type={type} className="form-control" min={min} max={max} unit={unit} step={step} />
                        <div className="input-group-append">
                            <span className="input-group-text">{unit}</span>
                        </div>
                    </div>
                ) : (
                    <input {...input} placeholder={placeholder} type={type} className="form-control" />
                )}
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};
export const TextRender = ({ input, label, placeholder, type, meta: { touched, error, warning } }) => {
    const Classname = `form-group row ${touched && error ? 'has-danger' : 'has-success'}`;
    return (
        <div className={Classname}>
            <label className="col-sm-3">{label}</label>
            <div className="col-sm-9">
                <textarea {...input} placeholder={placeholder} rows="5" className="form-control" />
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};
export const CheckBoxRender = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => {
    return (
        <div className="form-group row">
            <label className="col-sm-3">{label}</label>
            <div className="col-sm-8">
                <input {...input} type={type} />
            </div>
        </div>
    );
};
export const InputNumberRender = ({ input, label, type, placeholder, step, min, max, unit, meta: { touched, error, warning } }) => {
    const className = `form-group row ${touched && error ? 'has-danger' : 'has-success'}`;
    return (
        <div className={className}>
            <label className="col-sm-3 col-form-label">{label}</label>
            <div className="col-sm-8">
                <div className="input-group">
                    <input style={{ float: 'left' }} {...input} placeholder={placeholder} step={step} min={min} max={max} type={type} className="form-control" />
                    <span className="InputNumberUnitSpan">{unit}</span>
                </div>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};
export const SaInputRender = ({ input, label, type, placeholder, meta: { asyncValidating, touched, error, warning } }) => {
    const Classname = `form-group row ${touched ? (error ? 'has-danger' : '') : ''}`;

    return (
        <div style={{ marginBottom: '10px' }} className={Classname}>
            <label className="col-sm-4 signUpLabel">{label}</label>

            <div className={asyncValidating ? 'async-validating col-sm-8' : 'col-sm-8'}>
                <input {...input} placeholder={placeholder} type={type} className={'form-control ' + input.name} />
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};
export const SelectRender = ({ input, label, placeholder, type, meta: { touched, error }, children }) => {
    const Classname = `form-group row ${touched ? (error ? 'has-danger' : '') : ''}`;
    return (
        <div className={Classname}>
            <label className="col-sm-6">{label}</label>
            <div className="col-sm-6">
                <select {...input} className="form-control">
                    {children}
                </select>
                {touched && error && <span>{error}</span>}
            </div>
        </div>
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
//     const Classname = `form-group row ${touched ? (error ? 'has-danger' : '') : ''}`;

//     return (
//         <div className={Classname}>
//             <div className="col-sm-9">
//                 <label className="form-label">{label}</label>
//             </div>

//             <div className="col-sm-3 custom-control custom-switch">
//                 {/* <input type="checkbox" class="custom-control-input" id={id} checked={checked} /> */}
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
                <input {...input} type="checkbox" className="custom-control-input" id={id} defaultChecked={true} />
                <label className="custom-control-label" htmlFor={id}>
                    {/* Toggle this switch element */}
                </label>
            </div>
        </div>
    );
};

export const DatePickerRender = ({ input, label, minDate, selectedDate, setDate, meta: { touched, error, warning } }) => {
    selectedDate = input.value ? new Date(input.value) : new Date();

    return (
        <div className="form-group row">
            <label className="col-sm-4">{label}</label>
            <div className="col-sm-8 date-picker-div">
                <DatePicker className="form-control custom-date-picker" {...input} selected={selectedDate} minDate={minDate} />
            </div>
        </div>
    );
};
