/** Constants */
import { API_TYPES } from '@gc';

/** db references */
import { categoriesRef, categoryNamesRef } from "@fb/firebase";

const CATEGORY = Object.freeze({
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    CREATE_CATEGORY_SUCCESS: 'CREATE_CATEGORY_SUCCESS',
    CREATE_CATEGORY_FAILED: 'CREATE_CATEGORY_FAILED',
    DELETE_CATEGORY: 'DELETE_CATEGORY',
    DELETE_CATEGORY_SUCCESS: 'DELETE_CATEGORY_SUCCESS',
    DELETE_CATEGORY_FAILED: 'DELETE_CATEGORY_FAILED',
    FETCH_CATEGORIES: 'FETCH_CATEGORIES',
    FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED: 'FETCH_CATEGORIES_FAILED',
    RESET_CATEGORIES: 'RESET_CATEGORIES'
});


export const INITIAL_STATE = {
    newCategoryKey: '',
    categories: {},
    loading: false,
    error: {
        flag: false,
        msg: null,
        mode: ''
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
    const categoriesPushRef = categoriesRef.push();
    const newCategoryKey = categoriesPushRef.key;
    categoriesPushRef.set(category)
        .then(() => {
            categoryNamesRef.child(category.name.toUpperCase()).set(newCategoryKey)
                .then(() => {
                    dispatch({
                        type: CATEGORY.CREATE_CATEGORY_SUCCESS,
                        payload: newCategoryKey
                    });
                }).catch(error => {
                    categoriesRef.child(newCategoryKey).remove();
                    dispatch({
                        type: CATEGORY.CREATE_CATEGORY_FAILED,
                        payload: {
                            message: "The Category Name already Exists. Please Try Another Name!!"
                        }
                    });
                });
        })
        .catch(error => {
            console.log("CAT-SNAP-E", error);
            dispatch({
                type: CATEGORY.CREATE_CATEGORY_FAILED,
                payload: {
                    message: "The Category Name already Exists. Please Try Another Name!!"
                }
            });
        });
}

export const deleteCategory = (categoryKey) => dispatch => {
    dispatch({
        type: CATEGORY.DELETE_CATEGORY,
        payload: null
    });

    subCategoriesRef.child(categoryKey).remove()
        .then(() => {
            dispatch({
                type: CATEGORY.DELETE_CATEGORY_SUCCESS,
                payload: null
            });
        }).catch(error => {
            console.log("CAT-SNAP-E", error);
            dispatch({
                type: CATEGORY.DELETE_CATEGORY_FAILED,
                payload: {
                    message: "The Category Couldn't be deleted. Please Try Another Name!!"
                }
            });
        })
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
                loading: false,
                error: {
                    flag: false,
                    msg: null,
                    mode: ""
                }
            };
        case CATEGORY.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                categories: null,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload,
                    mode: API_TYPES.GET_LIST
                }
            };
        case CATEGORY.CREATE_CATEGORY:
            return {
                ...state,
                loading: true
            };
        case CATEGORY.CREATE_CATEGORY_SUCCESS:
            // console.log("Opend the SC Window-Update-REd", )

            return {
                ...state,
                newCategoryKey: action.payload,
                loading: false,
                error: {
                    flag: false,
                    msg: null,
                    mode: ""
                }
            };
        case CATEGORY.CREATE_CATEGORY_FAILED:
            return {
                ...state,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload,
                    mode: API_TYPES.POST
                }
            };
        case CATEGORY.DELETE_CATEGORY:
            return {
                ...state,
                loading: true
            };
        case CATEGORY.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    flag: false,
                    msg: null,
                    mode: ""
                }
            };
        case CATEGORY.DELETE_CATEGORY_FAILED:
            return {
                ...state,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload,
                    mode: API_TYPES.DELETE
                }
            };
        default:
            return state;
    }
};