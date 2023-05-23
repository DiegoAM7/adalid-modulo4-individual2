export default class Proveedor {
	constructor(nombre, email, telefono, articulos = []) {
		this._nombre = nombre;
		this._email = email;
		this._telefono = telefono;
		this._articulos = articulos;
	}

	getNombre() {
		return this._nombre;
	}

	getEmail() {
		return this._email;
	}

	getTelefono() {
		return this._telefono;
	}

	getArticulos() {
		return this._articulos;
	}

	setNombre(nombre) {
		this._nombre = nombre;
	}

	setEmail(email) {
		this._email = email;
	}

	setTelefono(telefono) {
		this._telefono = telefono;
	}

	setArticulos(articulos) {
		this._articulos.push(articulos);
	}

	getInfoProveedor() {
		return `Proveedor: ${this._nombre} - Telefono: ${this._telefono}`;
	}
}
