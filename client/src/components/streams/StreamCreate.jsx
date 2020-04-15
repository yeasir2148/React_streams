import React from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import validator from "simple-react-validator";
import {createStream} from "../../actions/streamActions";

class StreamCreate extends React.Component {
    constructor(props) {
        super(props);
    }

    renderInput = (fieldProps) => {
        const className = `field ${fieldProps.meta.touched && fieldProps.meta.error ? 'error' : ''}`
        return (
            <div className={className}>
                <label>Enter {fieldProps.input.name}</label>
                <input { ...fieldProps.input } autoComplete="off"/>
                {fieldProps.meta.touched && fieldProps.meta.error && <span>{fieldProps.meta.error}</span>}
            </div>
        )
    }

    onFormSubmit = async (formFieldValues) => {
        // console.log(formFieldValues);
        let validationResult = validate(formFieldValues);
        if(!Object.entries(validationResult).length) {
            formFieldValues.userId = this.props.userId;
            let res = await this.props.createStream(formFieldValues);
            this.props.reset();
        }
    }

    render() {
        return (
            <>
                <div className="ui small header">Create stream</div>
                <form className="ui form" onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                    <Field name="title" component={this.renderInput}></Field>
                    <Field name="description" component={this.renderInput}></Field>
                    <button className="ui button primary" disabled={!this.props.valid}>submit</button>
                </form>
            </>
        )
    }
}

const validate = (formFieldValues) => {
    let errors = {};
    let simpleValidator = new validator();
    if(!simpleValidator.check(formFieldValues.title, 'required|min:3')) {
        errors.title = 'invalid title';
    }
    if(!simpleValidator.check(formFieldValues.description, 'required|min:3')) {
        errors.description = 'invalid description';
    }

    return errors;
}

const mapDispatchToProps = {
    createStream
}

const formWrapped = reduxForm({
    form: 'createStream',
    validate
})(StreamCreate);

const mapStateToProps = (currentState) => {
    return { userId: currentState.auth.user.googleUser ? currentState.auth.user.googleUser.getBasicProfile().getId() : null };
}

export default connect(
    mapStateToProps,
    // null,
    mapDispatchToProps
)(formWrapped);