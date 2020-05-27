import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Semantic Imports */
import {
    Card, Header, Segment, Image, Label, Icon, Grid,
    Container, Button, Modal, Menu, Popup
} from 'semantic-ui-react';

/** CSS Imports*/
import styles from './CategoryDetails.module.scss';
import utilStyles from '../../../styles/utils.module.scss';
import cx from 'classnames';

/** Actions */
import { addSubCategory, fetchSubCategories } from '../../../redux-store/reduxReducers/subCategoryReducer';

/** Other Elements Import */
import AddSubCategory from '../AddSubCategory';
import SubCategoryLabel from '../SubCategoryLabel';

const CategoryDetails = ({ categoryKey, category }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSubCategories(categoryKey));
    }, [dispatch]);

    const SubCategories = useSelector(state => state.SubCategories);
    const subCategories = SubCategories.subCategories;

    const [openModal, setOpenModal] = useState(false);

    console.log("OPen Modal", openModal)

    return (
        <Segment basic className={styles.details_content}>
            <div className={cx(utilStyles.d_f, utilStyles.fd_c, utilStyles.ai_c, styles.details_content_1)}>
                <Image wrapped size='small' src='/images/category.svg' />
                <Header as="h5">
                    {` Commission: ${category.commission}${category.commissionMode}`}
                </Header>
                <div className={cx(utilStyles.d_f, utilStyles.jc_sb, utilStyles.ai_c)}>
                    <Label image>
                        <Icon name="box" color="olive" />
                        <Label.Detail>235677 Products</Label.Detail>
                    </Label>
                    <Label image>
                        <Icon name="user" color="blue" />
                        <Label.Detail>235677 Vendors</Label.Detail>
                    </Label>
                </div>
            </div>
            <div className={styles.details_content_2}>
                <Segment basic className={cx(utilStyles.m_0, utilStyles.ph_0, utilStyles.d_f, utilStyles.fd_r, utilStyles.ai_c)}>
                    <Header as="h4" className={utilStyles.m_0}>
                        Sub-Categories:
                    </Header>
                    <Modal open={openModal}
                        trigger={<div className={utilStyles.pl_5}>
                            <Button size-="mini" circular icon
                                className={utilStyles.p_5}
                                positive
                                onClick={() => setOpenModal(true)}>
                                <Icon name="plus" />
                            </Button>
                        </div>}>
                        <Modal.Header className={utilStyles.p_5}>
                            <Menu secondary className={utilStyles.p_5}>
                                <Menu.Item className={utilStyles.p_5}>
                                    <Header>
                                        Add New SubCategories
                        </Header>
                                </Menu.Item>
                                <Menu.Menu position="right">
                                    <Menu.Item className={utilStyles.p_5}>
                                        <Button icon size="mini" onClick={() => setOpenModal(false)} className={utilStyles.bg_t}>
                                            <Icon name="close" />
                                        </Button>
                                    </Menu.Item>
                                </Menu.Menu>
                            </Menu>
                        </Modal.Header>
                        <AddSubCategory categoryKey={categoryKey} />
                    </Modal>

                </Segment>
                <Grid columns={3} className={styles.subcategory_space}>
                    {
                        subCategories && Object.keys(subCategories).length > 0 &&
                        Object.keys(subCategories).map(subCatKey => (
                            <Grid.Column key={subCatKey}>
                                <SubCategoryLabel
                                    name={subCategories[subCatKey].name}
                                    subCategoryKey={subCatKey}
                                />
                            </Grid.Column>
                        ))
                    }
                </Grid>
            </div>
        </Segment >
    )

}

export default CategoryDetails;