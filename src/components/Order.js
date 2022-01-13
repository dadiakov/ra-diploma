/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Preloader from "./Preloader";
import { clearCart } from "../actions/actionCreators";
import Error from "./Error";

export default function Order() {
    const items = useSelector((state) => state.cartReducer);
    const [input, setInput] = useState({phone: '', address: '', checked: false});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const onInputHandler = ({target: {name, value}}) => {
        setInput(prev => ({...prev, [name]: value}))
    }

    const onAgreeHandler = ({target: {checked}}) => {
        setInput(prev => ({...prev, checked: checked}))
    }

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        if (input.checked) sendData();
    }

    const sendData = async () => {
        setLoading(true);
        setError(false)
        const order = {
            owner: {
                phone: input.phone,
                address: input.address                
            },
            items: items.map(item => ({id: item.id, price: item.price, count: item.qty}))
        };

        try {
            const json = await fetch('http://localhost:7070/api/order', { 
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }, 
                body: JSON.stringify(order)
              });
            setLoading(false);
            dispatch(clearCart())
        } catch (error) {
            setError(true);
            setLoading(false);
            setTimeout(() => sendData(), 500)  
        }
    }

    return ( 
        <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card order-container">
          <form onSubmit={onFormSubmit} className="card-body">
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input name="phone" value={input.phone} onChange={onInputHandler} className="form-control" id="phone" placeholder="Ваш телефон" required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input name="address" value={input.address} onChange={onInputHandler} className="form-control" id="address" placeholder="Адрес доставки" required />
            </div>
            <div className="form-group form-check">
              <input name="agree" value={input.checked} onChange={onAgreeHandler} type="checkbox" className="form-check-input" id="agreement" />
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            {loading ? <Preloader /> : error ? <Error /> : <button type="submit" className="btn btn-outline-secondary">Оформить</button> }
          </form>
        </div>
      </section>
    )
}