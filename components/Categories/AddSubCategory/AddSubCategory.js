import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Action */
import { addCategory } from '../../../redux-store/reduxReducers/categoryReducer';

/** Semantic Imports */
import {
    Card, Header, Select, Form, Button, Checkbox, Input, Segment,
    Message, Modal
} from 'semantic-ui-react';

/** Other Utilities */
import { API_TYPES } from '../../../global_constants';

const commissionModeOptions = [
    { key: '0', text: '%', value: '%' },
    { key: '1', text: 'INR', value: 'INR' },
]

const AddCategory = ({ open }) => {
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

console.log("SC_OPEN", open);


    return (
        <Modal open={open}>
            <Segment basic>
                <Form size="small" error={Categories?.error?.flag && Categories?.error?.mode === API_TYPES.POST}>
                    <Message
                        size="small"
                        error
                        header='Addition Failed !!'
                        content={Categories?.error?.msg?.message}
                    />
                    <Form.Group widths="equal">
                        <Form.Field required>
                            <label>SubCategory Name</label>
                            <Input value={categoryName} onChange={(e, data) => setCategoryName(data.value)} placeholder='First Name' />
                        </Form.Field>
                        <Form.Field required>
                            <label>Commission</label>
                            <Input
                                value={commission}
                                onChange={(e, data) => setCommission(data.value)}
                                placeholder='Commission'
                                type="number"
                                action={
                                    <Select compact
                                        size="mini"
                                        button
                                        floating options={commissionModeOptions}
                                        value={commissionMode}
                                        onChange={(e, data) => setCommissionMode(data.value)} />
                                }
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <Checkbox
                            label='Is this Category Hyperlocal ?'
                            onChange={() => setHyperlocal(!isHyperlocal)}
                            checked={isHyperlocal}
                        />
                    </Form.Field>
                    <Button positive size="mini" onClick={(e) => handleAddingCategory(e)}>Add Category</Button>
                </Form>
            </Segment>
        </Modal>
    )

}

export default AddCategory;