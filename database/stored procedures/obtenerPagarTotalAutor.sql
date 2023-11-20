CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerPagarTotalAutor`(IN idAutor INT)
BEGIN

		SELECT SUM(detalleCuotas.precioCuota) AS totalAPagar FROM consumo
		INNER JOIN detalleCuotas ON detalleCuotas.idDetalleCuotas = consumo.detalleCuotas_idDetalleCuotas
		WHERE autor_idAutor = idAutor AND consumo.finalizado = FALSE;

	END