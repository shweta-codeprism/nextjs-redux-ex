import { useState } from 'react';

/** Semantic Imports */
import { Card, Image, Button, Header, Label, Icon, Modal, Menu } from 'semantic-ui-react';

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
                            <Label size="mini" icon="box">
                                <Icon name='box' />
                                23
                            </Label>
                            <Label size="mini">
                                <Icon name='user' />
                                23
                            </Label>
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