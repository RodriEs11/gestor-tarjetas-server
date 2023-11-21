CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerPagarTotalTarjeta`(IN idTarjeta INT)
BEGIN
	SELECT SUM(precioCuota) AS totalAPagar FROM consumo
	INNER JOIN detalleCuotas ON detalleCuotas.idDetalleCuotas = consumo.detalleCuotas_idDetalleCuotas
	WHERE tarjeta_idTarjeta = idTarjeta AND NOT consumo.finalizado ;
END