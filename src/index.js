import React, {useState} from "react";
import {render} from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

const WeatherApp = () => { 
    const [temp_k, setTemp_k] = useState("-");
    const [temp_c, setTemp_c] = useState("-");
    const [temp_f, setTemp_f] = useState("-");
    const [city, setCity] = useState("Rasht");
    const [country, setCountry] = useState("Iran");
    const [res_city, setRes_city] = useState("");
    const [res_country, setRes_country] = useState("");
    const [icon, setIcon] = useState("");
    const [condition, setCondition] = useState("");
    const [description, setDescription] = useState("");
    const APIkey = "cc4d5177f016efd3f1c5fed5d705eb73";
    const link = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}`;
    const img_src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    var color;

    const getWeather = () => { 
        if(city === ""){
            alert("insert city first");
            return;
        }
        axios({
            method: "GET",
            url: link,
        })
        .then((response) => {
            console.log(response.data);
            //Kelvin Temperature 
            setTemp_k(response.data.main.temp);
            //Celcius Temperature
            setTemp_c((response.data.main.temp - 273.15));
            //Farenheit Temperature
            setTemp_f((response.data.main.temp - 273.15) * 1.8 + 32);
            setIcon(response.data.weather[0].icon);
            setCondition(response.data.weather[0].main);
            setDescription(response.data.weather[0].description);
            setRes_city(response.data.name);
            setRes_country(response.data.sys.country);
        })  
        .catch((error) => {
            console.log(error);
            alert("Weather of "+city+" not found");
        }); 
    };

        if(temp_c <= 2){color = "lightblue"}
        else if(temp_c < 15){color = "aliceblue";}
        else if(temp_c < 25){color = "lightyellow";}
        else if(temp_c < 33){color = "PeachPuff";}
        else if(temp_c >= 33){color = "LightSalmon";}
  
        return ( 
            <div style={{backgroundColor:color}}>
                <div style={{textAlign:"center", backgroundColor:"lightgray"}}>
                    <br/>
                    <h1>Weather App</h1>
                    <h4>made using OpenWeatherMap API</h4>
                    <br/>   
                </div>
                <div className = "row" style={{padding:"3vw", alignItems:"center"}}>
                    <div className="col-md-6" style={{paddingLeft: "7vw"}}>
                    <div style={{width:"20vw"}}>
                        <br/>
                        <label>City</label>
                        <input 
                            type="text"  className="form-control" 
                            placeholder="Enter City" value = {city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <br/>
                        <label>Country</label>
                        <input 
                            type="text"  className="form-control" 
                            placeholder="Enter Country" value = {country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <br/>
                        <button 
                            className="btn btn-primary"
                            onClick={() => {getWeather(city,country)}}>
                            Submit
                        </button>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingRight: "7vw"}} >
                    <h4>Weather of {res_city} in {res_country}: </h4>
                    <br/>
                    <img src={img_src} alt={description} className="img-thumbnail"/>
                    <br/>
                    <br/>
                    <h5>{condition} - {description}</h5>
                    <br/>
                    <h5>Kelvin Temperature: {Math.round(temp_k)} °K</h5>
                    <h5>Celcius Temperature: {Math.round(temp_c)} °C</h5>
                    <h5>Farenheit Temperature: {Math.round(temp_f)} °F</h5>
                </div>
            </div>
        </div>
        );
    };

render(<WeatherApp />, document.querySelector("#root"));

