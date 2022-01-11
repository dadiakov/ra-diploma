import { useSelector, useDispatch } from 'react-redux';
import { setSearchData } from '../actions/actionCreators';
import { useState } from 'react';
import { useEffect } from 'react';

export default function SearchInput() {
    const inputData = useSelector(state => state.searchDataReducer);
    const [inputValue, setInputValue] = useState(inputData);

    const dispatch = useDispatch();

    useEffect(() => {
        setInputValue(inputData);
    }, [inputData])

    const onSearchInput = ({ target: { value }}) => {
        setInputValue(value);
    }

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        dispatch(setSearchData(inputValue))
    }

    return (
        <form onSubmit={onFormSubmit} className="catalog-search-form form-inline">
            <input value={inputValue} onChange={onSearchInput} className="form-control" placeholder="Поиск" />
        </form>
    )
}