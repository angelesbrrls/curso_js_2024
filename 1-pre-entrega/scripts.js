const nombre = prompt("Escriba su nombre: ");
alert("¡Hola! Bienvenid@ " + nombre);
console.log("Nombre del usuario que ha ingresado ", nombre);
alert(
  "En esta tienda en línea podrá agregar productos (artículos y accesorios) para sus gatitos que no le pueden faltar... \nDisfrute su estancia!!!"
);


let productos = []; // Declaración de un array
let totalAPagar = 0; // El total de los precios agregados

do {
  continua = false
  function agregarProductos() { // Función para agregar productos 
   
    let articulo = prompt("Escriba el artículo que desea agregar a su compra: ");
    if (articulo != '' && articulo != null && articulo != undefined){
        productos.push({ nombre: articulo, precio: getRandomInt() });
        console.table(productos);
        continua = confirm("¿Desea agregar un nuevo producto?");
    } 
  }
  agregarProductos();
  calculaTotal(continua);
} while (continua);

// Función para sumar el precio total de los productos agregados
function calculaTotal(continua) {
  totalAPagar = 0 
  for (let producto of productos) {
    totalAPagar += producto.precio;
    console.log("Total acumulado: ", totalAPagar);
  }
  if (!continua) {
    alert("El total de su compra es: " + totalAPagar);
    if (confirm("¿Desea ver el detalle de su compra?")) {
      mostrarDetalleCompra();
    }
  }
}

// Función para mostrar los productos agregados
function mostrarDetalleCompra() {
  let detalle = "";
  for (let producto of productos) {
    detalle += "Nombre del producto: " + producto.nombre + ", Precio Unitario: " + producto.precio + "\n";
  }
  alert(detalle + "Total a pagar: " + totalAPagar);
  alert('Gracias por su visita ' + nombre + '. ¡Vuelva pronto!');
  console.log("Total", totalAPagar);
}

// Función para generar un número random para simular precio del producto
function getRandomInt() {
    min = Math.ceil(100);
    max = Math.floor(500);
    return Math.floor(Math.random() * (max - min) + min);
}