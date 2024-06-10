

// 1st 
// const options={

// method: 'GET',
// headers:{
// 	'x-rapidapi-key': 'a687a3d566msh74902e0ebf97c96p186e9fjsn475f546c2380',
// 	'x-rapidapi-host': 'meteostat.p.rapidapi.com'
	
// }
// };

// fetch('https://meteostat.p.rapidapi.com/point/monthly?lat=52.5244&lon=13.4105&alt=43&start=2020-01-01&end=2020-12-31',options)
// .then(response=> response.json())
// .then(response =>console.log(response))
// .catch(err=>console.error(err));

//  3

const options={

method: 'GET',
headers:{
	'x-rapidapi-key': 'a687a3d566msh74902e0ebf97c96p186e9fjsn475f546c2380',
	'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
	
}
};

const getWeather=(city)=>
	{
cityname.innerHTML=city
fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city,options)
.then(response=> response.json())
.then(response =>{
	console.log(response)
cloud_pct.innerHTML =response.cloud_pct
temp.innerHTML = response.temp
feels_like.innerHTML = response.feels_like
humidity.innerHTML = response.humidity
// min_temp.innerHTML = response.min_temp
max_temp.innerHTML = response.max_temp
wind_speed.innerHTML = response.wind_speed
wind_degrees.innerHTML = response.wind_degrees
// sunrise.innerHTML = response.sunrise
// sunset.innerHTML = response.sunset
sunrise.innerHTML = new Date(response.sunrise * 1000).toLocaleTimeString();
sunset.innerHTML = new Date(response.sunset * 1000).toLocaleTimeString();
temp2.innerHTML = response.temp
humidity2.innerHTML = response.humidity
wind_speed2.innerHTML = response.wind_speed

saveSearch(city, response);
displayRecentSearches();

})
.catch(err=>console.error(err));

}

submit.addEventListener("click",(e)=>{
	e.preventDefault()
	getWeather(city.value)
})
submit2.addEventListener("click",(e)=>{
	e.preventDefault()
	getWeather(city2.value)
})

getWeather("Delhi")

function saveSearch(city, data) {
    let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    const search = {
        city: city,
		temp : data.temp,
		humidity : data.humidity,
		sunrise : data.sunrise,
		sunset : data.sunset,
		wind_speed : data.wind_speed,
		
        timestamp: new Date().toISOString()
    };
    searches.unshift(search);

    if (searches.length >5 ) {
        searches.pop();
    }
    localStorage.setItem('recentSearches', JSON.stringify(searches));
}

function displayRecentSearches() {
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    const searchTableBody = document.getElementById('searchTableBody');
    searchTableBody.innerHTML = '';
    
	
    
			
    searches.forEach(search => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${search.city}</td>
            <td>${search.temp}°C</td>
            <td>${search.humidity}%</td>
            <td>${new Date(search.sunrise * 1000).toLocaleTimeString()}</td>
            <td>${new Date(search.sunset * 1000).toLocaleTimeString()}</td>
            <td>${search.wind_speed} m/s</td>
        `;
		if (searches.length !=0)
       		 searchTableBody.appendChild(row);
		
    });
}

document.addEventListener('DOMContentLoaded', displayRecentSearches);;