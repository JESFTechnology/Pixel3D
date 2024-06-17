let SHEET_ID = '1aASoEKK2ZGR0mJpz_5oSUf6shdo_tDwQEP2ZwxpiTvY'

function getData() {
    const bodyWidth = document.body.offsetWidth;
    console.log("Val Width:")
    console.log(bodyWidth);

    let SHEET_TITLE = 'Jornal';

    let SHEET_RANGE = 'A2:F20';

    const FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);
    fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0,-2));
        
        const carousel_inner = document.getElementById('carousel_inner_2');
        const carousel_indicators = document.getElementById('carousel_indicators_2');

        let length = data.table.rows.length;

        for(let x = 0; x < length ; x++){

            const figure = document.createElement('figure');
            const li = document.createElement('li');
                li.setAttribute('data-bs-target', '#slideshow');
                li.setAttribute('data-bs-slide-to', `${x}`);
                if(x == 0){
                    figure.className = 'carousel-item active';
                    li.className = "active";
                    console.log("0 ==",x)
                }else{
                    figure.className = 'carousel-item'; 
                    console.log("0 !=",x)
                }

            const img = document.createElement('img');
                if(bodyWidth > 665){
                    img.src = `${data.table.rows[x].c[3].v}`;
                }else{
                    img.src = `${data.table.rows[x].c[4].v}`
                }
                img.className = "img-fluid";
            const figcaption = document.createElement('figcaption');
                figcaption.className = 'carousel-caption';
            
            const p = document.createElement('p');
                p.className = 'fs-2 bg-glass-white card text-dark';
                p.innerText = `${data.table.rows[x].c[0].v}`;
            const a = document.createElement('a');
                a.className = 'btn btn-warning fw-bold';
                a.innerText = `${data.table.rows[x].c[1].v}`; 
                a.href = `${data.table.rows[x].c[5].v}`;
            

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
        }
    });
}

function getPrinters() {
    let SHEET_TITLE = 'Impressoras3D';
    let SHEET_RANGE = 'A2:D20'
    
    const FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);
    fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0,-2));
    
        const list3DPrint = document.getElementById('list3DPrint')
    
        let length = data.table.rows.length;

        for(let x = 0; x < length ; x++){
            const div = document.createElement('div')
            div.className = "col-md-3 pb-3";
    
            const div2 = document.createElement('div')
            div2.className = "card border-dark h-100";
    
            const img = document.createElement('img')
            img.className = "card-img-top";
            img.src = `${data.table.rows[x].c[2].v}`
    
            const div3 = document.createElement('div')
            div3.className = "text-white bg-info card-header border-dark bg-gradiente";
    
            const h5 = document.createElement('h5')
            h5.innerText = `${data.table.rows[x].c[0].v} - ${data.table.rows[x].c[1].v}` 
    
            const div4 = document.createElement('div')
            div4.className = "card-body mb-5";
    
            const p = document.createElement('p')
            p.innerText = `${data.table.rows[x].c[3].v}`
    
            div4.append(p)
            div3.append(h5)
            div2.append(img)
            div2.append(div3)
            div2.append(div4)
            div.append(div2)
            list3DPrint.append(div)
        }
    });
    getData()
    }
getPrinters()