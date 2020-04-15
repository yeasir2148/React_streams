import React from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux';
// import _ from "lodash";
import validate from "../../validator";
import { updateStream } from "../../actions/streamActions";

class StreamEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    renderInput = (fieldProps) => {
        const className = `field ${fieldProps.meta.touched && fieldProps.meta.error ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{fieldProps.input.name}</label>
                <input type="text" {...fieldProps.input } autoComplete="off"/>
                {fieldProps.meta.touched && fieldProps.meta.error && <span>{fieldProps.meta.error}</span>}
            </div>
        )
    }

    onFormSubmit = async (newFieldValues) => {
        let validationResult = validate(newFieldValues);

        if(!Object.entries(validationResult).length) {
            let response = this.props.updateStream(this.props.streamToEdit, newFieldValues);
            response.then(() => {
                this.props.history.push('/');
            }, () => {
                console.log('unable to update record');
            });
        }
    }

    render() {
        return (
            <>
                <div className="ui small header">Edit stream</div>
                <form className="ui form" onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                    <Field name="title" component={this.renderInput}></Field>
                    <Field name="description" component={this.renderInput}></Field>
                    <button className="ui button primary" disabled={!this.props.valid}>submit</button>
                </form>
            </>
        )
    }
}

let formRedux = reduxForm({
    form: 'editStream',
    validate
})(StreamEdit);

let mapStateToProps = ({streams}, {location: {state: {streamId}}}) => {
    return {
        streamToEdit: streamId,
        initialValues: streams[streamId]
    }
}

let mapDispatchToProps = {
    updateStream
}

export default connect(mapStateToProps, mapDispatchToProps)(formRedux);