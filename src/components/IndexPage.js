/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import bannerPic from '../img/banner.jpg';
import TopSales from './TopSales';
import Categories from './Categories';
import Catalogue from './Catalogue';
import { useDispatch } from 'react-redux';
import { setSearchData } from '../actions/actionCreators';
import { useEffect } from 'react';


export default function IndexPage() {

  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setSearchData(''));
    }, [])

    return (
      <React.Fragment>
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img src={bannerPic} className="img-fluid" alt="К весне готовы!" />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <TopSales />
            <section className="catalog">
              <h2 className="text-center">Каталог</h2>
              <Categories />
              <Catalogue />
            </section>
          </div>
        </div>
      </main>
      </React.Fragment>
    )
  }