import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import Proveedor from './assets/js/Proveedor.js';
import Articulo from './assets/js/Articulo.js';
import { totalPago } from './assets/js/utils.js';

const nombreProveedor = document.querySelector('#nombreProveedor');
const emailProveedor = document.querySelector('#emailProveedor');
const telefonoProveedor = document.querySelector('#telefonoProveedor');
const idProveedor = document.querySelector('#idProveedor');
const nombreArticulo = document.querySelector('#nombreArticulo');
const precioArticulo = document.querySelector('#precioArticulo');
const btnAgregarProveedor = document.querySelector('#btnAgregarProveedor');
const btnAgregarArticulo = document.querySelector('#btnAgregarArticulo');
const tabla = document.querySelector('#tabla');
const proveedores = [];

const borrarProveedor = (index) => {
	console.log(index);
};

const cargarTabla = () => {
	if (proveedores.length === 0) {
		return;
	}

	tabla.innerHTML = '';

	const thead = document.createElement('thead');
	const tr = document.createElement('tr');
	const thNombre = document.createElement('th');
	const thEmail = document.createElement('th');
	const thTelefono = document.createElement('th');
	const thArticulos = document.createElement('th');
	const thTotal = document.createElement('th');
	const thAcciones = document.createElement('th');

	thNombre.textContent = 'Nombre';
	thEmail.textContent = 'Email';
	thTelefono.textContent = 'Telefono';
	thArticulos.textContent = 'Articulos';
	thTotal.textContent = 'Total';
	thAcciones.textContent = 'Acciones';

	tr.appendChild(thNombre);
	tr.appendChild(thEmail);
	tr.appendChild(thTelefono);
	tr.appendChild(thArticulos);
	tr.appendChild(thTotal);
	tr.appendChild(thAcciones);

	thead.appendChild(tr);
	tabla.appendChild(thead);

	const tbody = document.createElement('tbody');

	proveedores.forEach((proveedor, index) => {
		const tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${proveedor._nombre}</td>
			<td>${proveedor._email}</td>
			<td>${proveedor._telefono}</td>
			<td>${proveedor._articulos.length}</td>
			<td>${totalPago(proveedor)}</td>
			<td>
			  <form data-id="${index}" data-form="borrarProveedor">
					<button type="submit" class="btn btn-danger btn-sm">Eliminar</button>
				</form>
			</td>
		`;
		tbody.appendChild(tr);
	});

	tabla.appendChild(tbody);

	const borrarProveedor = document.querySelectorAll(
		'[data-form="borrarProveedor"]'
	);

	borrarProveedor.forEach((form) => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			proveedores.splice(form.dataset.id, 1);
			guardarDatosLocalStorage();
		});
	});
};

const cargarDatosLocalStorage = () => {
	const proveedoresLocalStorage = JSON.parse(
		localStorage.getItem('proveedores')
	);

	if (proveedoresLocalStorage) {
		proveedoresLocalStorage.forEach((proveedor) => {
			proveedores.push(proveedor);
		});
	}

	cargarSelectProveedores();
	cargarTabla();
};

const guardarDatosLocalStorage = () => {
	localStorage.setItem('proveedores', JSON.stringify(proveedores));

	cargarSelectProveedores();
	cargarTabla();
};

const cargarSelectProveedores = () => {
	const selectProveedores = document.querySelector('#idProveedor');

	selectProveedores.innerHTML =
		'<option value="0">Seleccione un proveedor</option>';

	proveedores.forEach((proveedor) => {
		const option = document.createElement('option');
		option.value = proveedor._nombre;
		option.textContent = proveedor._nombre;
		selectProveedores.appendChild(option);
	});
};

cargarDatosLocalStorage();

btnAgregarProveedor.addEventListener('submit', (e) => {
	e.preventDefault();

	if (nombreProveedor.value === '') {
		alert('Debe ingresar un nombre de proveedor');
		return;
	}

	if (emailProveedor.value === '') {
		alert('Debe ingresar un email de proveedor');
		return;
	}

	if (telefonoProveedor.value === '') {
		alert('Debe ingresar un telefono de proveedor');
		return;
	}

	if (
		proveedores.find((proveedor) => proveedor._nombre === nombreProveedor.value)
	) {
		alert('El proveedor ya existe');
		return;
	}

	if (
		proveedores.find((proveedor) => proveedor._email === emailProveedor.value)
	) {
		alert('El email ya existe');
		return;
	}

	if (
		proveedores.find(
			(proveedor) => proveedor._telefono === telefonoProveedor.value
		)
	) {
		alert('El telefono ya existe');
		return;
	}

	const proveedor = new Proveedor(
		nombreProveedor.value,
		emailProveedor.value,
		telefonoProveedor.value
	);

	proveedores.push(proveedor);

	nombreProveedor.value = '';
	emailProveedor.value = '';
	telefonoProveedor.value = '';

	guardarDatosLocalStorage();
});

btnAgregarArticulo.addEventListener('submit', (e) => {
	e.preventDefault();

	if (idProveedor.value === '0') {
		alert('Debe seleccionar un proveedor');
		return;
	}

	if (nombreArticulo.value === '') {
		alert('Debe ingresar un nombre de articulo');
		return;
	}

	if (precioArticulo.value === '') {
		alert('Debe ingresar un precio de articulo');
		return;
	}

	if (isNaN(precioArticulo.value)) {
		alert('El precio debe ser un numero');
		return;
	}

	if (precioArticulo.value <= 0) {
		alert('El precio debe ser mayor a 0');
		return;
	}

	const proveedor = proveedores.find(
		(proveedor) => proveedor._nombre === idProveedor.value
	);

	const articulo = new Articulo(nombreArticulo.value, precioArticulo.value);

	new Proveedor(
		proveedor._nombre,
		proveedor._email,
		proveedor._telefono,
		proveedor._articulos
	).setArticulos(articulo);

	nombreArticulo.value = '';
	precioArticulo.value = '';

	guardarDatosLocalStorage();
});
