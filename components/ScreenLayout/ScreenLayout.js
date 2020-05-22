import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import {
    Button,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react';

/** CSS Imports */
import styles from './ScreenLayout.module.scss';

/** Actions */
import { signOut } from '../../redux-store/reduxReducers/authReducer';


const ScreenLayout = (props) => {
    const router = useRouter();
    const Auth = useSelector(state => state.Auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!Auth.loggedIn) {
            // dispatch(fetchUser)
            router.push('/');
        }
    });

    return (
        <Sidebar.Pushable as={Segment}>
            <Sidebar
                as={Menu}
                animation="push"
                direction="left"
                icon='labeled'
                inverted
                vertical
                visible
                width='thin'
            >
                <Header as="h2" style={{ color: 'white', padding: '10px 0 10px 0' }}> SUBHUB </Header>

                <Menu.Item as='a' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: '2px', paddingBottom: '2px' }}>
                    <Icon name='grid layout' size="mini" />
                    Category
                </Menu.Item>
                <Menu.Item as='a' onClick={() => dispatch(signOut())}>
                    <Icon name='camera' />
                    SignOut
                </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher >

                <Segment basic style={{ width: 'calc(100vw - 200px)', paddding: 0 }}>
                    <Menu borderless fixed="top" className={styles.top_menu_style} floated>
                        <Menu.Menu position="right">
                            {
                                Auth?.info?.email
                            }
                        </Menu.Menu>
                    </Menu>
                    {
                        props.children
                    }
                </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>

    )
}

export default ScreenLayout;