import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Semantic Imports */
import { Card, Header, Segment, Image, Label, Icon, Grid } from 'semantic-ui-react';

/** CSS Imports*/
import styles from './CategoryDetails.module.scss';
import utilStyles from '../../../styles/utils.module.scss';

/** Actions */
import { addSubCategory, fetchSubCategories } from '../../../redux-store/reduxReducers/subCategoryReducer';

const CategoryDetails = ({ categoryKey, category }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSubCategories(categoryKey));
    }, [dispatch]);

    const SubCategories = useSelector(state => state.SubCategories);
    const subCategories = SubCategories.subCategories;

    return (
        <Segment basic className={styles.details_content}>
            <div>
                <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                <Header as="h5">
                    {` Commission: ${category.commission}${category.commissionMode}`}
                </Header>
                <Label>
                    <Icon name="box" />
                    23 Products
                </Label>
                <Label>
                    <Icon name="user" />
                    23 Vendors
                </Label>
            </div>
            <div className={styles.details_content_2}>
                <Header as="h5">
                    Sub-Categories:
                </Header>
                <Grid columns={3}>
                    {
                        subCategories && Object.keys(subCategories).length > 0 &&
                        Object.keys(subCategories).map(subCatKey => (
                            <Grid.Column>
                                <Label style={{ display: 'flex', flexDirection: 'row' }} >
                                    {
                                        subCategories[subCatKey].name
                                    }
                                    <Icon name="close" />
                                </Label>
                            </Grid.Column>
                        ))
                    }
                </Grid>

            </div>
        </Segment >
    )

}

export default CategoryDetails;