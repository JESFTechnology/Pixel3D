let SHEET_ID = '1aASoEKK2ZGR0mJpz_5oSUf6shdo_tDwQEP2ZwxpiTvY'
let SHEET_TITLE = 'Comentarios';
let SHEET_RANGE = 'C2:G50'

const FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

function getData() {
fetch(FULL_URL)
.then(res => res.text())
.then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0,-2));

    console.log("Google Online!");
    
    const comentario = document.getElementById('comentarios');

    let length = data.table.rows.length;

    //console.log(length);

    for(let x = 0; x < length ; x++){
        
        const div = document.createElement('div');
            div.className = 'row border-bottom border-2 border-dark m-4';
        const p = document.createElement('p');
            p.innerText = `${data.table.rows[x].c[0].v} comentou: ${data.table.rows[x].c[2].v} | Avaliação: `;
            p.className = ''
        const i = document.createElement('i')
            i.className = 'fa-solid fa-star text-warning';
        const br = document.createElement('br');
        
        console.log(data.table.rows[x].c[0].v);
        //console.log(data.table.rows[x].c[1].v);
        console.log(data.table.rows[x].c[2].v);
        //console.log(data.table.rows[x].c[4].v);
        //console.log(data.table.rows[x].c[5].v);
        let v = 0
        v = data.table.rows[x].c[3].v
        for(let x = 0; x < v; x++){
            //<i class="fa-solid fa-star"></i>
            console.log("Exec: "+x)
            const i = document.createElement('i')
                i.className = 'fa-solid fa-star text-warning';
            p.append(i);      
        }
        div.append(p);
        comentario.append(div);
        comentario.append(br);
    }
});
}
getData()