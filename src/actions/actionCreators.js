import {
    SET_ACTIVE_CATEGORIE,
    SET_SEARCH_DATA,
} from './actionTypes';

export function setActiveCategorie(id) {
    return {type: SET_ACTIVE_CATEGORIE, payload: id};
}

export function setSearchData(value) {
    return {type: SET_SEARCH_DATA, payload: value};
}