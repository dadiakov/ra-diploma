/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import Preloader from "./Preloader";
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategorie } from '../actions/actionCreators';

export default function Categories() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const activeCategorie = useSelector((state) => state.activeCategorieReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    },[activeCategorie])

    const getData = async () => {
        try {
            const json = await fetch('http://localhost:7070/api/categories');
            const data = await json.json();
            setLoading(false);
            setItems(data);
        } catch (error) {
            console.log(error)
        }
    }
    
    const onCatHandler = (e) => {
        e.preventDefault();
        e.target.closest('.catalog-categories').querySelectorAll('.nav-link').forEach(e => e.classList.remove('active'));
        e.target.classList.toggle('active');
        dispatch(setActiveCategorie(e.target.dataset.id));
    }

    return ( loading ? <Preloader /> :
        <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item">
                <a key="All" data-id="All" href="#" className="nav-link active" onClick={onCatHandler}>
                    Все
                </a>
            </li>
            {items.map(item => (
                <a key={item.id} data-id={item.id} href="#" className="nav-link" onClick={onCatHandler}>
                    {item.title}
                </a>
            ))}
        </ul>
    )
}