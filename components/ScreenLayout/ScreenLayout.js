import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';

/** Semantic Elements */
import {
    Button, Checkbox, Grid, Header, Icon, Image,
    Menu, Segment, Sidebar
} from 'semantic-ui-react';

/** CSS Imports */
import styles from './ScreenLayout.module.scss';
import utilStyles from '../../styles/utils.module.scss';

/** Actions */
import { signOut } from '../../redux-store/reduxReducers/authReducer';

/** Other Elements Import */
import FirstHalfMenuItem from './FirstHalfMenuItem';
import SecondHalfMenuItem from './SecondHalfMenuItem';


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


    const handleSignOut = (e) => {
        e.preventDefault();
        dispatch(signOut());
    }

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
                width="thin"
            >
                <Menu.Item as='a' header className={styles.menu_item_header}>
                    SUBHUB SUPERADMIN
                </Menu.Item>
                <br />
                <div className={styles.second_menu}>
                    <FirstHalfMenuItem as='a' label="Dashboard" href="/dashboard" />
                    <FirstHalfMenuItem as='a' label="Subscriptions" href="/all-subscriptions" />
                    <FirstHalfMenuItem as='a' label="Complaints & Query" href="/user-complaints" />
                    <FirstHalfMenuItem as='a' label="Approve Vendors" href="/pending_vendors" />
                    <FirstHalfMenuItem as='a' label="Approve Products" href="/pending_products" />
                </div>
                <br />
                <SecondHalfMenuItem as='a' label="Categories" href="/category" />
                <SecondHalfMenuItem as='a' label="Verified Vendors" href="/vendors" />
                <SecondHalfMenuItem as='a' label="Customers" href="/customers" />
            </Sidebar>
            <Sidebar.Pusher className={styles.side_menu_pusher}>
                <Menu borderless fixed="top" className={styles.top_menu_style} floated>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            {
                                Auth?.info?.email
                            }
                        </Menu.Item>
                        <Menu.Item
                            as="a"
                            name='logout'
                            onClick={(e) => handleSignOut(e)}
                        >
                            Logout
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Segment basic className={styles.side_menu_pusher_content}>
                    {
                        props.children
                    }
                </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>

    )
}

export default ScreenLayout;