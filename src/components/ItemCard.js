/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Preloader from "./Preloader";
import bannerPic from '../img/banner.jpg';

export default function ItemCard({ match: { params: { id }} }) {

    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);
    
    const getData = async () => {
        try {
            const json = await fetch(`http://localhost:7070/api/items/${id}`);
            const data = await json.json();
            setItem(data);
            setLoading(false);
        } catch (error) {
            console.log(error)            
        }
    }

    useEffect(()=>{
        getData()
    },[])

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
                                                <td>{item.sku}</td>
                                            </tr>
                                            <tr>
                                                <td>Производитель</td>
                                                <td>{item.manufacturer}</td>
                                            </tr>
                                            <tr>
                                                <td>Цвет</td>
                                                <td>{item.color}</td>
                                            </tr>
                                            <tr>
                                                <td>Материалы</td>
                                                <td>{item.material}</td>
                                            </tr>
                                            <tr>
                                                <td>Сезон</td>
                                                <td>{item.season}</td>
                                            </tr>
                                            <tr>
                                                <td>Повод</td>
                                                <td>{item.reason}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="text-center">
                                        <p>Размеры в наличии: <span className="catalog-item-size selected">18 US</span> <span className="catalog-item-size">20 US</span></p>
                                        <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                                <button className="btn btn-secondary">-</button>
                                                <span className="btn btn-outline-primary">1</span>
                                                <button className="btn btn-secondary">+</button>
                                            </span>
                                        </p>
                                    </div>
                                    <button className="btn btn-danger btn-block btn-lg">В корзину</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}