import { userConstants } from "../../constants/index";

const initialState = {
    loader: false,
    data: [],
    filter_data: [],
    modal_status: false,
    update_data: {}
};

export const app = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.FETCH_LIST_DATA_REQUEST:
            return { ...state, loader: true };
        case userConstants.FETCH_LIST_DATA_SUCCESS:
            return { ...state, loader: false, data: action.payload, filter_data: action.payload };
        case userConstants.FETCH_LIST_DATA_FAILURE:
            return { ...state, loader: false };

        case userConstants.SEARCH_ITEM_REQUEST:
            return { ...state, loader: true };
        case userConstants.SEARCH_ITEM_SUCCESS:
            return { ...state, loader: false, filter_data: action.payload };
        case userConstants.SEARCH_ITEM_FAILURE:
            return { ...state, loader: false };

        case userConstants.SELECT_ITEM_LIST_REQUEST:
            return { ...state, loader: true };
        case userConstants.SELECT_ITEM_LIST_SUCCESS:
            return { ...state, loader: false, filter_data: action.payload };
        case userConstants.SELECT_ITEM_LIST_FAILURE:
            return { ...state, loader: false };

        case userConstants.DELETE_ITEM_REQUEST:
            return { ...state, loader: true };
        case userConstants.DELETE_ITEM_SUCCESS:
            return { ...state, loader: false, filter_data: action.payload };
        case userConstants.DELETE_ITEM_FAILURE:
            return { ...state, loader: false };

        case userConstants.MODAL_REQUEST:
            return { ...state, loader: true, modal_status: false };
        case userConstants.MODAL_SUCCESS:
            const { payload } = action;
            return { ...state, loader: false, modal_status: payload?.modalOpen, update_data: payload?.item };
        case userConstants.MODAL_FAILURE:
            return { ...state, loader: false, modal_status: false };

        case userConstants.UPDATE_ITEM_REQUEST:
            return { ...state, loader: true };
        case userConstants.UPDATE_ITEM_SUCCESS:
            return { ...state, loader: false, filter_data: action.payload };
        case userConstants.UPDATE_ITEM_FAILURE:
            return { ...state, loader: false };

        default:
            return state;
    }
};
