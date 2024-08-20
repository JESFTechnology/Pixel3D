import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore , collection, getDocs, query } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyAKFHeOlxxbia66vTYJAdYKiJKO216BgvY",
    authDomain: "game-online-ifmachado.firebaseapp.com",
    projectId: "game-online-ifmachado",
    storageBucket: "game-online-ifmachado.appspot.com",
    messagingSenderId: "957180730749",
    appId: "1:957180730749:web:7d40dc1fce8f0d01514014",
    measurementId: "G-5WVDHQD2YS",
    databaseURL: "https://game-online-ifmachado-default-rtdb.firebaseio.com/",
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);
auth.languageCode = 'pt';
provider.addScope('');

let tela = 7;

if(localStorage.getItem("tela") == null || localStorage.getItem("tela") == undefined){
  tela = 7;
}else{
  tela = parseInt(localStorage.getItem("tela"));
}


const menu = document.getElementById("menu");

const life = document.getElementById("life");

const alerta = document.getElementById("alert")
alerta.style.opacity = 0
const alert_text = document.getElementById("alert-text")

life.style.left = window.innerWidth-300;

menu.style.opacity = 0
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

const inventario = []
const itens_no_chao = []

function tirarDoChao(nome){
  remove(ref(db, `itens/${nome}`))
}

function addInventario(id, nome, img){
  //console.log("Colocando itens...")
  if(id == 0){
    id = inventario.length+1
    //alert(inventario.length+1)
  }
  if(inventario.length < 4){
    inventario.push({id:id, nome:nome, img:img})
    console.log(inventario.length)
    updateInventario()
  }
}

function updateInventario(){
  let slot = inventario.length
    for(let i = 1; i <= slot; i++){
        try{
          set(ref(db, "inventario/"+localStorage.getItem("uid")+`/${i}`), {
            item: inventario[i-1].nome,
            img: inventario[i-1].img,
          });
        }catch (e){
          console.log("Erro ao atualizar: ",e)
        }
    }
  atualizarTela()
}

function largarInventario(valor){
  //console.log("Limpando inventario")
    set(ref(db, "itens/"+inventario[valor-1].nome), {
      x: (parseInt(localStorage.getItem("x"))+35),
      y: (parseInt(localStorage.getItem("y"))+240),
      img: inventario[valor-1].img,
      tela: tela,
      class: "item_de_mao"
    });
    remove(ref(db, `inventario/${localStorage.getItem("uid")}/${valor}`))
    let index = inventario.findIndex((element) => element.id === valor);
    if (index !== -1) {
      inventario.splice(index, 1);
    } else {
      console.log(`Slot ${valor} está vazio`);
    }
    for(let i = 1; i <= 5; i++){
      if(i <= inventario.length){
      set(ref(db, `inventario/${localStorage.getItem("uid")}/${valor}`), {
        x: (parseInt(localStorage.getItem("x"))+35),
        y: (parseInt(localStorage.getItem("y"))+240),
        img: inventario[valor-1].img,
        tela: tela,
        class: "item_de_mao"
      });
      }else{
        try{
          remove(ref(db, `inventario/${localStorage.getItem("uid")}/${i}`))
        }catch{}
      }
    }
    updateInventario()
}

function atualizarTela(){
  console.log("Atualizando itens...")
  let slot = inventario.length
  for(let i = 1; i <= slot; i++){
    console.log("Atualizando inventario: "+slot)
    const div = document.getElementById(`item-menu-${i}`)
    try{
      const imagem = document.getElementById('img'+i)
      imagem.className = "ovo"
      imagem.src = inventario[i-1].img
    }catch{
      const imagem = document.createElement('img')
      imagem.id = "img"+i
      imagem.className = "ovo"
      imagem.src = inventario[i-1].img
      div.append(imagem)
    }
  }
}

//console.log(valorAleatorio2)
function gerarValorAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//const nascimentoOvo = gerarValorAleatorio(10, 1385);
//const lanterna = document.getElementById("lanterna");

//lanterna.style.opacity = 100

//lanterna.style.top = `${valorAleatorio2+20}px`;
//lanterna.style.left = `${valorAleatorio1+20}px`;

const coord = [valorAleatorio1,valorAleatorio2]

let yPos = 160;
let xPos = 0;

const nomeEstudante = document.getElementById("nomeEstudante")
const fotoEstudante = document.getElementById("fotoEstudante")

const mapa = document.getElementById("mapa")

function colocarPlayers(){
  console.log("Colocando personagens")
  
  const dbRef2 = ref(db, 'itens');

  onValue(dbRef2, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      if(tela == childData.tela){
      try{
          const childKey = childSnapshot.key;
          //console.log(childKey)
          const img = document.getElementById(childKey)
          img.style.position = "absolute" 
          img.style.opacity = 100
          img.style.top = `${childData.y}px`;
          img.style.left = `${childData.x}px`;
          //console.log(childData)
      }catch (e){
          const childKey = childSnapshot.key;
          const img = document.createElement("img")
          img.id = childKey;
          img.src = `${childData.img}`
          if(childData.class == "item_de_mao"){
            img.style.width = "35px"
            itens_no_chao.push({nome:childKey, tela:childData.tela, x:childData.x,y:childData.y,img:childData.img })
          }else{
            img.style.width = "200px"
          }
          img.style.position = "absolute" 
          img.style.top = `${childData.y}px`;
          img.style.left = `${childData.x}px`;
          mapa.append(img)
      }
    }else{
      try{
          const childKey = childSnapshot.key;
          const img = document.getElementById(childKey)
          img.style.opacity = 0
      }catch{}
    }
    });
  });

  const dbRef = ref(db, 'users'); 

  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
    const childData = childSnapshot.val();
    if(tela == childData.tela){
      try{
        if(localStorage.getItem("uid") != childSnapshot.key){
          const childKey = childSnapshot.key;
          //console.log(childKey)
          const img = document.getElementById(childKey)
          img.style.position = "absolute" 
          img.style.opacity = 100
          img.style.top = `${childData.y+200}px`;
          img.style.left = `${childData.x}px`;
            if(childData.img != undefined){
              img.src = childData.img
            }else{
              img.src = "https://art.pixilart.com/e00cff2d5f78554.png"
            } 
          //console.log(childData)
        }
      }catch (e){
        if(localStorage.getItem("uid") != childSnapshot.key){
          const childKey = childSnapshot.key;
          const img = document.createElement("img")
          img.id = childKey;
          if(childData.img != undefined){
              img.src = childData.img
          }else{
              img.src = "https://art.pixilart.com/e00cff2d5f78554.png"
          } 
          img.style.position = "absolute" 
          img.style.top = `${childData.y+200}px`;
          img.style.left = `${childData.x}px`;
          
          //console.log(childData)
          mapa.append(img)
        }
      }
    }else{
      try{
        if(localStorage.getItem("uid") != childSnapshot.key){
          const childKey = childSnapshot.key;
          const img = document.getElementById(childKey)
          img.style.opacity = 0
        }
      }catch{}
    }
    try{
      if(localStorage.getItem("uid") == childSnapshot.key){ 
        const childKey = childSnapshot.key;
        //console.log(childKey)
        const img = document.getElementById("myImage")
        img.style.position = "absolute" 
        img.style.top = `${childData.y+95}px`;
        img.style.left = `${childData.x}px`;
        //console.log(childData)
      }
    }catch (e){
      if(localStorage.getItem("uid") == childSnapshot.key){
        const childKey = childSnapshot.key;
        //console.log(childKey)
        const img = document.createElement("img")
        img.id = "myImage"
        img.src = childData.img
        img.style.position = "absolute" 
        yPos = childData.y;
        img.style.top = `${yPos}px`;
        xPos = childData.x;
        img.style.left = `${xPos}px`;
        localStorage.setItem("imgPerso", childData.img)
        //console.log(childData)
        mapa.append(img)
      }
    }
    });
  });

  const inventarioDB = ref(db, 'inventario/'+localStorage.getItem("uid"));

  onValue(inventarioDB, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
    const childData = childSnapshot.val();
    const childKey = childSnapshot.key;
    if (parseInt(childKey) > inventario.length && parseInt(childKey) < 6){
      let index = inventario.findIndex((element) => element.id === parseInt(childKey));
      if (index !== -1) {
        //console.log("Item "+childKey+" adicionado")
      } else {
        console.log("Item "+childKey+" adicionado")
        addInventario(parseInt(childKey), childData.item, childData.img)
        /*remove(ref(db, `inventario/${localStorage.getItem("uid")}/${childKey}`))
        set(ref(db, `inventario/${localStorage.getItem("uid")}/${inventario.length}`), {
          img: inventario[valor-1].img,
          iten: childData.item
        });*/
      }
    }
    });
  });
  trocarTela()
  updateInventario()
}

console.log("Online");

function trocarTela(){
  alert_text.textContent = ""
  alerta.style.opacity = 0
  if(tela == 1){

  }if(tela == 2){
    
  }if(tela == 3){
    
  }if(tela == 4){
    
  }if(tela == 5){
    
  }if(tela == 6){
    
  }if(tela == 7){
    mapa.style.backgroundImage = 'url(img/Laboratorio.png)'
  }if(tela == 8){
    mapa.style.backgroundImage = 'url(img/Laboratorio-3.png)'
  }
  
  if(tela == 17){
    mapa.style.backgroundImage = 'url(img/Laboratorio-2.png)'
  }

  if(tela == 18){
    mapa.style.backgroundImage = 'url(img/Laboratorio-2.png)'
  }
  localStorage.setItem("tela", tela)
  
}

function login(){
  //console.log(localStorage.getItem("uid"))
  if(localStorage.getItem("uid")){
    menu.style.opacity = 100
    nomeEstudante.innerText = localStorage.getItem("diplayname");
    fotoEstudante.src = localStorage.getItem("photoURL");
  }else{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    localStorage.setItem("uid", user.uid)
    localStorage.setItem("diplayname", user.displayName)
    localStorage.setItem("emailVerified", user.emailVerified)
    localStorage.setItem("email", user.email)
    localStorage.setItem("photoURL", user.photoURL)
    localStorage.setItem("tela", 7)
    window.location.href = "config.html";
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorMessage)
    // ...
  });
}
colocarPlayers()
}

login()

function atualizarCoord(userId, x, y, tela, imgPerso
) {
    set(ref(db, "users/"+userId), {
      x: x,
      y: y,
      tela: tela,
      img:imgPerso
    });
    localStorage.setItem("x",x)
    localStorage.setItem("y",y)
}

let corrida = false

let corrida_val = 10

window.addEventListener("keydown", function(event) {
    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;
    try{
    const image = this.document.getElementById("myImage")
    if(event.shiftKey == true){
      if(corrida == true){
        corrida = false
        this.alert("Corrida Desativada!")
        corrida_val = 10
      }else{
        corrida = true
        this.alert("Corrida ATIVADA!")
        corrida_val = 20
      }
    }
    //console.log(event.key)
    switch (event.key) {
        case "w":
          if(yPos >= 40){
            yPos -= corrida_val;
            image.style.top = `${yPos}px`;
          }
          break;
        case "s":
          if(yPos < 350)
          {yPos += corrida_val;
          image.style.top = `${yPos}px`;
          }
          break;
        case "a":
            xPos -= corrida_val;
            image.style.left = `${xPos}px`;
            break;
        case "d":
            xPos += corrida_val;
            image.style.left = `${xPos}px`;
            break;
        case "e":
          if(xPos >= 600 && xPos <= 780 && yPos <= 190 && yPos >= 4 && (tela == 7)){
                tela = 17
                xPos = 50;
                image.style.left = `${xPos}px`;
                trocarTela()
                colocarPlayers()
              }
              else if(xPos >= 10 && xPos <= 60 && yPos <= 100 && yPos >= 0 && (tela == 17)){
                tela = 7
                xPos = 690;
                image.style.left = `${xPos}px`;
                trocarTela()
                colocarPlayers()
              }else if(xPos >= 1000 && xPos <= 1160 && yPos <= 100 && yPos >= 0 && (tela == 8)){
                tela = 18;
                xPos = 60;
                yPos = 30;
                image.style.left = `${xPos}px`;
                image.style.top = `${yPos}px`;
                trocarTela()
                colocarPlayers()
               }else if(xPos >= 10 && xPos <= 60 && yPos <= 100 && yPos >= 0 && (tela == 18)){
                tela = 8
                xPos = 1080;
                yPos = 70;
                image.style.left = `${xPos}px`;
                image.style.top = `${yPos}px`;
                trocarTela()
                colocarPlayers()
                }/*else if(xPos >= nascimentoOvo-nascimentoOvo*0.2 && xPos <= nascimentoOvo+nascimentoOvo*0.1 && yPos <= 350 && yPos >= 310 && (tela == 7)){
                  let slot = inventario.length
                  if(slot > 4){
                    alert("Inventario cheio!")
                    return 0;
                  }
                  const img = document.getElementById("ovo")
                  img.style.opacity = 0
                  addInventario("ovo", "img/ovo.png")
                }*/
              break;
        case "1":
          console.log("Retirando item "+inventario[0].nome)
          largarInventario(1)
          window.location.href = "index.html";
          break;
        case "2":
          console.log("Retirando item "+inventario[1].nome)
          largarInventario(2)
          window.location.href = "index.html";
          break;
        case "3":
          console.log("Retirando item "+inventario[2].nome)
          largarInventario(3)
          window.location.href = "index.html";
          break;
        case "4":
          console.log("Retirando item "+inventario[3].nome)
          largarInventario(4)
          window.location.href = "index.html";
          break;
        }
    if(tela == 7 && xPos >= larguraTela-60){
        xPos = 10
        tela = 8
        image.style.left = `${xPos}px`;
        trocarTela()
    }
    if(tela == 8 && xPos < 3){
      xPos = larguraTela-70
      tela = 7
      image.style.left = `${xPos}px`;
      trocarTela()
    }
    //console.log(lanterna.style.opacity)
    /*if(xPos >= coord[0]-30 && xPos <= coord[0]*1.1 && yPos >= coord[1]-150 && yPos <= coord[1]+100 && lanterna.style.opacity != 0){
        this.alert("Você pegou uma lanterna!")
        lanterna.style.opacity = 0
    }*/
   if(xPos >= 600 && xPos <= 780 && yPos <= 190 && yPos >= 4 && (tela == 7)){
    alert_text.textContent = "Aperte E para entrar."
    alerta.style.opacity = 100
   }
   else if(xPos >= 10 && xPos <= 60 && yPos <= 100 && yPos >= 0 && (tela == 17)){
    alert_text.textContent = "Aperte E para sair."
    alerta.style.opacity = 100
   }else if(xPos >= 1000 && xPos <= 1160 && yPos <= 100 && yPos >= 0 && (tela == 8)){
    alert_text.textContent = "Aperte E para entrar."
    alerta.style.opacity = 100
   }else if(xPos >= 10 && xPos <= 60 && yPos <= 100 && yPos >= 0 && (tela == 18)){
    alert_text.textContent = "Aperte E para sair."
    alerta.style.opacity = 100
   }
   /*else if(xPos >= nascimentoOvo-nascimentoOvo*0.2 && xPos <= nascimentoOvo+nascimentoOvo*0.1 && yPos <= 350 && yPos >= 310 && (tela == 7)){
    alert_text.textContent = "Aperte E para pegar."
    alerta.style.opacity = 100
   }*/
   else{
    alert_text.textContent = ""
    alerta.style.opacity = 0
   }

  atualizarCoord(this.localStorage.getItem("uid"), xPos, yPos, tela, this.localStorage.getItem("imgPerso"));
  //console.log(xPos+35)
  //console.log(yPos+250)
  for(let i = 0; i < itens_no_chao.length; i++){
    if(itens_no_chao[i].tela == tela && xPos+35 >= (itens_no_chao[i].x)-(itens_no_chao[i].x)*0.1 && xPos+35 <= (itens_no_chao[i].x)+(itens_no_chao[i].x)*0.1 && yPos+250 >= (itens_no_chao[i].y)-(itens_no_chao[i].y)*0.1 && yPos+250 <= (itens_no_chao[i].y)+(itens_no_chao[i].y)*0.1){
      alert_text.textContent = "Aperte E para pegar "+itens_no_chao[i].nome
      alerta.style.opacity = 100
      if(event.key == "e"){
        addInventario(0,`${itens_no_chao[i].nome}`,`${itens_no_chao[i].img}`)
        tirarDoChao(`${itens_no_chao[i].nome}`)
        window.location.href = "index.html";
      }
    }
    }
  }catch{

    }
  }); 


  if(localStorage.getItem("tela")){
    tela = parseInt(localStorage.getItem("tela"));
    trocarTela()
  }
