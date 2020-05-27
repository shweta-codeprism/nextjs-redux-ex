import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Action */
import { addSubCategory } from '../../../redux-store/reduxReducers/subCategoryReducer';

/** CSS Imports */
import utilStyles from '../../../styles/utils.module.scss';
import cx from 'classnames';

/** Semantic Imports */
import {
    Card, Header, Select, Form, Button, Checkbox, Input, Segment,
    Message, Modal, Grid, Icon, Menu, Label
} from 'semantic-ui-react';

/** Other Utilities */
import { API_TYPES } from '../../../global_constants';

/** Other Elements Import */
import SubCategoryLabel from '../SubCategoryLabel';


const AddSubCategory = ({ categoryKey }) => {
    const dispatch = useDispatch();
    const [subCategoryName, setSubCategoryName] = useState("");


    const handleAddingSubCategory = (e) => {
        e.preventDefault();
        const subCategory = {
            name: subCategoryName,
            categoryId: categoryKey
        };
        console.log("SCAT-SNAP", subCategory);
        dispatch(addSubCategory(subCategory));
    }

    const SubCategories = useSelector(state => state.SubCategories);
    const subCategories = SubCategories.subCategories;


    return (
        <Segment basic>
            <Form size="small" error={SubCategories?.error?.flag && SubCategories?.error?.mode === API_TYPES.POST}>
                <Message
                    size="small"
                    error
                    header='Addition Failed !!'
                    content={SubCategories?.error?.msg?.message}
                />
                <div className={cx(utilStyles.d_f, utilStyles.jc_c )}>
                    <Input
                        size="mini"
                        value={subCategoryName}
                        onChange={(e, data) => setSubCategoryName(data.value)}
                        placeholder='SubCategory Name'
                        action={
                            <Button
                                positive
                                compact
                                floating
                                size="mini"
                                onClick={(e) => handleAddingSubCategory(e)}
                            >
                                Add SubCategory
                            </Button>
                        }
                    />
                </div>
            </Form>
            <Segment basic className={utilStyles.p_0} fluid>
                <Grid columns={3} doubling stackable>
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
            </Segment>
        </Segment>
    )

}

export default AddSubCategory;