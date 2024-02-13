
let todayName= document.getElementById("today")
let month= document.getElementById("this-month")
let dayNo= document.getElementById("day-month")
let locationToday= document.getElementById("td-loc")
let degreeToday= document.getElementById("td-degree")
let imgToday= document.getElementById("td-img")
let todayDesc= document.getElementById("td-descr")
let todayHumidity= document.getElementById("humidity")
let todayWind= document.getElementById("wind")
let todayDir= document.getElementById("direction")

let nextDayName= document.getElementsByClassName("next-day")
let maximumTemp=document.getElementsByClassName("max-temp")
let minimumTemp=document.getElementsByClassName("min-temp")
let nextDaydesc=document.getElementsByClassName("next-descr")
let nextDayimg=document.getElementsByClassName("next-img")
let locationSearch=document.getElementById("location")
let date= new Date("2024-02-02")

async function getWeather(locationName){
   let response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d7cc55f8a2c949fbbdf152129240301&q=${locationName}&days=3`)

   let weather=await response.json()
   return weather
}

function todayData(data){
let todayDate=new Date()
    todayName.innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"})
    dayNo.innerHTML=todayDate.getDate()
    month.innerHTML=todayDate.toLocaleDateString("en-US",{month:"long"})
    locationToday.innerHTML=data.location.name
    degreeToday.innerHTML=data.current.temp_c
    imgToday.setAttribute("src",data.current.condition.icon)
    todayDesc.innerHTML=data.current.condition.text
    todayHumidity.innerHTML=data.current.humidity+"%"
    todayWind.innerHTML=data.current.wind_kph+" km/hr"
    todayDir.innerHTML=data.current.wind_dir
}


function nextDay(data){
let forecastD=data.forecast.forecastday
for(let i=0; i<2; i++){
    let nextdayDate= new Date(forecastD[i+1].date)
    nextDayName[i].innerHTML=nextdayDate.toLocaleDateString("en-US",{weekday:"long"})
    maximumTemp[i].innerHTML=forecastD[i+1].day.maxtemp_c 
    minimumTemp[i].innerHTML=forecastD[i+1].day.mintemp_c
    nextDayimg[i].setAttribute("src",forecastD[i+1].day.condition.icon)
    nextDaydesc[i].innerHTML=forecastD[i+1].day.condition.text
}
}


async function Application(loc="cairo"){
    let weather=await getWeather(loc)
    todayData(weather)
    nextDay(weather)
}
Application()

locationSearch.addEventListener('input',function(){
Application(locationSearch.value)


})

