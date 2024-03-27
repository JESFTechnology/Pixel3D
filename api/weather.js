function api(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Machado&units=metric&appid=7d0bb72edfcdb3e4351bb2f5e40950ee')
        .then(response => response.json())
            .then(data => {
                    document.getElementById('temperature').innerText = ` ${data.main.temp}°C`;
                    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
            })
    .catch(
        error => {
            
        }
        );  
}


function currentTime(){
    const date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";

    if (hh > 12) {
        hh = hh - 12;
        session = "PM";
    }

    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;

    const time = hh + ":" + mm + ":" + ss + " " + session;
    console.log(time);
    setTimeout(function() {
        currentTime();
        api();
    }, 120000);
}

currentTime();
api();