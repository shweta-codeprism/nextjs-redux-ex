import { subCategoriesRef } from "@fb/firebase";

const SUBCATEGORY = Object.freeze({
    CREATE_SUBCATEGORY: 'CREATE_SUBCATEGORY',
    CREATE_SUBCATEGORY_SUCCESS: 'CREATE_SUBCATEGORY_SUCCESS',
    CREATE_SUBCATEGORY_FAILED: 'CREATE_SUBCATEGORY_FAILED',
    FETCH_SUBCATEGORIES: 'FETCH_SUBCATEGORIES',
    FETCH_SUBCATEGORIES_SUCCESS: 'FETCH_SUBCATEGORIES_SUCCESS',
    FETCH_SUBCATEGORIES_FAILED: 'FETCH_SUBCATEGORIES_FAILED',
});


export const INITIAL_STATE = {
    subCategories: null,
    loading: false,
    error: {
        flag: false,
        msg: null
    }
}

export const fetchSubCategories = () => dispatch => {
    dispatch({
        type: SUBCATEGORY.FETCH_SUBCATEGORIES,
        payload: null
    });

    subCategoriesRef.on("value", snapshot => {
        if (snapshot.val()) {
            dispatch({
                type: SUBCATEGORY.FETCH_SUBCATEGORIES_SUCCESS,
                payload: snapshot.val()
            });
        } else {
            dispatch({
                type: SUBCATEGORY.FETCH_SUBCATEGORIES_FAILED,
                payload: {
                    message: "No SubCategories Available."
                }
            });
        }
    });
};

export const addSubCategory = (subCategory) => dispatch => {
    dispatch({
        type: SUBCATEGORY.CREATE_SUBCATEGORY,
        payload: null
    });
    subCategoriesRef.push().set(subCategory);
}

export const subCategoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUBCATEGORY.FETCH_SUBCATEGORIES:
            return {
                ...state,
                loading: true
            };
        case SUBCATEGORY.FETCH_SUBCATEGORIES_SUCCESS:
            return {
                ...state,
                subCategories: action.payload,
                loading: false
            };
        case SUBCATEGORY.FETCH_SUBCATEGORIES_FAILED:
            return {
                ...state,
                subCategories: null,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                }
            };
        case SUBCATEGORY.CREATE_SUBCATEGORY:
            return {
                ...state,
                loading: true
            };
        case SUBCATEGORY.CREATE_SUBCATEGORY_FAILED:
            return {
                ...state,
                subCategories: null,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                }
            };
        default:
            return state;
    }
};