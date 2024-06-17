function getPrinters() {
let SHEET_ID = '1aASoEKK2ZGR0mJpz_5oSUf6shdo_tDwQEP2ZwxpiTvY'
let SHEET_TITLE = 'Impressoras3D';
let SHEET_RANGE = 'A2:D20'

const FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);
fetch(FULL_URL)
.then(res => res.text())
.then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0,-2));

    const list3DPrint = document.getElementById('list3DPrint')

    console.log("Google Online!");

    let length = data.table.rows.length;

    console.log(length);
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
}
getPrinters()