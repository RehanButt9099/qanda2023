import React from 'react';
import { Page } from './Page';
import { StatusText } from './Styles';
import { useAuth0 } from '@auth0/auth0-react';

type SigninAction = 'signin' | 'signin-callback';

interface Props {
  action: SigninAction;
}

export const SignInPage = ({ action }: Props) => {
  const { loginWithRedirect } = useAuth0(); // Use loginWithRedirect from the useAuth0 hook

  if (action === 'signin') {
    loginWithRedirect(); // Use loginWithRedirect method to initiate sign-in
  }

  return (
    <Page title="Sign In">
      <StatusText>Signing in ...</StatusText>
    </Page>
  );
};
