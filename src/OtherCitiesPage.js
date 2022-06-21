import React from 'react'
export default function OtherCitiesPage({cities,search,mainName,cLat,cLon}){
    function handleClick(city){
        search(city.lat,city.lon)
    }
    function createSmallCard(city){
        return(
            <div className={cLat===city.lat&&cLon===city.lon?"current small-card":"small-card"}onClick={()=>handleClick(city)}>
                <div>
                {city.name}
                </div>
                <div>|</div>
                <div>
                    {city.state}
                </div>
                <div>
                    {city.country}
                </div>
            </div>
        )
    }
    return(
        <div id="other-cities">
            <div className='bold'>Other Cities named {mainName}</div>
            {cities.map(x=>createSmallCard(x))}
        </div>
    )
}