let SHEET_ID = '1aASoEKK2ZGR0mJpz_5oSUf6shdo_tDwQEP2ZwxpiTvY'
let SHEET_TITLE = 'Membros';
let SHEET_RANGE = 'A2:D50'

let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

fetch(FULL_URL)
.then(res => res.text())
.then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0,-2));

    console.log("API OKAY");
    
    const carousel_inner = document.getElementById('carousel_inner');
    const carousel_indicators = document.getElementById('carousel_indicators');

    let length = data.table.rows.length;

    console.log(`Total de membros bolsistas: ${length}`);

    for(let x = 0; x < length ; x++){

        console.log(x)

        const figure = document.createElement('figure');
        const li = document.createElement('li');
            li.setAttribute('data-bs-target', '#slideshow');
            li.setAttribute('data-bs-slide-to', `${x}`);
            if(x == 0){
                figure.className = 'carousel-item active';
                li.className = "active";
            }else{
                figure.className = 'carousel-item'; 
            }

        const img = document.createElement('img');
            img.src = `${data.table.rows[x].c[3].v}`;
            img.className = "img-fluid";
        const figcaption = document.createElement('figcaption');
            figcaption.className = 'carousel-caption';
        
        const p = document.createElement('p');
            p.className = 'fs-2 bg-glass-white card text-dark';
            p.innerText = `${data.table.rows[x].c[0].v}`;
        const a = document.createElement('a');
            a.className = 'btn btn-warning fw-bold';
            a.innerText = `${data.table.rows[x].c[1].v}`; 
            a.href = `${data.table.rows[x].c[4].v}`;
        

        //console.log(data.table.rows[x].c[0].v);
        //console.log(data.table.rows[x].c[1].v);
        //console.log(data.table.rows[x].c[2].v);
        //console.log();
        //console.log(data.table.rows[x].c[4].v);

        figcaption.append(p);
        figcaption.append(a);
        
        figure.append(img);
        figure.append(figcaption);
        carousel_inner.append(figure);
        carousel_indicators.append(li);

        console.log("Dados enviados para página!")
    }
});