import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';

/** Semantic Elements */
import {
    Header, Segment, Menu, Input, Button, Icon, Modal
} from 'semantic-ui-react';

/** CSS Imports */
import styles from './ScreenContentLayout.module.scss';
import utilStyles from '../../styles/utils.module.scss';

/** Other Elements Import */
import ScreenLayout from '../ScreenLayout';

const ScreenContentLayout = ({ pageTitle, addModalContent, ...props }) => {
    const [openD, setOpenD] = useState(false);

    return (
        <ScreenLayout>
            <Segment basic fluid>
                <Head>
                    <title>SubHub Super {pageTitle} </title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Menu secondary size="mini" className={utilStyles.m_0}>
                    <Menu.Item
                        name={pageTitle}
                    >
                        <Header floated="left" as="h4" className={utilStyles.m_0}>
                            {
                                pageTitle
                            }
                        </Header>
                    </Menu.Item>
                    <Menu.Item className={styles.add_menu}>
                        <Modal trigger={
                            <Button circular size="mini" positive icon
                                className={utilStyles.p_5}
                                onClick={() => setOpenD(true)}
                            >
                                <Icon name="plus" />
                            </Button>
                        }
                            open={openD}>
                            <Modal.Header className={utilStyles.p_5}>
                                <Menu secondary className={utilStyles.p_5}>
                                    <Menu.Item className={utilStyles.p_5}>
                                        <Header>
                                            Add New {pageTitle}
                                        </Header>
                                    </Menu.Item>
                                    <Menu.Menu position="right">
                                        <Menu.Item className={utilStyles.p_5}>
                                            <Button icon size="mini" onClick={() => setOpenD(false)} className={utilStyles.bg_t}>
                                                <Icon name="close" />
                                            </Button>
                                        </Menu.Item>
                                    </Menu.Menu>
                                </Menu>
                            </Modal.Header>
                            {
                                addModalContent
                            }
                        </Modal>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Input icon='search' placeholder='Search...' />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Segment basic className={styles.content_space}>
                    {
                        props.children
                    }
                </Segment>
            </Segment>
        </ScreenLayout >
    )
}

export default ScreenContentLayout;