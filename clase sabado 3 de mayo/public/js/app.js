let paginaActual = 1; // Página inicial

function fetchData(productName) {
    let offset = (paginaActual - 1) * 10; // Calcula el desplazamiento según la página actual
    let url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=10`;

    if (productName !== undefined) {
        url += `&title=${productName}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            showData(data); // Muestra los productos en la tabla
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
}

function showData(productos) {
    let tabla = document.getElementById("table");
    tabla.innerHTML = ''; // Limpiar contenido anterior

    let html = "";
    productos.forEach(producto => {
        html += `<thead>
                <tr>
                    <th>Titulo</th>
                    <th>Precio</th>
                    <th>descripcion</th>
                    <th>Categoria</th>
                    <th>imagen</th>
                </tr>
            </thead>
            <tr>
                <td>${producto.title}</td>
                <td>${producto.price}</td>
                <td>${producto.description.slice(0, 9) + '...'}</td>
                <td>${producto.category.name}</td>
                <td><a href="${producto.category.image}">Imagen del Producto</a></td>
            </tr>
        `;
    });
    tabla.innerHTML = html;
}

function avanzarPagina() {
    paginaActual++; // Incrementamos la página
    fetchData(); // Cargamos nuevos datos
}

function retrocederPagina() {
    if (paginaActual > 1) { // Evita retroceder más allá de la primera página
        paginaActual--;
        fetchData();
    }
}

function findData() {
    const input = document.getElementById("buscar");

    input.addEventListener("input", function (event) {
        fetchData(event.target.value);
    });
}

// Inicializar datos al cargar la página
fetchData();
findData();
