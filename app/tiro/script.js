let yPos = 0;
let xPos = 0;

let tela = 0;

const menu = document.getElementById("menu");

const image = document.getElementById("myImage");

const life = document.getElementById("life");

life.style.left = window.innerWidth-300;

menu.style.opacity = 0
image.style.opacity = 0
menu.style.top = `${window.innerHeight-70}px`;

let valorAleatorio1 = Math.floor(Math.random() * window.innerWidth);
let valorAleatorio2 = Math.floor(Math.random() * window.innerHeight);

if(valorAleatorio1 < 300 || valorAleatorio1 > window.innerWidth-100){
    valorAleatorio1 = Math.floor(Math.random() * window.innerWidth-100);
}else{
    if(valorAleatorio2 < 100 || valorAleatorio1 > window.innerHeight*0.8){
        valorAleatorio2 = Math.floor(Math.random() * window.innerHeight);
    }
}

menu.style.opacity = 100
image.style.opacity = 100

console.log(valorAleatorio2 )

const lanterna = document.getElementById("lanterna");

lanterna.style.opacity = 100

lanterna.style.top = `${valorAleatorio2+20}px`;
lanterna.style.left = `${valorAleatorio1+20}px`;

const coord = [valorAleatorio1,valorAleatorio2]

window.addEventListener("keydown", function(event) {
    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;
    console.log(`Resolução da tela: ${larguraTela} x ${alturaTela}`);
    //console.log(event.key); // prints the key value (e.g. "a", "Shift", "Enter", etc.)
    //console.log(event.code); // prints the key code (e.g. "KeyA", "ShiftLeft", "Enter", etc.)
    //console.log(event.altKey); // prints true if the Alt key is pressed
    //console.log(event.ctrlKey); // prints true if the Ctrl key is pressed
    //console.log(event.shiftKey); // prints true if the Shift key is pressed
    switch (event.key) {
        case "w":
          yPos -= 10;
          image.style.top = `${yPos}px`;
          break;
        case "s":
          yPos += 10;
          image.style.top = `${yPos}px`;
          break;
        case "a":
            xPos -= 10;
            image.style.left = `${xPos}px`;
            break;
        case "d":
            xPos += 10;
            image.style.left = `${xPos}px`;
            break;
      }
    if(tela == 0 && xPos >= larguraTela){
        xPos = 0
        image.style.left = `${xPos}px`;
    }
    console.log(lanterna.style.opacity)
    if(xPos >= coord[0]-30 && xPos <= coord[0]*1.1 && yPos >= coord[1]-150 && yPos <= coord[1]+100 && lanterna.style.opacity != 0){
        this.alert("Você pegou uma lanterna!")
        lanterna.style.opacity = 0
    }

    console.log(xPos," | ",yPos)
  });