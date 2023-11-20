CREATE DEFINER=`root`@`localhost` PROCEDURE `pagarProximaCuota`(IN idDetalleCuotas INT)
BEGIN
    

        DECLARE numeroProximaCuota INT;
		DECLARE idProximaCuota INT;
        DECLARE cuotasRestantes INT;
		
        -- OBTIENE EL NUMERO DE LA PROXIMA CUOTA A PAGAR
        SELECT detalleCuotas.numeroProximaCuota INTO numeroProximaCuota
        FROM detalleCuotas 
        WHERE detalleCuotas.idDetalleCuotas = idDetalleCuotas;
        
      
        
        -- OBTIENE LA ID DE LA PROXIMA CUOTA A PAGAR
        SELECT idCuota INTO idProximaCuota
        FROM detalleCuotas
        INNER JOIN cuota ON cuota.detalleCuotas_idDetalleCuotas = detalleCuotas.idDetalleCuotas
        WHERE cuota.numeroCuota = numeroProximaCuota AND detalleCuotas.idDetalleCuotas = idDetalleCuotas;
        
		-- SE ACTUALIZA EL VALOR DE LA CUOTA A: PAGADO = TRUE
		UPDATE cuota
        SET cuota.estaPagado = TRUE
        WHERE cuota.idCuota = idProximaCuota;
        

        -- AL PAGAR, SE INCREMENTA EL VALOR DE numeroProximaCuota
        -- Y SE DISMINUYE EL VALOR DE cuotasRestantes
        UPDATE detalleCuotas
        SET  
			detalleCuotas.numeroProximaCuota = 
            CASE
				WHEN detalleCuotas.numeroProximaCuota  < detalleCuotas.cantidadCuotas
				THEN detalleCuotas.numeroProximaCuota + 1
                ELSE detalleCuotas.numeroProximaCuota
			END,
            detalleCuotas.cuotasRestantes = 
            CASE
				WHEN detalleCuotas.cuotasRestantes > 0
                THEN detalleCuotas.cuotasRestantes - 1 
                ELSE detalleCuotas.cuotasRestantes
            END
        WHERE detalleCuotas.idDetalleCuotas = idDetalleCuotas;
        
      
      -- SI TODAS LAS CUOTAS ESTAN PAGADAS, EN LA TABLA CONSUMO SE SETEA COMO FINALIZADO
		SELECT detalleCuotas.cuotasRestantes INTO cuotasRestantes FROM detalleCuotas
		WHERE detalleCuotas.idDetalleCuotas = idDetalleCuotas;

		UPDATE consumo
        SET consumo.finalizado =
			CASE
				WHEN cuotasRestantes = 0
                THEN TRUE
                ELSE FALSE
			END
        WHERE consumo.detalleCuotas_idDetalleCuotas = idDetalleCuotas;
        
    END