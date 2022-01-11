/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Preloader from "./Preloader";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Catalogue() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const activeCategorie = useSelector((state) => state.activeCategorieReducer);
    const [showButton, setShowButton] = useState(true);
    const searchData = useSelector(state => state.searchDataReducer);

    useEffect(() => {
      setShowButton(true);
        getData();
    },[activeCategorie, searchData])

    const getData = async () => {
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
            console.log(error)
        }
    }

    const getMoreData = async () => {
      const numOfCards = document.querySelectorAll('.catalog-item-card').length;
      let url = activeCategorie === 'All' ? `http://localhost:7070/api/items?offset=${numOfCards}` : `http://localhost:7070/api/items?categoryId=${activeCategorie}&offset=${numOfCards}`;
      if (searchData) {
        url = activeCategorie === 'All' ? `http://localhost:7070/api/items?q=${searchData}&offset=${numOfCards}` : `http://localhost:7070/api/items?q=${searchData}&categoryId=${activeCategorie}&offset=${numOfCards}`;
      }
      try {
          const json = await fetch(url);
          const data = await json.json();
          setLoading(false);
          setItems(prev => prev.concat(data));            
          if (data.length < 6) {
              setShowButton(false);
          }
      } catch (error) {
          console.log(error)
      }
  }

    return ( loading ? <Preloader /> :
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
            {showButton ? 
              <div className="text-center">
                <button className="btn btn-outline-primary" onClick={getMoreData}>Загрузить ещё</button>
              </div> 
              : null }
          </React.Fragment>
    )
}