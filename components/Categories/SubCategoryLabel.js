import { useDispatch } from 'react-redux';

/** Semantic Import */
import { Label, Popup, Button, Icon } from 'semantic-ui-react';

/** Actions */
import { deleteSubCategory } from './../../redux-store/reduxReducers/subCategoryReducer';

/** CSS Imports */
import utilStyles from './../../styles/utils.module.scss';
import cx from 'classnames';

const SubCategoryLabel = ({ name, subCategoryKey }) => {

    const dispatch = useDispatch();

    const handleDeletingSubCategory = (e) => {
        e.preventDefault();
        console.log("SCAT-SNAP-DEL", subCategoryKey);
        dispatch(deleteSubCategory(subCategoryKey));
    }


    return (
        <Label>
            <div className={cx(utilStyles.d_f, utilStyles.ai_c, utilStyles.jc_sb)}>
                <span cassName={utilStyles.pr_5}>
                    {
                        name
                    }
                </span>
                <Popup
                    content={
                        <Button
                            color='red'
                            size="mini"
                            content='Confirm Delete'
                            onClick={(e) => handleDeletingSubCategory(e)} />
                    }
                    on='click'
                    trigger={
                        <Icon name="close" color="red" className={utilStyles.pl_5} />
                    }
                />
            </div>
        </Label>
    );
}

export default SubCategoryLabel;