import { useState } from 'react';

/** Semantic Imports */
import {
    Card, Image, Button, Header, Label,
    Icon, Divider, Modal, Menu, Popup, Dropdown
} from 'semantic-ui-react';

/** CSS Imports */
import utilStyles from '../../../styles/utils.module.scss';
import styles from './CategoryCard.module.scss';
import cx from 'classnames';

/** Other Elements Import */
import AddCategory from '../AddCategory';
import CategoryDetails from '../CategoryDetails';


const CategoryCard = ({ key, category, categoryKey }) => {
    const [openD, setOpenD] = useState(false);

    console.log("CATEGORY-SNAP", categoryKey);

    return (
        <Modal trigger={
            <Card size="small" className={utilStyles.p_5}
                onClick={() => setOpenD(true)}
            >
                <div className={cx(utilStyles.p_5, utilStyles.d_f, utilStyles.jc_c, styles.category_img)}>
                    <Image
                        size="mini"
                        src="/images/category.svg"
                        style={{ width: 60, height: 60 }}
                    />
                </div>
                <Card.Content className={utilStyles.p_5}>
                    <div className={styles.category_header}>
                        <h5 textAlign="right" className={utilStyles.m_0}>{category.name}</h5>
                        {/* <h6>{`${category.commission} ${category.commissionMode} Commission`}</h6> */}
                        <div className={styles.category_details}>
                            <div className={cx(utilStyles.d_f, utilStyles.jc_s, styles.category_numbers)}>
                                <Label size="mini" icon="box">
                                    <Icon name='box' />
                                    23
                                </Label>
                                <Label size="mini">
                                    <Icon name='user' />
                                    23
                                </Label>
                            </div>
                            <div className={cx(utilStyles.d_f, utilStyles.jc_e, styles.category_update)}>
                                <Popup
                                    trigger={
                                        <Icon name='ellipsis vertical'
                                            color="grey" />
                                    }
                                    on="click"
                                >
                                    <Popup.Content>
                                        <Menu vertical secondary>
                                            <Menu.Item>
                                                <Button size="mini" primary className={utilStyles.p_5}>Edit</Button>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Button size="mini" primary className={utilStyles.p_5}>Edit</Button>
                                            </Menu.Item>
                                        </Menu>
                                    </Popup.Content>
                                </Popup>

                                {/* <Dropdown
                                    pointing="left"
                                    icon={<Icon name='ellipsis vertical'
                                        color="grey" />}
                                >
                                    <Dropdown.Menu>
                                        <div className={utilStyles.p_5}>
                                            <Button size="mini" primary className={utilStyles.p_5}>Edit</Button>
                                        </div>
                                        <Divider />
                                        <div className={utilStyles.p_5}>
                                            <Button size="mini" negative className={utilStyles.p_5}>Delete</Button>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown> */}
                            </div>
                        </div>
                    </div>
                </Card.Content>
            </Card >
        }
            open={openD}>
            <Modal.Header className={utilStyles.p_5}>
                <Menu secondary className={utilStyles.p_5}>
                    <Menu.Item className={utilStyles.p_5}>
                        <Header>
                            {category.name}
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
            <CategoryDetails categoryKey={categoryKey} category={category} />

        </Modal>
    )
}

export default CategoryCard;