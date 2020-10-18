import { Component } from 'react';
import Joi from 'joi-browser';

class Form extends Component {
    state = { 
        data: {},
        errors: {}
     }

     validateProperty = ({name, value}) => {
        // if (name === 'productCategory') { 
        //     if (value.trim() === '') return 'required category';
        //  }
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message: null;
    };
    
    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, {
            abortEarly: false
        }); 
        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message
        return errors;
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name];

        const data = {...this.state.data}
        data[input.name] = input.value;
        
        this.setState({ data, errors })
    };


    handleSubmit = e => {
        e.preventDefault();
        
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return; 
        
        this.doSubmit();
    };


}
 
export default Form;