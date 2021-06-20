import React, { useEffect, useState } from 'react';
import CultivationForm from '../../components/cultivation/cultivation-form';
import * as RoutePaths from '../../constants/route-paths';
import { reduxForm, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import LoadingAnim from '../../components/form_template/loading-anim';
import { createCultivation } from '../../actions/cultivation-action';
const CreateCultivation = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        const getInitialInfo = (postId) => {
            setLoading(true);

            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id) {
            console.log(user);
            setUserId(user._id);
            const url = window.location.pathname;
            if (url.split('/')[2] === 'edit') {
                setEditMode(true);
            } else {
            }
        }
    }, [props.auth]);
    const onSubmit = (values) => {
        const cultivation = {
            ...values,
            creatorId: userId,
        };
        props.dispatch(createCultivation(cultivation));
    };
    if (loading) return <LoadingAnim />;
    else
        return (
            <CultivationForm
                editMode={editMode}
                handleOnSubmit={props.handleSubmit((post) => {
                    onSubmit(post);
                })}
            />
        );
};
const mapStateToProps = (state) => {
    return {};
};
// export default connect(mapStateToProps, null)(CreateCultivation);
export default connect(
    mapStateToProps,
    null,
)(
    reduxForm({
        form: 'CreateCultivation',
        enableReinitialize: true,
    })(CreateCultivation),
);
