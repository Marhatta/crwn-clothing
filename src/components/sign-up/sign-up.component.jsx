import React,{Component} from 'react';
import { connect } from 'react-redux';

import FormInput from '../formInput/formInput.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';
import { signUpStart } from '../../redux/user/user.actions';

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName,email,password,confirmPassword} = this.state;
        const {signUpStart} = this.props;

        if(password !== confirmPassword){
            alert("Passwords does not match");
            return;
        }

        signUpStart({email,password,displayName});
    }

    handleChange = event => {
        const {name,value} = event.target;

        this.setState({[name]:value});
    }

    render(){
        const {displayName,email,password,confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign Up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={this.handleChange}
                    label='Name'
                    required 
                    />

                    <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    label='Email'
                    required 
                    />

                    <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                    label='Password'
                    required 
                    />

                    <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label='ConfirmPassword'
                    required 
                    />
                    <CustomButton type='submit' >SIGN UP</CustomButton>   
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null,mapDispatchToProps)(SignUp);