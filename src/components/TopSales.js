import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import Preloader from "./Preloader";

export default function TopSales() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getData();
    },[])

    const getData = async () => {
        try {
            const json = await fetch('http://localhost:7070/api/top-sales');
            const data = await json.json();
            setLoading(false);
            setItems(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {loading ? <Preloader /> : null}
        <div className="row">
            {items.map(item => (
                <div className="col-4" key={item.id}>
                    <div className="card">
                        <img className="card-img-top img-fluid" src={item.images[0]} alt={item.title} />
                        <div className="card-body">
                            <p className="card-text">{item.title}</p>
                            <p className="card-text">{item.price} руб.</p>
                            <NavLink to={/catalog/ + item.id} className="btn btn-outline-primary">Заказать</NavLink>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>
    )
}