import React, { Fragment, forwardRef, useState, useImperativeHandle, useContext, useEffect } from 'react';
import LocationContext from '../../context/locationContext';
import './FacilityTimes.css';

const FacilityTimes = forwardRef(({ toggleHandler, daysFacility }, ref) => {
    const locationContext = useContext(LocationContext);
    let { current } = locationContext;

    const [ values, setValues ] = useState({
        days:[
            { id:1, value:"Sun", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
            { id:2, value:"Mon", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
            { id:3, value:"Tue", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
            { id:4, value:"Wed", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
            { id:5, value:"Thu", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
            { id:6, value:"Fri", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null },
            { id:7, value:"Sat", isChecked:false, from:"", to:"", fromMeridian:null, toMeridian:null }
        ]
    });

    let { days } = values;

    useEffect(()=>{
        if(current){
            setValues(val => ({
               ...val,
               days:current.facilityTiming 
            }));
        }
        if(daysFacility.length !== 0){
            setValues(val => ({
                ...val,
                days:daysFacility
             })); 
        }

    },[current, daysFacility]);


    useImperativeHandle(ref , () => shareStateWithParent());

    const shareStateWithParent = () => {
        return values.days;
    }

    const handleAllChecked = data => e => {
        e.preventDefault();
        if(data.isChecked){
            let { from, to, fromMeridian, toMeridian } = data;
            days.forEach(day => {
                if(day.isChecked){
                    day.from = from;
                    day.to = to;
                    day.fromMeridian = fromMeridian;
                    day.toMeridian = toMeridian;
                }
            })
            setValues({ ...values, days: days });
        }
    }

    const handleChecked = name => e => {
        days.forEach(day => {
            if (day.value === name){
                if(day.isChecked === true && (day.from !== "" || day.to !== "")){
                    day.isChecked = e.target.checked;
                    day.from = "";
                    day.to = "";
                }else{
                    day.isChecked = e.target.checked;
                }
            }
        })
        setValues({...values, days: days});
    }

    const tConvert = (name, time, type) => e => {
        time = time.match(/^([01]\d|2[0-3])(:)([0-5]\d)?$/) && [time];
        let testTime;
        if (time && time.length > 0) {
            time = time[0].split(":");
            testTime = time[0] < 12 ? true : false;
            time[0] = time[0] % 12 || 12;
            time = time[0] + ":" + time[1];
        }else{
            return;
        }
        days.forEach(day => {
            if (day.value === name){
                if(type === "from"){
                    day.fromMeridian = testTime;
                    day.from = time;
                }else{
                    day.toMeridian = testTime;
                    day.to = time;
                }
            }
        });
        setValues({...values, days: days});
    }

    const changeTimeHandler = (name, type) => e => {
        e.preventDefault();
        let value = e.target.value;
        days.forEach(day => {
            if (day.value === name && day.isChecked === true){
                if(type === "from"){
                    day.from = value;
                }else{
                    day.to = value;
                }
            }
        });
        setValues({...values, days: days});
    };

    const checkedChangeHandler = name => e =>{
        console.log(name);
    }

    const FT = () => (
        <form className="form">
            {days.map((e, i) => (
                <div className="FTForm" key={e.id}>
                    <div>
                        <input type="checkbox" id={e.id} onClick={handleChecked(e.value)} value={e.value} onChange={checkedChangeHandler} checked={e.isChecked}/>
                        <label htmlFor={e.id}>{e.value}</label>
                    </div>
                    <div>
                        <input type="text" id={`from${e.value}Time`} minLength="5" maxLength="5" value={e.from} onBlur={tConvert(e.value, e.from, 'from')} onChange={changeTimeHandler(e.value, 'from')} />
                        <button className="am" style={{ backgroundColor:e.fromMeridian ? "#2B5F8E":"#ccc", color:e.fromMeridian ? "#fff":"#000" }}>AM</button>
                        <button className="pm" style={{ backgroundColor:e.fromMeridian ? "#ccc":"#2B5F8E", color:e.fromMeridian ? "#000":"#fff" }}>PM</button>
                    </div>
                    <div>
                        <input type="text" id={`to${e.value}Time`} minLength="5" maxLength="5" value={e.to} onBlur={tConvert(e.value, e.to, 'to')} onChange={changeTimeHandler(e.value, 'to')} />
                        <button className="am" style={{ backgroundColor:e.toMeridian ? "#2B5F8E":"#ccc", color:e.toMeridian ? "#fff":"#000" }}>AM</button>
                        <button className="pm" style={{ backgroundColor:e.toMeridian ? "#ccc":"#2B5F8E", color:e.toMeridian ? "#000":"#fff" }}>PM</button>
                    </div>
                    <div>
                        <button className="all_checked" onClick={handleAllChecked(e)}>
                            Apply to All Checked
                        </button>
                    </div>
                </div>
            ))}
        </form>
    );

    const showButton = () => (
        <div className="addlocation_action_button ft_button">
            <button onClick={toggleHandler("close")}>
                Cancel
            </button>
            <button onClick={toggleHandler(values)}>
                {current ? "Update":"Save"}
            </button>
        </div>
    );

    const showForm = () => (
        <div className="modal_popup">
            <div className="modal" ref={ref}>
                <div>
                    Facility Times
                </div>
                {FT()}
                {showButton()}
            </div>
        </div>
    )

    return (
        <Fragment>
            {showForm()}
        </Fragment>
    )
}) 

export default FacilityTimes;