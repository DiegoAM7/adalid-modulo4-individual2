export function totalPago(proveedor) {
	return proveedor._articulos.reduce(
		(acc, articulo) => acc + Number.parseInt(articulo._precio),
		0
	);
}
