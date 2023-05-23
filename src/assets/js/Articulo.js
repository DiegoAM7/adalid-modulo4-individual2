export default class Articulo {
	constructor(nombre, precio) {
		this._nombre = nombre;
		this._precio = precio;
	}

	getNombre() {
		return this._nombre;
	}

	getPrecio() {
		return this._precio;
	}

	setNombre(nombre) {
		this._nombre = nombre;
	}

	setPrecio(precio) {
		this._precio = precio;
	}
}
