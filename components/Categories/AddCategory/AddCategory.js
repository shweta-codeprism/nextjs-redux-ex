import { useState } from 'react';
import { useDispatch } from 'react-redux';

/** Action */
import { addCategory } from '../../../redux-store/reduxReducers/categoryReducer';

/** Semantic Imports */
import { Card, Header, Select, Form, Button, Checkbox, Input, Segment } from 'semantic-ui-react';

const commissionModeOptions = [
    { key: '0', text: '%', value: '%' },
    { key: '1', text: 'INR', value: 'INR' },
]

const AddCategory = () => {
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState("");
    const [commission, setCommission] = useState("10");
    const [commissionMode, setCommissionMode] = useState("%");
    const [isHyperlocal, setHyperlocal] = useState(false);

    const handleAddingCategory = (e) => {
        e.preventDefault();
        const category = {
            name: categoryName,
            isHyperlocal,
            commission,
            commissionMode
        };
        dispatch(addCategory(category));
    }


    return (
        <Segment basic>
            <Form size="small">
                <Form.Group widths="equal">
                    <Form.Field required>
                        <label>Category Name</label>
                        <Input value={categoryName} onChange={(e, data) => setCategoryName(data.value)} placeholder='First Name' />
                    </Form.Field>
                    <Form.Field required>
                        <label>Commission</label>
                        <Input
                            value={commission}
                            onChange={(e, data) => setCommissionMode(data.value)}
                            placeholder='commision'
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
    )

}

export default AddCategory;