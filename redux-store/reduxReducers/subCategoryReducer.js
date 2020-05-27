/** Constants */
import { API_TYPES } from '@gc';

/** db references */
import { subCategoriesRef, categoryNamesRef } from "@fb/firebase";

const SUBCATEGORY = Object.freeze({
    CREATE_SUBCATEGORY: 'CREATE_SUBCATEGORY',
    CREATE_SUBCATEGORY_SUCCESS: 'CREATE_SUBCATEGORY_SUCCESS',
    CREATE_SUBCATEGORY_FAILED: 'CREATE_SUBCATEGORY_FAILED',
    FETCH_SUBCATEGORIES: 'FETCH_SUBCATEGORIES',
    FETCH_SUBCATEGORIES_SUCCESS: 'FETCH_SUBCATEGORIES_SUCCESS',
    FETCH_SUBCATEGORIES_FAILED: 'FETCH_SUBCATEGORIES_FAILED',
    DELETE_SUBCATEGORY: 'DELETE_SUBCATEGORY',
    DELETE_SUBCATEGORY_SUCCESS: 'DELETE_SUBCATEGORY_SUCCESS',
    DELETE_SUBCATEGORY_FAILED: 'DELETE_SUBCATEGORY_FAILED',
    RESET_SUBCATEGORIES: 'RESET_SUBCATEGORIES'
});


export const INITIAL_STATE = {
    subCategories: {},
    loading: false,
    error: {
        flag: false,
        msg: null,
        mode: ''
    }
}

export const fetchSubCategories = (categoryId) => dispatch => {
    dispatch({
        type: SUBCATEGORY.FETCH_SUBCATEGORIES,
        payload: null
    });

    subCategoriesRef.orderByChild("categoryId").equalTo(categoryId).on("value", snapshot => {
        if (snapshot.val()) {
            dispatch({
                type: SUBCATEGORY.FETCH_SUBCATEGORIES_SUCCESS,
                payload: snapshot.val()
            });
        } else {
            dispatch({
                type: SUBCATEGORY.FETCH_SUBCATEGORIES_FAILED,
                payload: {
                    message: "No Categories Available."
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
    const subCategoriesPushRef = subCategoriesRef.push();
    const newSubCategoryKey = subCategoriesPushRef.key;
    subCategoriesPushRef.set(subCategory)
        .then(() => {
            // categoryNamesRef.child(category.name).set(newCategoryKey)
            //     .then(() => {
            dispatch({
                type: SUBCATEGORY.CREATE_SUBCATEGORY_SUCCESS,
                payload: null
            });
            // }).catch(error => {
            //     subCategoriesRef.child(newCategoryKey).remove();
            //     dispatch({
            //         type: SUBCATEGORY.CREATE_SUBCATEGORY_FAILED,
            //         payload: {
            //             message: "The Category Name already Exists. Please Try Another Name!!"
            //         }
            //     });
            // });
        })
        .catch(error => {
            console.log("CAT-SNAP-E", error);
            dispatch({
                type: SUBCATEGORY.CREATE_SUBCATEGORY_FAILED,
                payload: {
                    message: "The Sub Category Name already Exists. Please Try Another Name!!"
                }
            });
        });
}

export const deleteSubCategory = (subCategoryKey) => dispatch => {
    dispatch({
        type: SUBCATEGORY.DELETE_SUBCATEGORY,
        payload: null
    });

    subCategoriesRef.child(subCategoryKey).remove()
        .then(() => {
            dispatch({
                type: SUBCATEGORY.DELETE_SUBCATEGORY_SUCCESS,
                payload: null
            });
        }).catch(error => {
            console.log("CAT-SNAP-E", error);
            dispatch({
                type: SUBCATEGORY.DELETE_SUBCATEGORY_FAILED,
                payload: {
                    message: "The Sub Category Couldn't be deleted. Please Try Another Name!!"
                }
            });
        })
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
                loading: false,
                error: {
                    flag: false,
                    msg: null,
                    mode: ""
                }
            };
        case SUBCATEGORY.FETCH_SUBCATEGORIES_FAILED:
            return {
                ...state,
                subCategories: null,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload,
                    mode: API_TYPES.GET_LIST
                }
            };
        case SUBCATEGORY.CREATE_SUBCATEGORY:
            return {
                ...state,
                loading: true
            };
        case SUBCATEGORY.CREATE_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    flag: false,
                    msg: null,
                    mode: ""
                }
            };
        case SUBCATEGORY.CREATE_SUBCATEGORY_FAILED:
            return {
                ...state,
                loading: false,
                error: {
                    flag: true,
                    msg: action.payload,
                    mode: API_TYPES.POST
                }
            };
        case SUBCATEGORY.DELETE_SUBCATEGORY:
            return {
                ...state,
                loading: true
            };
        case SUBCATEGORY.DELETE_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    flag: false,
                    msg: null,
                    mode: ""
                }
            };
        case SUBCATEGORY.DELETE_SUBCATEGORY_FAILED:
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