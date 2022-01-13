import React from 'react';
import headerLogo from '../img/header-logo.png';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchData } from '../actions/actionCreators';
import { useState } from 'react';

export default function Header() {
    const inputData = useSelector(state => state.searchDataReducer);
    const items = useSelector((state) => state.cartReducer);
    const [input, setInput] = useState(inputData);
    const dispatch = useDispatch();

    const history = useHistory();

    const onFindHandler = () => {
        const searchFormEl = document.querySelector('[data-id=search-form]');
        searchFormEl.classList.toggle('invisible');
        searchFormEl.querySelector('input').focus();
        if (input) {
            dispatch(setSearchData(input));
            setInput('');
            goToCatalog();
        }
    }

    const goToCart = () => { 
      const path = "/cart"; 
      history.push(path);
    }

    const goToCatalog = () => {
      const path = "/catalog"; 
      history.push(path);
    }

    const onSearchInput = ({ target: { value }}) => {
        setInput(value);
    }

    const onFormSubmit = (evt) => {
        evt.preventDefault();
    }

    return (
        <React.Fragment>
            <header className="container">
                <div className="row">
                    <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <NavLink to="/" className="navbar-brand">
                            <img src={headerLogo} alt="Bosa Noga" />
                        </NavLink>

                        <div className="collapase navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink exact to="/" className="nav-link" activeClassName="nav-link active">
                                    Главная
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/catalog" className="nav-link" activeClassName="nav-link active">
                                    Каталог
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link" activeClassName="nav-link active">
                                    О магазине
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contacts" className="nav-link" activeClassName="nav-link active">
                                    Контакты
                                </NavLink>
                            </li>
                        </ul>
                        <div>
                            <div className="header-controls-pics">
                            <div
                                data-id="search-expander"
                                className="header-controls-pic header-controls-search"
                                onClick={onFindHandler}
                            ></div>
                            {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                            <div className="header-controls-pic header-controls-cart" onClick={goToCart}>
                                {items.length > 0 ? <div className="header-controls-cart-full">{items.length}</div> : null}
                                <div className="header-controls-cart-menu"></div>
                            </div>
                            </div>
                            <form
                            data-id="search-form"
                            className="header-controls-search-form form-inline invisible"
                            onSubmit={onFormSubmit}
                            >
                            <input value={input} onChange={onSearchInput} className="form-control" placeholder="Поиск" />
                            </form>
                        </div>
                        </div>
                    </nav>
                    </div>
                </div>
                </header>;
        </React.Fragment>
    )
}