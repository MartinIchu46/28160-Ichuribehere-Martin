class Producto {
    constructor(id, nombre, precio,imagen) {
        this.id = id;
        //this.marca = marca;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;

    }
}

const MazdaRX7 = new Producto(1, "Mazda RX7", 750, "./img/mazda-rx7.jpg")
const LamborghiniDiablo = new Producto(2,"Lamborghini Diablo", 5000, "./img/lamborghini-diablo-tomica.jpg")
const FerrariLaferrari = new Producto(3, "Ferrari Laferrari", 5000, "./img/ferrari-laferrari-tomica.jpg")
const CadillacFleetwood = new Producto(4, "Cadillac Fleetwood", 4500, "./img/cadillac-rosa-greenlight.jpg")
//const ChevroletCorvette = new Producto(5,"Jhonny Lightning", "Chevrolet Corvette 1956", 2500)

let productos = [MazdaRX7, LamborghiniDiablo, FerrariLaferrari,CadillacFleetwood]

/*const productos = [
    {
        id: 1,
        nombre:"Mazda RX7",
        marca:"Hot wheels",
        precio:750,
        img:"mazda-rx7.jpg"

    },
    {
        id: 2,
        nombre:"Lamborghini Diablo",
        marca:"Tomica",
        precio:5000,
        img:"lamborghini-diablo-tomica.jpg"

    },
    {
        id: 3,
        nombre:"Ferrari Laferrari",
        marca:"Tomica",
        precio:5000,
        img:"./img/ferrari-laferrari-tomica"

    },
    {
        id: 4,
        nombre:"Cadillac Fleetwood",
        marca:"Greenlight",
        precio:3500,
        img:"cadillac-rosa-greenlight.jpg"

    }
]*/


const container = document.querySelector(".container");
const main = document.querySelector("#main");

const sidebar= document.querySelector(".sidebar")
const btnCarrito = document.querySelector(".btn--carrito");

let carrito= JSON.parse(localStorage.getItem("carrito")) || [];

btnCarrito.addEventListener("click", () => {
    sidebar.classList.toggle("active");// el toggle agrega clase cuando no la tiene y lo quita cuando la tiene
});

const cargarProductos= () => {
    productos.forEach((element) => {
        main.innerHTML +=`
            <div class="caja">
                <img class="caja--img" src="${element.imagen}">
                <div class="caja--datos">
                    <p class="nombre"> ${element.nombre}</p>
                    
                    <p class="precio">$<span>${element.precio}</span></p>
                <button class="btn-agregar" data-id="${element.id}">Agregar</button>
                </div>    

            </div>`;
    });
    const btnAgregar= document.querySelectorAll(".btn-agregar");
    
    btnAgregar.forEach(e => 
        e.addEventListener("click", (e) => {
            
           let cardPadre= e.target.parentElement;
            
            agregarAlCarrito(cardPadre);// Agregar al carrito la cardPadre

    })
    );
};

const agregarAlCarrito = (cardPadre) => {
    let producto ={
        nombre: cardPadre.querySelector(".nombre").textContent,
        precio: Number(cardPadre.querySelector(".precio span").textContent),
        cantidad: 1,
        imagen: cardPadre.parentElement.querySelector("img").src,
        id: Number(cardPadre.querySelector("button").getAttribute("data-id")),
    };

    let productoEncontrado =carrito.find((e)=>e.id ===producto.id);
    if(productoEncontrado) {
        productoEncontrado.cantidad++;
    } else{
        carrito.push(producto);
    }
    
    mostrarCarrito();
};

const mostrarCarrito = ()=> {
    sidebar.innerHTML="";
    carrito.forEach(element=>{
        let{imagen,nombre,precio,cantidad,id}=element;
        sidebar.innerHTML +=`
        <div class="caja--carrito">
            <img class="caja--carrito-img" src="${imagen}">
            <div class="caja--carrito--datos">
                <p class="nombre"> ${nombre}</p>
                
                <p class="cantidad">CANTIDAD: ${cantidad}</p>
                <p class="subTotal">Subtotal: $ ${precio * cantidad}</p>
                <p class="precio">$<span>${precio}</span></p>
            <button class="btn-restar" data-id="${id}">-</button>
            <button class="btn-borrar" data-id="${id}">Borrar</button>
            </div>    

        </div>`;
    });
aumentarNumeroCantidadCarrito()
localStorage.setItem("carrito", JSON.stringify(carrito))
};

const restarProducto = (productoRestar)=>{
    let productoEncontrado = carrito.find(
        (element)=> element.id === Number(productoRestar)
    );
    if (productoEncontrado) {
        productoEncontrado.cantidad--;
        if (productoEncontrado.cantidad === 0) {
            productoEncontrado.cantidad=1;
        }
    }
    mostrarCarrito();
}

const borrarProducto = (productoBorrar) =>{
    carrito = carrito.filter((element)=>element.id !== Number(productoBorrar))
    mostrarCarrito();
}
const escucharBotonesSidebar= ()=> {
    sidebar.addEventListener("click", (e)=>{
        if(e.target.classList.contains("btn-restar")){
            restarProducto(e.target.getAttribute("data-id"));
        }
        if(e.target.classList.contains("btn-borrar")){
           borrarProducto(e.target.getAttribute("data-id")); 
        }
    });
};

const aumentarNumeroCantidadCarrito = ()=>{
    let total = carrito.reduce((acumulador, iterador)=> acumulador+iterador.cantidad,0)
    document.querySelector(".cant--carrito").textContent = total;
}
aumentarNumeroCantidadCarrito()
cargarProductos();
mostrarCarrito();
escucharBotonesSidebar();