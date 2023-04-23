const URL_BASE = 'https://digimon-api.vercel.app/api/digimon';
const URL_NAME = URL_BASE + '/name/';
const URL_LEVELS = URL_BASE + '/level/';
let contenido;


function tabla(datos) {
    contenido.innerHTML = "";
    document.getElementById("tabla").style.display = "table";

    for (let temp of datos) {
        contenido.innerHTML += 
        `<tr class="trDigimon">
        <th scope="row">${temp.name}</ th>
            <td><image src="${temp.img}" data-bs-toggle="modal" data-bs-target="#modalImagen" width=80px height=80px></td>
            <td>${temp.level}</td>
        </tr>`
    }

    const filasDigimon = document.querySelectorAll(".trDigimon");
    for (let index = 0; index < filasDigimon.length; index++) {
        let nombreDigimon = filasDigimon[index].children[0]
        let imgDigimon = filasDigimon[index].children[1].children[0];
        
        imgDigimon.addEventListener("click", () => {
            imgModal.src = imgDigimon.src;
            titleModal.innerHTML = nombreDigimon.innerText;
        })
    }
      
    

}

function mostrar(name) {
    alert(name);
}


function mostrarNombres() {
    if (document.getElementById("nombre").value == "") {
        alert("Ingrese un personaje.");
    }
    else {
        nombrePersonaje = document.getElementById("nombre").value;
        document.getElementById("galeria").style.display = "none";
        
        fetch(URL_NAME + nombrePersonaje)
            .then(response => response.json())
            .then(datos => {
                if (!datos.error) {
                    tabla(datos);
                }
            });
    }
}


function mostrarImagenes() {
    document.getElementById("tabla").style.display = "none";
    document.getElementById("galeria").style.display = "block";
    document.getElementById("galeria").innerHTML = "";

    for (let temp of dataImagenes) {
        document.getElementById("galeria").innerHTML += `
            <div  id="card" class="card text-white bg-primary">
                <img src="${temp.img}" class="card-img-top" alt='${temp.name}'>
                <div class="card-body">
                    <h5 class="card-title"><b>${temp.name}</b></h5>
                    <p class="text-dark"><b>${temp.level}</b></p>
                </div>
            </div>
            `
    }
}

function mostrarNiveles() {
    if (document.getElementById("nombre").value == "") {
        alert("Ingrese un nivel.");
    }
    else {
        document.getElementById("tabla").style.display= "none";
        document.getElementById("galeria").style.display = "none";
        nombreNivel = document.getElementById("nombre").value;
        fetch(URL_LEVELS + nombreNivel)
            .then(response => response.json())
            .then(dataNiveles => {
                if (!dataNiveles.error) {
                    tabla(dataNiveles);
                }
            });
            
    }
}


$(document).ready(function () {

    contenido = document.getElementById("listado");
    carta = document.getElementById("tarjeta");
    imgModal = document.getElementById("imgModal");
    titleModal = document.getElementById('titleModal');
    

    fetch(URL_BASE)
        .then(response => response.json())
        .then(datos => {
            if (!datos.error) {
                tabla(datos);
                dataImagenes = JSON.parse(JSON.stringify(datos));
            }
        });

})