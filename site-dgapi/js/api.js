// variavel
let url = "https://dragonball-api.com/api/characters?limit=100";
// console.log = comando para escrever algo no console da página
//console.log(url);
// comando para mostrar uma caixa de mensagem na tela
// alert(url);
// comando para ler uma página json (api)
let personagens;
let request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'json';
request.send();

//função anonima que executa após o retorno da API
request.onload = function () {
    //Guardei o retorno da página na variavel
    let dados = request.response;
    personagens = dados["items"];
    //console.log(personagens);
    //console.log(personagens[0]["name"]);
    let total = dados["meta"]["itemCount"];
    //console.log(total);

    let html = '';
    for (let i = 0; i < total; i++) {
        html += `<div class="col" data-aos="zoom-in" >`;
        html += `<div class="card h-100" >`;
        html += `<a class="mx-auto" href="${personagens[i]["image"]}" data-lightbox="roadtrip" data-title="${personagens[i]["name"]}"><img src="${personagens[i]["image"]}" class="card-img-fluid mt-2"`;
        html += `style="max-height: 300px; max-width:95%" alt=""></a>`;
        html += `<div class="card-body pb-1">`;
        html += `<h1>${personagens[i]["name"]}</h1>`;
        html += `<p class="mb-0"><strong>Ki: </strong>${personagens[i]["ki"]}<br>`;
        html += `<strong>Raça: </strong>${personagens[i]["race"]}<br>`;
        html += `<strong>Genero: </strong>${personagens[i]["gender"]}`;
        html += `</p>`;
        html += `</div>`;
        html += `<div class="card-footer bg-white border-top-0 text-center mb-0">`;
        html += `<button type="button" onclick="mostrar(${i});" class="btn btn-outline-dark w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">`;
        html += `Leia mais...`;
        html += `</button>`;
        html += `</div>`;
        html += `</div>`;
        html += `</div>`;
    }
    document.getElementById("personagens").innerHTML = html;

}

function mostrar(i) {

    document.getElementById("transformacao").innerHTML = '<div class="d-flex align-items-center container my-5"><strong role="status">Carregando...</strong><div class="spinner-border ms-auto" aria-hidden="true"></div></div>';

    document.getElementById("exampleModalLabel").innerHTML =
        personagens[i]["name"];
    document.getElementById("imgModal").src =
        personagens[i]["image"];
    document.getElementById("descModal").innerHTML =
        personagens[i]["description"];
    document.getElementById("transformacao").innerHTML = "";

    let url = `https://dragonball-api.com/api/characters/${personagens[i]["id"]}`;
    let request2 = new XMLHttpRequest();
    request2.open('GET', url);
    request2.responseType = 'json';
    request2.send();

    request2.onload = function () {
        //Guardei o retorno da página na variavel
        let dados = request2.response;
        transformacao = dados["transformations"];

        total = Object.keys(transformacao).length;
        let html = '';
        for (let i = 0; i < total; i++) {
            html += `<div class="col-auto text-center">`;
            html += `<a href="${transformacao[i]["image"]}" data-lightbox="transformacao" data-title="${transformacao[i]["name"]}"><img class="img-fluid" src="${transformacao[i]["image"]}" style="max-height:200px !important;"></a>`;
            html += `</div>`;
        }
        console.log(total);
        document.getElementById("transformacao").innerHTML = html;
    }

}

