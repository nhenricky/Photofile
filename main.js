

document.addEventListener("DOMContentLoaded", carregarGaleria);

// Evento de clique para adicionar foto
document.getElementById("add-btn").addEventListener("click", adicionarFoto);

function carregarGaleria() {
    const fotos = obterFotosDoStorage();
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    fotos.forEach((url, index) => {
        criarElementoFoto(url, index);
    });
}

function adicionarFoto() {
    const input = document.getElementById("upload");
    const file = input.files[0]; // Pega o primeiro arquivo selecionado

    if (file) {
        const reader = new FileReader();
        
        // Converte a imagem para Base64 para salvar no localStorage
        reader.onload = function (e) {
            const base64Image = e.target.result;
            const fotos = obterFotosDoStorage();
            
            fotos.push(base64Image);
            localStorage.setItem("galeriaFotos", JSON.stringify(fotos));

            carregarGaleria();
            input.value = ""; // Limpa o campo de upload
        };

        reader.readAsDataURL(file);
    } else {
        alert("Selecione uma imagem primeiro!");
    }
}

function criarElementoFoto(url, index) {
    const gallery = document.getElementById("gallery");

    const item = document.createElement("div");
    item.classList.add("gallery-item");

    const img = document.createElement("img");
    img.src = url;

    const btn = document.createElement("button");
    btn.classList.add("delete-btn");
    btn.innerHTML = "&times;";
    btn.onclick = function () {
        deletarFoto(index);
    };

    item.appendChild(img);
    item.appendChild(btn);
    gallery.appendChild(item);
}

function deletarFoto(index) {
    let fotos = obterFotosDoStorage();
    fotos.splice(index, 1); // Remove a foto do array pelo índice
    localStorage.setItem("galeriaFotos", JSON.stringify(fotos));
    carregarGaleria();
}

function obterFotosDoStorage() {
    const fotos = localStorage.getItem("galeriaFotos");
    return fotos ? JSON.parse(fotos) : [];
}
