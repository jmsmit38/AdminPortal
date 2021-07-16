import React from 'react';
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom';

import AppLayout from './../../layout/default';
import { RoutedContent } from './../../routes';

import { withAuthenticator } from '@aws-amplify/ui-react';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../../aws-export';
Amplify.configure(awsconfig);

const basePath = process.env.BASE_PATH || '/';

const AppClient = () => {
    return (
        <Router basename={ basePath }>
            <AppLayout>
                <RoutedContent />
            </AppLayout>
        </Router>
    );
}

export default hot(module)(withAuthenticator(AppClient));