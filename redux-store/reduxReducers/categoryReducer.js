import { categoriesRef } from "@fb/firebase";

const CATEGORY = Object.freeze({
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    CREATE_CATEGORY_SUCCESS: 'CREATE_CATEGORY_SUCCESS',
    CREATE_CATEGORY_FAILED: 'CREATE_CATEGORY_FAILED',
    FETCH_CATEGORIES: 'FETCH_CATEGORIES',
    FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED: 'FETCH_CATEGORIES_FAILED',
});


export const INITIAL_STATE = {
    categories: null,
    loading: false,
    error: {
        flag: false,
        msg: null
    }
}

export const fetchCategories = () => dispatch => {
    dispatch({
        type: CATEGORY.FETCH_CATEGORIES,
        payload: null
    });

    categoriesRef.on("value", snapshot => {
        if (snapshot.val()) {
            dispatch({
                type: CATEGORY.FETCH_CATEGORIES_SUCCESS,
                payload: snapshot.val()
            });
        } else {
            dispatch({
                type: CATEGORY.FETCH_CATEGORIES_FAILED,
                payload: {
                    message: "No Categories Available."
                }
            });
        }
    });
};

export const addCategory = (category) => dispatch => {
    dispatch({
        type: CATEGORY.CREATE_CATEGORY,
        payload: null
    });
    categoriesRef.push().set(category);
}

export const categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORY.FETCH_CATEGORIES:
            return {
                ...state,
                loading: true
            };
        case CATEGORY.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                loading: false
            };
        case CATEGORY.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                categories: null,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload
                }
            };
        case CATEGORY.CREATE_CATEGORY:
            return {
                ...state,
                loading: true
            };
        case CATEGORY.CREATE_CATEGORY_FAILED:
            return {
                ...state,
                categories: null,
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