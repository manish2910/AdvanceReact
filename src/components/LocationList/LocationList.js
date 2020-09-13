import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Delete from '../../Images/dustbin.svg';
import Edit from '../../Images/pencil.svg';
import leftSingle from '../../Images/leftsinglearrow.svg';
import leftDouble from '../../Images/leftdoublearrow.svg';
import rightSingle from '../../Images/rightsinglearrow.svg';
import rightDouble from '../../Images/rightdoublearrow.svg';
import usePagination from './Pagination';
import NoLocationFound from '../Gps/NoLocationFound';
import LocationContext from '../../context/locationContext';
import './LocationList.css';

const LocationList = () => {
    const locationContext = useContext(LocationContext);
    let { locations, setCurrent, deleteLocation } = locationContext;
    let history = useHistory();

    let [ noOfItems, setNoOfItems ] = useState(1);
    let [userLocation, setUserLocation] = useState(locations);

    useEffect(() => {
        setUserLocation(locations);
        
    },[locations]);

    let pagination = usePagination(userLocation, noOfItems);

    let currentData = pagination.currentData();
    let maxPage = pagination.maxPage;
    let currentPage = pagination.currentPage;

    const showPagination = () => (
        <div className="location_list_pagination">
            <div className="pagination_element_container">
                <span>
                    Items per page: 
                </span>

                <span>
                    <select onChange={e => setNoOfItems(Number(e.target.value))}>
                        {userLocation.map((item,i)=>{
                            return <option value={item.id} key={item.id}>{ i+1 }</option>
                        })}
                    </select>
                </span>

                <span>
                    {currentPage} - {maxPage} of {maxPage}
                </span>

                <span className="pagination_left_arrow">
                    <img src={leftDouble} alt="left double arrow" onClick={() => pagination.prevSecond()}/>
                </span>

                <span className="pagination_left_arrow">
                    <img src={leftSingle} alt="left single arrow" onClick={() => pagination.prev()}/>
                </span>

                <span className="pagination_right_arrow">
                    <img src={rightSingle} alt="right single arrow" onClick={() => pagination.next()}/>
                </span>

                <span className="pagination_right_arrow">
                    <img src={rightDouble} alt="right double arrow" onClick={() => pagination.nextSecond()}/>
                </span>
            </div>
        </div>
    );

    const editLocationHandler = data => e => {
        setCurrent(data);
        history.push("/add");
    }

    const deleteLocationHandler = id => e => {
        let answer = window.confirm('Are you sure want to delete this item ?');
        if(answer){
            deleteLocation(id);
        }
    }

    const showList = () => {
        if(currentData.length === 0){
            pagination.prev();
        }
        return currentData.map((data, i) => (
            <div className="location_list" key={data.id}>
                <div><div className="serial_number">{data.id}</div></div>
                <div>{data.locationName}</div>
                <div>{data.address.City}</div>
                <div>{data.address.phoneNumber}</div>
                <div>
                    <span><img src={Edit} alt="edit" className="edit" onClick={editLocationHandler(data)} /></span>
                    <span><img src={Delete} alt="delete" className="delete" onClick={deleteLocationHandler(data.id)}/></span>
                </div>
            </div>
        ))
    }

    const showListHeading = () => (
        <div className="location_list_heading">
            <div>S. No.</div>
            <div>Location Name</div>
            <div>Address</div>
            <div>Phone No.</div>
            <div>Action</div>
        </div>
    )

    if(userLocation.length === 0){
        return (
            <NoLocationFound />
        )
    }

    return (
        <Fragment>
            {showListHeading()}
            {showList()}
            {showPagination()}
        </Fragment>
    )
}

export default LocationList;