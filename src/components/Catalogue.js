/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Preloader from "./Preloader";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Error from "./Error";

export default function Catalogue() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [moreLoading, setMoreLoading] = useState(false);
    const activeCategorie = useSelector((state) => state.activeCategorieReducer);
    const [showButton, setShowButton] = useState(true);
    const searchData = useSelector(state => state.searchDataReducer);
    const [error, setError] = useState(false);
    const [moreError, setMoreError] = useState(false);

    useEffect(() => {
      setShowButton(true);
        getData();
    },[activeCategorie, searchData])

    const getData = async () => {
        setLoading(true);
        setError(false)
        let url = activeCategorie === 'All' ? 'http://localhost:7070/api/items' : `http://localhost:7070/api/items?categoryId=${activeCategorie}`;
        if (searchData) {
          url = activeCategorie === 'All' ? `http://localhost:7070/api/items?q=${searchData}` : `http://localhost:7070/api/items?q=${searchData}&categoryId=${activeCategorie}`;
        }
        try {
            const json = await fetch(url);
            const data = await json.json();
            setLoading(false);
            setItems(data);
        } catch (error) {
          setError(true);
          setLoading(false);
          setTimeout(() => getData(), 500)  
        }
    }

    const getMoreData = async () => {
      setMoreLoading(true);
      setMoreError(false);
      setShowButton(false);
      const numOfCards = document.querySelectorAll('.catalog-item-card').length;
      let url = activeCategorie === 'All' ? `http://localhost:7070/api/items?offset=${numOfCards}` : `http://localhost:7070/api/items?categoryId=${activeCategorie}&offset=${numOfCards}`;
      if (searchData) {
        url = activeCategorie === 'All' ? `http://localhost:7070/api/items?q=${searchData}&offset=${numOfCards}` : `http://localhost:7070/api/items?q=${searchData}&categoryId=${activeCategorie}&offset=${numOfCards}`;
      }
      try {
          const json = await fetch(url);
          const data = await json.json();
          setMoreLoading(false);
          setItems(prev => prev.concat(data));            
          if (data.length < 6) {
              setShowButton(false);
              return;
          }
          setShowButton(true);
      } catch (error) {
        setMoreError(true);
        setMoreLoading(false);
        setTimeout(() => getMoreData(), 500) 
      }
  }

    return ( loading ? <Preloader /> : error ? <Error /> :
          <React.Fragment>
            <div className='row'>
                {items.map(item => (
                    <div className="col-4" key={item.id}>
                    <div className="card catalog-item-card">
                      <img src={item.images[0]}
                        className="card-img-top img-fluid" alt={item.title} />
                      <div className="card-body">
                        <p className="card-text">{item.title}</p>
                        <p className="card-text">{item.price} руб.</p>
                        <NavLink to={/catalog/ + item.id} className="btn btn-outline-primary">Заказать</NavLink>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {moreLoading ? <Preloader /> : moreError ? <Error /> : showButton ? 
              <div className="text-center">
                <button className="btn btn-outline-primary" onClick={getMoreData}>Загрузить ещё</button>
              </div> 
              : null }
          </React.Fragment>
    )
}