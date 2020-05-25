import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Action */
import { addCategory } from '../../../redux-store/reduxReducers/categoryReducer';
import { addSubCategory, fetchSubCategories } from '../../../redux-store/reduxReducers/subCategoryReducer';

/** Semantic Imports */
import {
    Card, Header, Select, Form, Button, Checkbox, Input, Segment,
    Message, Dropdown, Icon, Divider, Grid, Label
} from 'semantic-ui-react';

/** Other Utilities */
import { API_TYPES } from '../../../global_constants';
import { useUpdateEffect } from '../../../custom_hooks';

/** Other Elements Import */
import AddSubCategory from '../AddSubCategory';

/** CSS Imports */
import utilStyles from '../../../styles/utils.module.scss';
import styles from './AddCategory.module.scss';

const commissionModeOptions = [
    { key: '0', text: '%', value: '%' },
    { key: '1', text: 'INR', value: 'INR' },
]

const AddCategory = () => {
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState("");
    const [commission, setCommission] = useState(10);
    const [commissionMode, setCommissionMode] = useState("%");
    const [isHyperlocal, setHyperlocal] = useState(false);

    const handleAddingCategory = (e) => {
        e.preventDefault();
        const category = {
            name: categoryName,
            isHyperlocal,
            commission: parseFloat(commission),
            commissionMode
        };
        console.log("CAT-SNAP", category);
        dispatch(addCategory(category));
    }

    const Categories = useSelector(state => state.Categories);
    console.log("Opend the SC Window-Update", Categories)
    const [nowAddSC, allowAddSC] = useState(false);
    const openSubCategoryModal = () => {
        console.log("Opend the SC Window-Update", Categories.newCategoryKey);
        allowAddSC(true);
        dispatch(fetchSubCategories(Categories.newCategoryKey));
    }
    const dependencies = [Categories.newCategoryKey];
    useUpdateEffect(openSubCategoryModal, dependencies);

    const [subCategoryName, setSubCategoryName] = useState("");

    const handleAddingSubCategory = (e) => {
        e.preventDefault();
        const subCategory = {
            name: subCategoryName,
            categoryId: Categories.newCategoryKey
        };
        console.log("CAT-SNAP", subCategory);
        dispatch(addSubCategory(subCategory));
    }

    const SubCategories = useSelector(state => state.SubCategories);
    const subCategories = SubCategories.subCategories;



    // console.log("Opend the SC Window-Update-SuUB", Object.keys(subCategories));


    return (
        <Segment basic className={utilStyles.p_5}>
            <Form className={utilStyles.p_5} size="small" error={Categories?.error?.flag && Categories?.error?.mode === API_TYPES.POST}>
                <Message
                    size="small"
                    error
                    header='Addition Failed !!'
                    content={Categories?.error?.msg?.message}
                />
                <Form.Group widths="equal">
                    <Form.Field required>
                        <label>Category Name:</label>
                        {
                            nowAddSC ?
                                <span style={{ fontSize: 15 }}>{categoryName}</span> :
                                <Input
                                    size="mini"
                                    value={categoryName} onChange={(e, data) => setCategoryName(data.value)} placeholder='First Name' />
                        }
                    </Form.Field>
                    <Form.Field required>
                        <label>Commission:</label>
                        {
                            nowAddSC ?
                                <span style={{ fontSize: 15 }}>{`${commission} ${commissionMode}`}</span> :
                                <Input
                                    size="mini"
                                    value={commission}
                                    onChange={(e, data) => setCommission(data.value)}
                                    placeholder='Commission'
                                    type="number"
                                    action={
                                        <Dropdown compact
                                            style={{ height: 35 }}
                                            button
                                            floating options={commissionModeOptions}
                                            value={commissionMode}
                                            onChange={(e, data) => setCommissionMode(data.value)} />
                                    }
                                />
                        }
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    {
                        nowAddSC ?
                            <span style={{ fontSize: 15 }}>
                                <Icon
                                    color={isHyperlocal ? 'green' : 'red'}
                                    name={isHyperlocal ? 'check' : 'close'}
                                    size="small"
                                />
                                Is this Category Hyperlocal ?
                            </span> :
                            <Checkbox
                                label='Is this Category Hyperlocal ?'
                                onChange={() => setHyperlocal(!isHyperlocal)}
                                checked={isHyperlocal}
                            />
                    }
                </Form.Field>
                {
                    !nowAddSC &&
                    <Button positive size="mini" onClick={(e) => handleAddingCategory(e)}>Add Category</Button>
                }
            </Form>
            {
                nowAddSC &&
                <React.Fragment>
                    <Divider />
                    <div className={styles.add_subcategory_header}>
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
                    <Segment basic className={utilStyles.p_0} fluid>
                        <Grid columns={5}>
                            {
                                subCategories && Object.keys(subCategories).length > 0 &&
                                Object.keys(subCategories).map(subCatKey => (
                                    <Grid.Column>
                                        <Label className={{ ...utilStyles.d_f, ...utilStyles.fd_r }}>
                                            {
                                                subCategories[subCatKey].name
                                            }
                                            <Icon name="close" />
                                        </Label>
                                    </Grid.Column>
                                ))
                            }
                        </Grid>
                    </Segment>
                </React.Fragment>
            }
        </Segment >
    )

}

export default AddCategory;