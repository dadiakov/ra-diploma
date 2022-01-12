/* eslint-disable jsx-a11y/scope */
import bannerPic from '../img/banner.jpg';
import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeFromCart } from '../actions/actionCreators';

export default function Cart() {
    const items = useSelector((state) => state.cartReducer);

    const [total, setTotal] = useState(0);
    
    useEffect(() => {
        let sum = 0;
        items.forEach(item => {
            sum += item.price * item.qty
        });
        setTotal(sum);
    },[items])

    const dispatch = useDispatch();

    const removeItem = (index) => {
        dispatch(removeFromCart(index));
    }

    return (
        <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img src={bannerPic} className="img-fluid" alt="К весне готовы!" />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                    return <tr key={nanoid()}>
                        <td scope="row">{index + 1}</td>
                        <td><NavLink to={/catalog/+ item.id}>{item.title}</NavLink></td>
                        <td>{item.size}</td>
                        <td>{item.qty}</td>
                        <td>{item.price} руб.</td>
                        <td>{item.price * item.qty} руб.</td>
                        <td><button onClick={() => removeItem(index)} className="btn btn-outline-danger btn-sm">Удалить</button></td>
                    </tr>
                })}
                <tr>
                  <td colSpan="5" className="text-right">Общая стоимость</td>
                  <td>{total} руб.</td>
                </tr>
              </tbody>
            </table>
          </section>
            </div>
        </div>
        </main>
    )
}