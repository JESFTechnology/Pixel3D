let SHEET_ID = '1aASoEKK2ZGR0mJpz_5oSUf6shdo_tDwQEP2ZwxpiTvY'
let SHEET_TITLE = 'Impressões3D';
let SHEET_RANGE = 'B2:E20';

const FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0,-2));
        let length = data.table.rows.length;
        const arquivosEFotos = document.getElementById('arquivosEFotos');
        for(let x = 0; x < length ; x++){
            const tr = document.createElement('tr')
            const thData = document.createElement('td')
            const thLink = document.createElement('td')
            const thQuant = document.createElement('td')
            const thStatus = document.createElement('td')

            thData.innerText = `${data.table.rows[x].c[0].v}`
            thLink.innerText = `${data.table.rows[x].c[1].v}`
            thQuant.innerText = `${data.table.rows[x].c[2].v}`
            if(data.table.rows[x].c[3].v == null){
                thStatus.innerText = `Em espera`;
            }else{
                thStatus.innerText = `Pronto`;
            }

            tr.append(thData)
            tr.append(thLink)
            tr.append(thQuant)
            tr.append(thStatus)
            arquivosEFotos.append(tr)
        }
    }); 