import React, { Fragment, useState, useRef, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import FacilityTimes from '../FacilityTimes/FacilityTimes';
import AppointmentPool from '../Appointment Pool/AppointmentPool';
import stateList from '../shared/stateList';
import LocationContext from '../../context/locationContext';
import timeZoneList from '../shared/timeZoneList';
import './AddLocation.css';

const AddLocation = () => {
    const locationContext = useContext(LocationContext);
    let { addLocation, updateLocation, current, clearCurrent } = locationContext;
    let history = useHistory();
    
    const [ values, setValues ] = useState({
        locationname:"",
        addressline1:"",
        suiteno:"",
        addressline2:"",
        city:"",
        state:"",
        zipcode:"",
        phonenumber:"",
        timezone:""
    });

    const [toggle, setToggle] = useState(false);
    const [facility, setFacility] = useState([]);
    const [appointMentTags, setAppointMentTags] = useState([]);

    const input = useRef();
    
    let { locationname, addressline1, suiteno, addressline2, city, state, zipcode, phonenumber, timezone } = values;

    useEffect(()=>{
        if(current){
            setValues(values => ({
                ...values,
                locationname:current.locationName,
                addressline1:current.address.address1,
                addressline2:current.address.address2,
                suiteno:current.address.SuiteNo,
                state:current.address.State,
                city:current.address.City,
                zipcode:current.address.zipCode,
                phonenumber:current.address.phoneNumber,
                timezone:current.address.timeZone
            }));
            setFacility(current.facilityTiming);
        }
    },[current]);

    const toggleModal = name => e => {
        if(name !== 'close'){
            if(input.current){
                let anySelectedFacility = input.current.filter(day => ( day.from !== "" && day.to !== "" ));
                let anyCheckedFacility = input.current.filter(day => ( day.isChecked === true ));

                if( anyCheckedFacility.length && anySelectedFacility.length === anyCheckedFacility.length ){
                    setFacility(input.current);
                }else{
                    return;
                }
            }
        }
        return setToggle(!toggle);
    };

    const changeHandle = name => e => {
        let value;
        if(name === "zipcode"){
            value = e.target.value;
            let zipRegex = /^[0-9a-zA-Z]*$/;
            if (zipRegex.test(value)) {
                setValues({...values, [name]: value });
            }
        }else if(name === "phonenumber"){
            value = e
            setValues({...values, [name]: value });
        }else{
            value = e.target.value;
            setValues({...values, [name]:value});
        }
    };

    const modal = () => (
        <Fragment>
            <FacilityTimes ref={input} daysFacility={facility} toggleHandler={toggleModal}/>
        </Fragment>
    );

    const selectedTags = tags => {
        setAppointMentTags(tags);
    };

    
    const closeAddLocation = name => e => {
        if(current){
            clearCurrent();
        }
        history.push("/");
    }

    const saveLocation = name => e => {
        if( locationname && city && phonenumber ){
            if(current){
                let id = current.id;
                const location = { ...values, id, facility, appointMentTags };
                updateLocation(location);
                clearCurrent();
            }else{
                const location = { ...values, facility, appointMentTags };
                addLocation(location);
            }
            history.push("/");
        }
    }

    const showForm = () => (
        <form>
            <div>
                <label htmlFor="locationName" className="location">Location Name</label><br/>
                <input type="text" width="100%" id="locationName" value={locationname} onChange={changeHandle("locationname")} placeholder="Enter Location..."/>
            </div>
            <div className="inline_design">
                <span>
                    <label htmlFor="addressLine1">Address Line 1</label><br/>
                    <input type="text" id="addressLine1" value={addressline1} onChange={changeHandle("addressline1")} placeholder="Enter Address..."/>
                </span>
                <span>
                    <label htmlFor="suiteNo">Suite No.</label><br/>
                    <input type="text" id="suiteNo" value={suiteno} onChange={changeHandle("suiteno")} placeholder="Enter Suite No..."/>
                </span>
            </div>
            <div className="inline_design inline_design_margin_top">
                <span>
                    <label htmlFor="addressLine2">Address Line 2</label><br/>
                    <input type="text" id="addressLine2" value={addressline2} onChange={changeHandle("addressline2")} placeholder="Enter Address..."/>
                </span>
                <span className="inline_design">
                    <span>
                        <label htmlFor="city">City</label><br/>
                        <input type="text" id="city" value={city} onChange={changeHandle("city")} placeholder="Enter City..."/>
                    </span>
                    <span>
                        <label htmlFor="state">State</label><br/>
                        <select value={state} id="state" onChange={changeHandle("state")}>
                            {stateList.map(option => <option value={option.name} key={option.name}>{option.name}</option>)}
                        </select>
                    </span>
                </span>
            </div>
            <div className="inline_design inline_design_margin_top">
                <span className="inline_design">
                    <span>
                        <label htmlFor="zipCode">Zip Code</label><br/>
                        <input type="text" id="zipCode" value={zipcode} onChange={changeHandle("zipcode")} placeholder="Enter Zip Code..." required minLength="5" maxLength="10" />
                    </span>
                    <span>
                        <label htmlFor="phoneNumber">Phone Number</label><br/>
                        <PhoneInput placeholder="Enter phone number..." maxLength="14" country="US" {...values} value={phonenumber} onChange={changeHandle("phonenumber")} autoComplete="true"/>
                    </span>
                </span>
                <span>
                    <label htmlFor="timeZone">Time Zone</label><br/>
                    <select value={timezone} id="timeZone" onChange={changeHandle("timezone")}>
                        {timeZoneList.map(option => <option value={option.text} key={option.value}>{option.text}</option>)}
                    </select>                
                </span>
            </div>
            <div className="inline_design inline_design_margin_top">
                <span>
                    <label htmlFor="facilityTimes">Facility Times*</label><br/>
                    <input type="button" id="facilityTimes" onClick={toggleModal('facility')} value={current ? "Click to update facility time...": "Click to set facility time"} />
                </span>
                <span>
                    <label htmlFor="appointmentPool">Appointment Pool</label><br/>
                    <AppointmentPool selectedTags={selectedTags}/>
                </span>
            </div>
        </form>
    );

    const showActionButton = () => (
        <div className="addlocation_action_button">
            <button onClick={closeAddLocation('close')}>
                Cancel
            </button>
            <button onClick={saveLocation("save")}>
                {current ? 'Update': 'Add'}
            </button>
        </div>
    )

    return (
        <Fragment>
            {toggle && modal()}
            <div className="addlocation_main_div">
                <div>Add Locations</div>
                {showForm()}
                {showActionButton()}
            </div>
        </Fragment>
    )
}

export default AddLocation;