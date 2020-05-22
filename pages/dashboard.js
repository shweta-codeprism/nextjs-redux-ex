import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

/** Actions */
import { signIn, clearLoginError } from '@reducers/authReducer';

/** Semnatic Component */
import { Input, Button, Header, Form, Segment, Icon, Message } from 'semantic-ui-react';

/** Other Components */
import Loader from '@components/Loader'
import ScreenLayout from '@components/ScreenLayout/ScreenLayout'


const Dashboard = ({ props }) => {

  return (
    <ScreenLayout>
      <div>
        <Head>
          <title>SubHub Super Admin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Segment basic textAlign="center" style={{ height: '100vh' }} >



        </Segment>
      </div>
    </ScreenLayout>
  )
}

export default Dashboard;