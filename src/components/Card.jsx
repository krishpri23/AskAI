import React from "react";
import { MdLocationOn } from 'react-icons/fa';


export default function Card (props) {
    const img = props.item.imageUrl;
    return (
        <div className="cards-section">
            <div className="card--container">
                <div className="img-container">
                    <img className="card-img" src={img} alt="mount fuji" />
                </div>   
                    <div className="card--content--container" >
                        <div className="card--title--content">
                                <MdLocationOn/> 
                                <h3>{props.item.location}</h3>
                                <a href={props.item.googleMapsUrl}>view on google maps</a>
                        </div>
                    <h2>{props.item.title}</h2>
                    <h5>{props.item.startDate + ' - ' + props.item.endDate}</h5>
                    <p> {props.item.description} </p>    
                    </div>

            
            </div>
           
        </div>
      
            
       
    )
}