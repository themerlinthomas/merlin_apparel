import React from 'react';
import './sign-in-n-sign-up.styles.scss';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInSignUpComponent = () => (

    <div className='sign-in-n-sign-up'>
        <SignIn />
        <SignUp />
    </div>

)
export default SignInSignUpComponent;