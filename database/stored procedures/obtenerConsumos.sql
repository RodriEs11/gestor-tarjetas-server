DELIMITER //

CREATE PROCEDURE obtenerConsumos()
	BEGIN
		SELECT 
			autor.nombre AS autor,
			consumo.nombre,
			consumo.notas,
			detallecuotas.montoTotal, 
			detallecuotas.precioCuota, 
			detallecuotas.cuotasRestantes,
			detallecuotas.cantidadCuotas,
			detallecuotas.fechaCompra
		FROM consumo
		INNER JOIN autor ON consumo.autor_idAutor = autor.idAutor
		INNER JOIN detallecuotas ON consumo.detalleCuotas_idDetalleCuotas = detallecuotas.idDetalleCuotas;

    END //


DELIMITER ;