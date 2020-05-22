import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

/** Actions */
import { signIn, clearLoginError, fetchUser } from '@reducers/authReducer';

/** Semnatic Component */
import { Input, Button, Header, Form, Segment, Icon, Message } from 'semantic-ui-react';

/** Other Components */
import Loader from '@components/Loader'


const Home = (props) => {
  const router = useRouter();
  const Auth = useSelector(state => state.Auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (Auth.loggedIn) {
      if (Auth.info?.uid) {
        dispatch(fetchUser());
      }
      router.push('/dashboard');
    }
  });

  const handleEmailChange = (e, data) => {
    setEmail(data.value);
  }

  const handlePasswordChange = (e, data) => {
    setPassword(data.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  }

  const handleClose = () => {
    setEmail("");
    setPassword("");
    dispatch(clearLoginError());
  };

  return (
    <div className="container">
      <Head>
        <title>SubHub Super Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Segment basic textAlign="center" >
        <Header as="h1" className="title">
          Welcome to Subhub
        </Header>
        <h3>
          SUBHUB SUPER ADMIN
        </h3>
        <Form size="small" error={Auth?.error?.flag}>
          <Message
            size="small"
            error
            header='Login Failed !!'
            content={Auth?.error?.msg?.message}
          />
          <Form.Group grouped >
            <Input
              fluid
              value={email}
              onChange={(e, data) => handleEmailChange(e, data)}
              size="mini"
              label={{
                icon: <Icon.Group>
                  <Icon size="big" color="grey" name="user circle" />
                  <Icon corner='top right' name="star" color="red" size="tiny" />
                </Icon.Group>,
              }}
              labelPosition='left'
              type="text" placeholder="User Email" />
            <br />
            <Input
              fluid
              value={password}
              onChange={(e, data) => handlePasswordChange(e, data)}
              size="mini"
              label={{
                icon: <Icon.Group>
                  <Icon size="big" color="grey" name="lock" />
                  <Icon corner='top right' name="star" color="red" size="tiny" />
                </Icon.Group>,
              }}
              labelPosition='left'
              type="password" placeholder="Password" />
          </Form.Group>
          <Button fluid primary onClick={(e) => handleLogin(e)}> Login </Button>
        </Form>
        <Link href="/forgot_password">
          <a className="forgot-pass"> Forgot Password ?</a>
        </Link>

      </Segment>

      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer> */}

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

      
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        

        .logo {
          height: 1em;
        }

        a.forgot-pass {
          margin-top: 12px;
          color: #4d4d4d;
          font-weight: 550;
          font-size: 12px;
        }
        a.forgot-pass:hover,
        a.forgot-pass:focus,
        a.forgot-pass:active {
          text-decoration: underline;
        }

      `}</style>
    </div>
  )
}

export default Home;