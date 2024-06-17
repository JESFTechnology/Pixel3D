function api(){
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Machado&units=metric&appid=7d0bb72edfcdb3e4351bb2f5e40950ee')
                .then(response => response.json())
                .then(data => {
                        document.getElementById('temperature').innerText = `IF: ${data.main.temp}°C`;
                        document.getElementById('humidity').innerText = `${data.main.humidity}%`;
                        console.log("Weather Okay!")
                })
        .catch(
                error => {
                
                }
        );
}

api()