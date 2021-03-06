import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

/** Actions */
import { signIn, clearLoginError } from '@reducers/authReducer';

/** Semnatic Component */
import { Input, Button, Header, Form, Segment, Icon, Message } from 'semantic-ui-react';

/** Other Components */
import Loader from '@components/Loader';
import ScreenContentLayout from '@components/ScreenContentLayout';

const Dashboard = ({ props }) => {

  return (
    <ScreenContentLayout pageTitle="Dashboard">
    </ScreenContentLayout>
  )
}

export default Dashboard;