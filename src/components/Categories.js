/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import Preloader from "./Preloader";
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategorie } from '../actions/actionCreators';
import Error from "./Error";

export default function Categories() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const activeCategorie = useSelector((state) => state.activeCategorieReducer);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    },[activeCategorie])

    const getData = async () => {
        setLoading(true);
        setError(false)
        try {
            const json = await fetch('http://localhost:7070/api/categories');
            const data = await json.json();
            setLoading(false);
            setItems(data);
        } catch (error) {
            setError(true);
            setLoading(false);
            setTimeout(() => getData(), 500);
        }
    }
    
    const onCatHandler = (e) => {
        e.preventDefault();
        e.target.closest('.catalog-categories').querySelectorAll('.nav-link').forEach(e => e.classList.remove('active'));
        e.target.classList.toggle('active');
        dispatch(setActiveCategorie(e.target.dataset.id));
    }

    return ( loading ? <Preloader /> : error ? <Error /> :
        <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item">
                <a key="All" data-id="All" href="#" className={activeCategorie === 'All' ? 'nav-link active' : 'nav-link'} onClick={onCatHandler}>
                    Все
                </a>
            </li>
            {items.map(item => (
                <a key={item.id} data-id={item.id} href="#" className={activeCategorie == item.id ? 'nav-link active' : 'nav-link'} onClick={onCatHandler}>
                    {item.title}
                </a>
            ))}
        </ul>
    )
}