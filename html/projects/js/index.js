const body = document.getElementById('body')
const bodyWidth = document.body.offsetWidth;
if(bodyWidth > 665){
    body.className = 'body1'
}else{
    body.className = 'body2'
}