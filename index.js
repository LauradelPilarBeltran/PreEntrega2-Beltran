class Carrito {
    constructor() {
        this.productos = [];
    }

    enElCarrito(nuevoProducto) {
        return this.productos.find((producto) => producto.nombre === nuevoProducto.nombre)
    }

    agregar(nuevoProducto) {

        if (!nuevoProducto.nombre.trim()) {
            alert("El nombre del producto no puede estar vacío.");
            return;
        }

        if (this.enElCarrito(nuevoProducto)) {
            let index = this.productos.findIndex(producto => producto.nombre === nuevoProducto.nombre);
            let producto = this.productos[index];
            producto.cantidad += 1;
            producto.precio += nuevoProducto.precio;
        } else {
            this.productos.push(nuevoProducto);
            alert("El producto " + nuevoProducto.nombre + " fue agregado al carrito");
        }
        this.listar();
    }

    listar() {
        console.clear();
        console.log("Mis productos en el carrito: ");
        this.productos.forEach((producto) => {
            console.log("Nombre: " + producto.nombre);
            console.log("Precio: " + producto.precio);
            console.log("Cantidad: " + producto.cantidad);
            console.log("_______________________________");
        });

        let total = this.productos.reduce((acumulador, producto) => acumulador + producto.precio, 0);
        console.log("Total del carrito: $" + total);
    }

    quitar(nombre) {
        let productoEncontrado = false;
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].nombre === nombre) {
                this.productos.splice(i, 1);
                alert("El producto " + nombre + " fue quitado del carrito");
                productoEncontrado = true;
                break;
            }
        }
        if (!productoEncontrado) {
            alert("Ese producto no está en el carrito");
        }
        this.listar();
    }

    buscar(nombreProdcuto) {
        let resultado = this.productos.filter((producto) => producto.nombre.includes(nombreProdcuto));
        console.log(resultado);
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    }
}

const carrito = new Carrito();

function agregarProducto() {
    let nombre = prompt("Ingrese el nombre del producto");
    let precio;

    do {
        let precioInput = prompt("Ingrese el precio del producto (solo números):");
        precio = parseFloat(precioInput);

        if (isNaN(precio)) {
            alert("Por favor, ingrese un número válido como precio.");
        }
    } while (isNaN(precio));

    const nuevoProducto = {
        nombre: nombre,
        precio: precio,
        cantidad: 1
    };

    carrito.agregar(nuevoProducto);
}

function quitarProducto() {
    let nombre = prompt("Ingrese el nombre del producto que desea quitar");
    carrito.quitar(nombre);
}

function buscarProducto() {
    let nombre = prompt("Ingrese el nombre del producto que desea buscar en el carrito");
    
    let productosEncontrados = carrito.productos.filter(producto => producto.nombre.includes(nombre));
    
    if (productosEncontrados.length > 0) {
        console.log("Productos encontrados en el carrito:");
        productosEncontrados.forEach(producto => {
            console.log("Nombre: " + producto.nombre);
            console.log("Precio: " + producto.precio);
            console.log("Cantidad: " + producto.cantidad);
            console.log("_______________________________");
        });
    } else {
        console.log("No se encontraron productos con el nombre ingresado en el carrito.");
    }
}

const totalCompra = carrito.calcularTotal();
console.log("Total de la compra: $" + totalCompra);

console.log(carrito.productos);