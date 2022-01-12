/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Preloader from "./Preloader";
import bannerPic from '../img/banner.jpg';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { setItemToBuy, addToCart } from "../actions/actionCreators";
import { useHistory } from 'react-router-dom';

export default function ItemCard({ match: { params: { id }} }) {

    const [loading, setLoading] = useState(true);
    const itemToBuy = useSelector((state) => state.itemToBuyReducer);
    const [item, setItem] = useState({});
    
    const dispatch = useDispatch();
    
    const getData = async () => {
        try {
            const json = await fetch(`http://localhost:7070/api/items/${id}`);
            const data = await json.json();
            setItem(data);
            setLoading(false);
            dispatch(setItemToBuy({
                id: data.id,
                sku: data.sku,
                title: data.title,
                price: data.price,
                size: null,
                qty: 1
            }));
        } catch (error) {
            console.log(error)            
        }
    }

    useEffect(()=>{
        getData()
    },[])

    const changeSize = (evt) => {
        const el = evt.target;
        setItemToBuy({size: el.textContent})
        el.closest('.text-center').querySelectorAll('.catalog-item-size').forEach(e => {
            e.className = 'catalog-item-size';
        })
        dispatch(setItemToBuy({size: el.textContent}));        
    }

    const qtyDec = () => {
        if(itemToBuy.qty > 1) {
            const newQty = +itemToBuy.qty - 1;
            dispatch(setItemToBuy({qty: newQty}))}
    }

    const qtyInc = () => {
        if(itemToBuy.qty < 10) {
            const newQty = +itemToBuy.qty + 1;
            dispatch(setItemToBuy({qty: newQty}))}
    }

    const history = useHistory();

    const addItemToCart = () => {
        dispatch(addToCart(itemToBuy));
        const path = "/cart"; 
        history.push(path);
    }

    return ( loading ? <Preloader /> :
        <React.Fragment>
            <main className="container">
                <div className="row">
                    <div className="col">
                        <div className="banner">
                            <img src={bannerPic} className="img-fluid" alt="К весне готовы!" />
                            <h2 className="banner-header">К весне готовы!</h2>
                        </div>

                        <section className="catalog-item">
                            <h2 className="text-center">{item.title}</h2>
                            <div className="row">
                                <div className="col-5">
                                    <img src={item.images[0]}
                                        className="img-fluid" alt="" />
                                </div>
                                <div className="col-7">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>Артикул</td>
                                                <td>{item.sku || null}</td>
                                            </tr>
                                            <tr>
                                                <td>Производитель</td>
                                                <td>{item.manufacturer || null}</td>
                                            </tr>
                                            <tr>
                                                <td>Цвет</td>
                                                <td>{item.color || null}</td>
                                            </tr>
                                            <tr>
                                                <td>Материалы</td>
                                                <td>{item.material || null}</td>
                                            </tr>
                                            <tr>
                                                <td>Сезон</td>
                                                <td>{item.season || null}</td>
                                            </tr>
                                            <tr>
                                                <td>Повод</td>
                                                <td>{item.reason || null}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {!item.sizes.every(size => !size.avalible) ?
                                        <React.Fragment>
                                            <div className="text-center">
                                                <p>Размеры в наличии: {item.sizes? item.sizes.map(size => {
                                                    if (!size.avalible) return null;
                                                    return <span key={nanoid()} className={itemToBuy.size === size.size ? "catalog-item-size selected" : "catalog-item-size"} onClick={changeSize}>{size.size}</span>
                                                }) : null}</p>
                                                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                                        <button onClick={qtyDec} className="btn btn-secondary">-</button>
                                                        <span className="btn btn-outline-primary">{itemToBuy.qty}</span>
                                                        <button onClick={qtyInc} className="btn btn-secondary">+</button>
                                                    </span>
                                                </p>
                                            </div>
                                        </React.Fragment> : null}
                                        {!item.sizes.every(size => !size.avalible) && itemToBuy.size ? 
                                            <button onClick={addItemToCart} className="btn btn-danger btn-block btn-lg">В корзину</button> : null 
                                        }
                                        
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}