import validator from "simple-react-validator";

export default (formFieldValues) => {
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