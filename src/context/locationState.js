import React , { useReducer } from 'react';
import LocationContext from './locationContext';
import LocationReducer from './locationReducer';
import {
    ADD_LOCATION,
    DELETE_LOCATION,
    UPDATE_LOCATION,
    SET_CURRENT,
    CLEAR_CURRENT
} from './types';

const LocationState = props => {
    const initialState = {
        locations:[
            { id:1, locationName:"Home", address:{ address1:"Meerapatti", address2:"Transport Nagar", SuiteNo:"Dhoomanganj", City:"Allahabad", State:"West Virginia", zipCode:"211011", phoneNumber:"(836) 827-3265", timeZone:"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi" } , facilityTiming:[
                { id:1, value:"Sun", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
                { id:2, value:"Mon", isChecked:true, from:"11:00", to:"11:59", fromMeridian:true, toMeridian:true },
                { id:3, value:"Tue", isChecked:true, from:"11:00", to:"11:59", fromMeridian:true, toMeridian:true },
                { id:4, value:"Wed", isChecked:true, from:"11:00", to:"11:59", fromMeridian:true, toMeridian:true },
                { id:5, value:"Thu", isChecked:true, from:"11:00", to:"11:59", fromMeridian:true, toMeridian:true },
                { id:6, value:"Fri", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
                { id:7, value:"Sat", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null }
            ], appointMentTags:["eat", "code", "happiness"] },
            { id:2, locationName:"Office", address:{ address1:"D-43", address2:"Sector 63", SuiteNo:"Noida", City:"Noida", State:"Arizona", zipCode:"210102", phoneNumber:"(836) 827-3265", timeZone:"(GMT +10:00) Eastern Australia, Guam, Vladivostok" } , facilityTiming:[
                { id:1, value:"Sun", isChecked:true, from:"11:59", to:"11:59", fromMeridian:true, toMeridian:false },
                { id:2, value:"Mon", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
                { id:3, value:"Tue", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
                { id:4, value:"Wed", isChecked:true, from:"11:59", to:"11:59", fromMeridian:true, toMeridian:false },
                { id:5, value:"Thu", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
                { id:6, value:"Fri", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
                { id:7, value:"Sat", isChecked:true, from:"11:59", to:"11:59", fromMeridian:true, toMeridian:false }
            ], appointMentTags:["eat", "code", "innovation"] },
            { id:3, locationName:"PG", address:{ address1:"D-1627", address2:"11th Avenue", SuiteNo:"Gaur City 2", City:"Noida", State:"Washington", zipCode:"211009", phoneNumber:"(836) 827-3265", timeZone:"(GMT +9:30) Adelaide, Darwin" } , facilityTiming:[
                { id:1, value:"Sun", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
                { id:2, value:"Mon", isChecked:true, from:"10:00", to:"05:00", fromMeridian:true, toMeridian:false },
                { id:3, value:"Tue", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
                { id:4, value:"Wed", isChecked:true, from:"10:00", to:"05:00", fromMeridian:true, toMeridian:false },
                { id:5, value:"Thu", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
                { id:6, value:"Fri", isChecked:true, from:"10:00", to:"05:00", fromMeridian:true, toMeridian:false },
                { id:7, value:"Sat", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null }
            ], appointMentTags:["eat", "code", "sleep"] }
        ],
        current:null
    }

    const [state,dispatch] = useReducer(LocationReducer, initialState);

    const addLocation = (location) => {
        const { addressline1, addressline2, city, state, locationname, phonenumber, suiteno,  timezone, zipcode, facility, appointMentTags } = location;
        let locationData = { 
            id:initialState.locations.length + 1,
            locationName: locationname,
            address:{
                address1:addressline1,
                address2:addressline2,
                SuiteNo:suiteno,
                State:state,
                City:city,
                zipCode:zipcode,
                phoneNumber:phonenumber,
                timeZone:timezone
            },
            facilityTiming:[...facility],
            appointMentTags:appointMentTags
        };
        dispatch({ type:ADD_LOCATION, payload:locationData })
    };

    const updateLocation = (location) => {
        const { id, addressline1, addressline2, city, state, locationname, phonenumber, suiteno, timezone, zipcode, facility, appointMentTags } = location;
        let locationData = { 
            id:id,
            locationName: locationname,
            address:{
                address1:addressline1,
                address2:addressline2,
                SuiteNo:suiteno,
                State:state,
                City:city,
                zipCode:zipcode,
                phoneNumber:phonenumber,
                timeZone:timezone
            },
            facilityTiming:[...facility],
            appointMentTags:appointMentTags
        };
        dispatch({ type:UPDATE_LOCATION, payload:locationData })
    };

    const deleteLocation = (id) => {
        dispatch({type:DELETE_LOCATION,payload:id})
    };

    const setCurrent = (location) => {
        dispatch({type:SET_CURRENT,payload:location})
    }

    const clearCurrent = () => {
        dispatch({type:CLEAR_CURRENT})
    }

    return (
        <LocationContext.Provider value={{
            locations:state.locations,
            current:state.current,
            deleteLocation,
            updateLocation,
            addLocation,
            setCurrent,
            clearCurrent,
        }}>
            {props.children}
        </LocationContext.Provider>
    )

}

export default LocationState;