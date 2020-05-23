import { useState } from 'react';

/** Semantic Imports */
import { Card, Image, Button, Header, Label, Icon, Modal, Menu } from 'semantic-ui-react';

/** CSS Imports */
import utilStyles from '../../../styles/utils.module.scss';
import styles from './CategoryCard.module.scss';

/** Other Elements Import */
import AddCategory from '../AddCategory';
import CategoryDetails from '../CategoryDetails';


const CategoryCard = ({ category }) => {
    const [openD, setOpenD] = useState(false);

    return (
        <Modal trigger={
            <Card size="small" className={utilStyles.p_5}
                onClick={() => setOpenD(true)}
            >
                <Image
                    size="mini"
                    src="https://react.semantic-ui.com/images/wireframe/image.png"
                    wrapped
                    ui={false}
                />
                <Card.Content className={utilStyles.p_5}>
                    <div className={styles.category_header}>
                        <h5 textAlign="right" className={utilStyles.m_0}>{category.name}</h5>
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
            <CategoryDetails category={category} />

        </Modal>
    )
}

export default CategoryCard;