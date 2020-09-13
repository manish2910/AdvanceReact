import React, { useState, useContext, useEffect } from "react";
import LocationContext from '../../context/locationContext';
import './AppointmentPool.css';

const AppointmentPool = ({ selectedTags }) => {
    const locationContext = useContext(LocationContext);
    let { current } = locationContext;

    const [tags, setTags] = useState([]);

    useEffect(()=>{
        if(current && current.appointMentTags){
            setTags(current.appointMentTags);
        }
    },[current]);

    const addTags = e => {
        if ((e.key === "Enter" || e.key === ",") && (e.target.value !== "" )) {
            let value = e.target.value;
            value = value.split(",");
            value = value[0];
            value = value.trim();
            if(value !== ''){
                console.log(value);
                setTags([...tags, value]);
                selectedTags([...tags, value]);
            }
            e.target.value = "";
        }
    };

    const removeTags = e => {
        setTags([...tags.filter((tag, i) => i !== e)]);
        selectedTags([...tags.filter((tag, i) => i !== e)]);
    };

    return (
        <div className="tags-input">
            <ul id="tags">
            {tags.map((tag, i) => (
                <li key={i} className="tag">
                    <span className='tag-title'>{tag}</span>
                    <span
                        className='tag-close-icon'
                        onClick={() => removeTags(i)} 
                    >
                        X
                    </span>
                </li>
            ))}
            </ul>
            <input type="text" onKeyUp={e => addTags(e)} placeholder={tags.length !== 0 ? "" : "Press enter or comma to add tags"} />
        </div>
    );
};

export default AppointmentPool;