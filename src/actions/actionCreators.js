import {
    SET_ACTIVE_CATEGORIE,
    SET_SEARCH_DATA,
    SET_ITEM_TO_BUY,
} from './actionTypes';

export function setActiveCategorie(id) {
    return {type: SET_ACTIVE_CATEGORIE, payload: id};
}

export function setSearchData(value) {
    return {type: SET_SEARCH_DATA, payload: value};
}

export function setItemToBuy(item) {
    return {type: SET_ITEM_TO_BUY, payload: item};
}