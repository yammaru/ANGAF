import React, {useEffect} from "react";

const  MapQuest = ({height ,width , center ,tileLayer, zoom , apiKey})=>{

    useEffect(()=>{
        window.L.mapquest.key = apiKey;

       window.L.mapquest.map('map', {
            center,
            layers: window.L.mapquest.tileLayer(tileLayer),
            zoom,
        });
    },[]);

    return(
        <div
					id="map"
					className="container"
					style={{
						zIndex:1,
						background: "#D7E8E4",
						width: width || 400 ,
						height: height || 280,
					}}
				>
            <p>
                Loading..
            </p>
        </div>
    );

};

export default  MapQuest;