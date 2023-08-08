import React, { ReactNode } from 'react'; // Import ReactNode type
import { Page } from './Page';
//import { useAuth } from './Auth';
import { useAuth0 } from '@auth0/auth0-react';

const AuthorizedPage: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Page title="You do not have access to this page">{null}</Page>;
  }
};

export default AuthorizedPage;
