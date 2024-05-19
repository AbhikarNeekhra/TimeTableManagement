"use client";
import React, { useEffect } from 'react';
import { signOut } from 'next-auth/react';

const ErrorPage = ({ statusCode }) => {
  useEffect(() => {
    const logoutUser = async () => {
      await signOut({ redirect: false, callbackUrl: '/auth/error' });
    };

    logoutUser();
  }, []);

  return (
    <div>
      <h1>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</h1>
      <p>You have been logged out.</p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
