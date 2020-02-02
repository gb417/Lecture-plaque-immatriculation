import React from 'react';
//import logo from './img/logo.svg';
import './css/App.css';


const App = () => {
    const APP_KEY = '';
    const API_req = 'https://api.openalpr.com/v2/recognize_bytes?recognize_vehicle=1&country=us&secret_key=';
    const API_identification = API_req + APP_KEY;

    const [creditused, setCreditused] = React.useState(0);
    const [credittotal, setCredittotal] = React.useState(0);
    const [result, setResult] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [query, setQuery] = React.useState('');
    const [imageurl, setImageurl] = React.useState('https://via.placeholder.com/640x360');

    React.useEffect(() => {
        getResult();
    }, [query]);


    const getResult = async () => {
        if (query !== '') {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", API_identification);
            // Send POST data and display response
            xhr.send(query);  // Replace with base64 string of an actual image
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    let response=JSON.parse(xhr.responseText);
                    console.log(response);
                    setCreditused(response.credits_monthly_used);
                    setCredittotal(response.credits_monthly_total);
                    setResult(response.results);
                }
            }
        }
    };


    const updateSearch = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageurl(reader.result);
            const [, base64] = reader.result.split(',');
            setSearch(base64);
        };
        if (file !== undefined) {
            reader.readAsDataURL(file);
        }
    };

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
    };

    return (
        <div className="App">
            <form onSubmit={getSearch} className="search-form" action="#">
                <input onChange={updateSearch}
                       type="file"
                       accept="image/png, image/jpeg"/>
                <button className="search-button" type="submit">
                    Search
                </button>
            </form>
            {result.map(voiture => (
                <div key={Math.random()}>
                    <p>Crédits utilisés : {creditused} sur {credittotal}</p>
                    <p>Plaque : {voiture.plate}</p>
                    <p>Couleur : {voiture.vehicle.color[0].name}</p>
                    <p>Constructeur : {voiture.vehicle.make[0].name}</p>
                    <p>Année : {voiture.vehicle.year[0].name}</p>
                    <p>Modèle : {voiture.vehicle.make_model[0].name}</p>
                    <p>Type de véhicule : {voiture.vehicle.body_type[0].name}</p>
                </div>
            ))}
            <p>
                <img src={imageurl} alt='osef'/>
            </p>
        </div>
    );
};

export default App;
