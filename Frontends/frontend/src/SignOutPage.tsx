import React from 'react';
import { Page } from './Page';
import { StatusText } from './Styles';
import { useAuth0 } from '@auth0/auth0-react';

type SignoutAction = 'signout' | 'signout-callback';

interface Props {
  action: SignoutAction;
}

export const SignOutPage = ({ action }: Props) => {
  const { logout } = useAuth0(); // Use logout from the useAuth0 hook

  let message = 'Signing out ...';

  switch (action) {
    case 'signout':
      logout(); // Use logout method to initiate sign-out
      break;
    case 'signout-callback':
      message = 'You successfully signed out!';
      break;
    default:
      break;
  }

  return (
    <Page title="Sign out">
      <StatusText>{message}</StatusText>
    </Page>
  );
};
