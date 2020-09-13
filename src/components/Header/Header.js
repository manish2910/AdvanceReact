import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ children }) => {

    const showNav = () => (
        <nav>
            <Link to="/">
                <div>
                    Locations List
                </div>
            </Link>
            <Link to="/add">
                <div>
                    + Add Location
                </div>
            </Link>
        </nav>
    )

    return (
        <Fragment>
            {showNav()}
            {children}
        </Fragment>
    )
}

export default Header;