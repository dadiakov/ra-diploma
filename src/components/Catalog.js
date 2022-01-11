/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import bannerPic from '../img/banner.jpg';
import Categories from './Categories';
import Catalogue from './Catalogue';
import SearchInput from './SearchInput';

export default function Catalog() {
    return (
        <React.Fragment>
        <main className="container">
          <div className="row">
            <div className="col">
              <div className="banner">
                <img src={bannerPic} className="img-fluid" alt="К весне готовы!" />
                <h2 className="banner-header">К весне готовы!</h2>
              </div>
              <section className="catalog">
                <h2 className="text-center">Каталог</h2>
                <SearchInput />
                <Categories />
                <Catalogue />
              </section>
            </div>
          </div>
        </main>
        </React.Fragment>
      )
}