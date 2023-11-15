DELIMITER //

CREATE PROCEDURE agregarConsumo(
	IN idTarjeta INT,
	IN idAutor INT,
    IN nombre VARCHAR(100),
	IN montoTotal INT,
    IN cantidadCuotas INT,
    IN fechaCompra DATETIME,
    IN notas VARCHAR(255)
 )
BEGIN

	DECLARE cuotasRestantes INT;
    DECLARE precioCuota DECIMAL(10,2); -- puede almacenar hasta 10 dígitos en total, de los cuales 2 estarán después del punto decimal.
	DECLARE contador INT DEFAULT 1;
    DECLARE fechaVencimientoTarjeta DATE;
    SELECT vencimiento INTO fechaVencimientoTarjeta FROM tarjeta WHERE tarjeta.idTarjeta = idTarjeta;
    
    SET cuotasRestantes = cantidadCuotas;
    SET precioCuota = montoTotal / cantidadCuotas;
    
	INSERT INTO detalleCuotas (montoTotal, cantidadCuotas, cuotasRestantes, precioCuota, fechaCompra) 
    VALUES (montoTotal, cantidadCuotas, cuotasRestantes, precioCuota, fechaCompra);
    
    SET @idDetalleCuotas = LAST_INSERT_ID();
    
    INSERT INTO consumo (nombre, notas, autor_idAutor, detalleCuotas_idDetalleCuotas, tarjeta_idTarjeta) 
    VALUES (nombre, notas, idAutor, @idDetalleCuotas, idTarjeta);
    
    
    -- AGREGA SEGUN LA CANTIDAD DE CUOTAS, PARA DETALLAR CADA UNO SI ESTA PAGA O NO
     WHILE contador <= cantidadCuotas DO
	
        INSERT INTO cuota (detalleCuotas_idDetalleCuotas, fechaVencimiento, estaPagado)
        VALUES (@idDetalleCuotas, fechaVencimientoTarjeta, FALSE);
        
        -- AGREGA LA FECHA DE VENCIMIENTO DE CADA CUOTA CADA 30 DIAS
		SET fechaVencimientoTarjeta = DATE_ADD(fechaVencimientoTarjeta, INTERVAL 30 DAY);
        
        SET contador = contador + 1;
    END WHILE;
    
END //

DELIMITER ;