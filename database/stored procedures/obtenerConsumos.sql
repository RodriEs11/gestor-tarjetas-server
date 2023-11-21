CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerConsumos`()
BEGIN
		SELECT 
			autor.nombre AS autor,
            finalizado,
			consumo.nombre,
			consumo.notas,
            idDetalleCuotas,
			detallecuotas.montoTotal, 
			detallecuotas.precioCuota, 
            detalleCuotas.numeroProximaCuota,
			detallecuotas.cantidadCuotas,
			detallecuotas.fechaCompra
		FROM consumo
		INNER JOIN autor ON consumo.autor_idAutor = autor.idAutor
		INNER JOIN detallecuotas ON consumo.detalleCuotas_idDetalleCuotas = detallecuotas.idDetalleCuotas;

    END