import React, { Fragment } from 'react';
import './NoLocationFound.css';
import notfound from '../../Images/GPS.JPG';

const NoLocationFound = () => {
    return (
        <Fragment>
            <div className="notfound_main">
                <img src={notfound} alt="location not found" />
                <div>
                    Kindly Add Your Location First
                </div>
                <div>
                    There is no location added right now
                </div>
            </div>
        </Fragment>
    )
}

export default NoLocationFound;