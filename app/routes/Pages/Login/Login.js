import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';

import {
    Form,
    FormGroup,
    FormText,
    Input,
    CustomInput,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import Amplify, { Auth, Hub, API } from 'aws-amplify';


import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

// async function signIn() {
//     try {
//         const user = await Auth.signIn();
//     } catch (error) {
//         console.log('error signing in', error);
//     }
// }

const Login = () => {

    // const authenticate = () =>  {
    //     Amplify.configure(aws-export)
    //     Hub.listen('auth', ({ payload: { event, data } }) => {
    //       switch (event) {
    //         case 'signIn':
    //           console.log('sign in', event, data)
    //           // this.setState({ user: data})
    //           break
    //         case 'signOut':
    //           console.log('sign out')
    //           // this.setState({ user: null })
    //           break
    //       }
    //     })
    //   }


    //   useEffect(() => authenticate(), []);
    
    return (<EmptyLayout>
        <EmptyLayout.Section center>
            { /* START Header */}
            <HeaderAuth 
                title="Sign In to Application"
            />
            { /* END Header */}
            { /* START Form */}
            <Form className="mb-3">
                <ThemeConsumer>
                {
                    ({ color }) => (
                        <Button onClick={() => signIn()} color={ color } block tag={ Link } to="/">
                            Sign In
                        </Button>
                    )
                }
                </ThemeConsumer>
            </Form>

            <FooterAuth />
            { /* END Footer */}
        </EmptyLayout.Section>
    </EmptyLayout>)
};

export default Login;
