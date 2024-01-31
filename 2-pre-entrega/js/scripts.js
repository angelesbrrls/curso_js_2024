//Declaración de variables iniciales
//Lista de productos
let productos = [
  { id: 1, nombre: "Rascador", descripción: "Suave y calida, diversos colores", precio: 250 },
  { id: 2, nombre: "Cama", descripción: "Madera pino, resistente", precio: 500 },
  { id: 3, nombre: "Correa", descripción: "Mediana de diversos colores", precio: 200 },
  { id: 4, nombre: "Croquetas", descripción: "Nutrientes indispensables para una buena alimentación ", precio: 700 },
  { id: 5, nombre: "Antipulgas", descripción: "Talco antipulgas", precio: 400 },
  { id: 6, nombre: "Bebedero", descripción: "Fuente de Agua eléctrica", precio: 1200 },
  { id: 7, nombre: "Arenero", descripción: "Arenero automático", precio: 600 },
  { id: 8, nombre: "Collar", descripción: "Tamaño mediano, diversos colores", precio: 200 },
  { id: 9, nombre: "Placa de identificación", descripción: "Personalización de identificación", precio: 750 }
];
// Lista de productos seleccionados en el carrito
let productosSeleccionados = []

// Lista de productos que se guardan en el localstorage
localStorage.setItem("productos", JSON.stringify(productos));
localStorage.setItem("productosSeleccionados", JSON.stringify(productosSeleccionados));

// Variable para calcular el total de pago
let total_a_pagar = 0;

// Evento para el botón entrar
let boton = document.getElementById("btnEntrar");
boton.onclick = () => {
  saludar();
};

// Función para saludar
function saludar() {
  const nombre = (document.getElementById("nombre").value != '' ? document.getElementById("nombre").value : 'Invitado');
  localStorage.setItem("nombreInvitado", nombre);
  let inicio = document.getElementById("inicio");
  inicio.innerHTML = `<h3>Bienvenid@ ${nombre} </h3>
   <span class="notas">En esta tienda gatuna podrá encontrar productos indispensables para consentir a su más especial integrante de la familia</span>`;
  cargarProductos();
}

// Función para cargar los productos del catálogo
function cargarProductos() {
  const productosGuardados = JSON.parse(localStorage.getItem('productos'))
  let listaProductos = document.getElementById("listaProductos");
  for (let producto of productosGuardados) { 
    listaProductos.innerHTML += `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="color-title"> ${producto.nombre} </h5>
        <h1> ${producto.precio} $MX</h1>
        <p class="notas">${producto.descripción}</p>
        <button onclick="agregarProducto(${producto.id})" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Agregar al carrito" ><i class="bi bi-bag-plus-fill"></i></button>
      </div>
      </div>
    `;
  }
}

// Función para mostrar el detalle de los productos seleccionados
function mostrarDetalle(detalle, total, cantidad) {
  let carrito = document.getElementById("carrito");
  carrito.innerHTML = `
  <h4> Carrito de Compras</h4>
  <table class=\"table\">
  <thead>
    <tr>
      <th scope=\"col\">Producto</th>
      <th scope=\"col\">Precio</th>
      <th scope=\"col\"></th>
    </tr>
  </thead>
  <tbody> ${detalle} </tbody> </table>
  Ha agregado ${cantidad} producto(s). El total de su compra es: <b> $ ${total} MX. </b> `
}

//Función para calcular el total de los productos seleccionados
function calculoTotal() {
    let detalle = "";
    totalAPagar = 0
    for (let producto of productosSeleccionados) {
      detalle += ` <tr><td>${producto.nombre}</td><td> $ ${producto.precio}</td><td><button onclick="removerProducto(${producto.id})" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar producto del carrito"><i class="bi bi-trash-fill"></i></button></td></tr> `;
      totalAPagar += producto.precio;
    }
    mostrarDetalle(detalle, totalAPagar, productosSeleccionados.length)
    if(productosSeleccionados.length == 0){
      mostrarBotones('hidden')
    }
}

//Función para agregar un producto al carrito
function agregarProducto(idSeleccionado) {
  const found = productos.find((producto) => producto.id === idSeleccionado);
  productosSeleccionados.push(found);
  localStorage.setItem("productosSeleccionados", JSON.stringify(productosSeleccionados));
  calculoTotal();
  mostrarBotones('visible')
}

//Función para quitar un producto del carrito
function removerProducto(idSeleccionado) {
  productosSeleccionados= productosSeleccionados.filter(producto => producto.id !== idSeleccionado);
  localStorage.setItem("productosSeleccionados", JSON.stringify(productosSeleccionados));
  calculoTotal();
}

//Evento para el botón comprar
var botonPagar = document.getElementById("btnCompra");
botonPagar.addEventListener("click", function() {
  const invitado = localStorage.getItem("nombreInvitado");
  let inicio = document.getElementById("principal");
  inicio.innerHTML = `<h3>¡Gracias por tu compra! </h3>
   <p> <span class= "visita">${invitado}</span>... ¡Vuelve pronto!</p>`;
});

//Función para mostrar el botón Pagar
function mostrarBotones(accion){
    let bthCompra = document.getElementById("btnCompra");
    let bthLimpia = document.getElementById("btnLimpia");
    bthCompra.style.visibility=accion
    bthLimpia.style.visibility=accion
}

//Evento del botón limpiar el carrito de compra
var botonLimpiar = document.getElementById("btnLimpia");
botonLimpiar.addEventListener("click", function() {
  vaciarCarrito()
});

//Función para limpiar el carrito de compra
function vaciarCarrito(){
  productosSeleccionados= [];
  localStorage.setItem("productosSeleccionados", JSON.stringify(productosSeleccionados));
  calculoTotal()
}