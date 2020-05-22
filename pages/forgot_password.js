import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

/** Actions */
import { passwordReset } from '@reducers/passwordReducer';

/** Semnatic Component */
import { Input, Button, Header, Form, Segment, Icon, Message, Label } from 'semantic-ui-react';

/** Other Components */
import Loader from '@components/Loader'


const PasswordReset = ({ props }) => {
  const Password = useSelector(state => state.Password);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const handleEmailChange = (e, data) => {
    setEmail(data.value);
  }

  const handlePasswordReset = (e) => {
    e.preventDefault();
    dispatch(passwordReset(email));
  }



  return (
    <div className="container">
      <Head>
        <title>SubHub Super Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Segment basic textAlign="center" >
        <Header as="h1" className="title">
          SUBHUB SUPER ADMIN
        </Header>
        <h3>
          Password Reset
        </h3>
        <Form size="small" error={Password?.error?.flag} success={Password?.linkSent} >
          <Message
            size="small"
            success
            header='The Link has been sent to your email'
            content="Click on the link sent to your mail to reset your password !!"
          />
          <Message
            size="small"
            error
            header="The Link was not Sent !!!!"
            content={Password?.error?.msg?.message}
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
          </Form.Group>

          <Button fluid primary onClick={(e) => handlePasswordReset(e)}> Send Link To Email </Button>
        </Form>
        <Link href="/" >
          <a className="go-back">
            <Icon name='arrow left' size="small" />
            Go Back
          </a>
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

        a.go-back {
          margin-top: 12px;
          color: #4d4d4d;
          font-weight: 550;
          font-size: 12px;
        }
        a.go-back:hover,
        a.go-back:focus,
        a.go-back:active {
          text-decoration: underline;
        }
        
      `}</style>
    </div>
  )
}

export default PasswordReset