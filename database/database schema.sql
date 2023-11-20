-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gestor-tarjetas
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gestor-tarjetas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gestor-tarjetas` DEFAULT CHARACTER SET utf8 ;
USE `gestor-tarjetas` ;

-- -----------------------------------------------------
-- Table `gestor-tarjetas`.`autor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestor-tarjetas`.`autor` (
  `idAutor` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idAutor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gestor-tarjetas`.`detalleCuotas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestor-tarjetas`.`detalleCuotas` (
  `idDetalleCuotas` INT NOT NULL AUTO_INCREMENT,
  `montoTotal` INT NOT NULL,
  `cantidadCuotas` INT NOT NULL,
  `cuotasRestantes` INT NOT NULL,
  `numeroProximaCuota`  INT NOT NULL DEFAULT 1,
  `precioCuota` INT NOT NULL,
  `fechaCompra` DATETIME NOT NULL,
  PRIMARY KEY (`idDetalleCuotas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gestor-tarjetas`.`tarjeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestor-tarjetas`.`tarjeta` (
  `idTarjeta` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `limiteTotal` INT NOT NULL,
  `ultimoCierre` DATE NOT NULL,
  `vencimiento` DATE NOT NULL,
  `proximoCierre` DATE NOT NULL,
  `proximoVencimiento` DATE NOT NULL,
  PRIMARY KEY (`idTarjeta`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gestor-tarjetas`.`consumo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestor-tarjetas`.`consumo` (
  `idConsumo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `notas` VARCHAR(255) NULL,
  `finalizado` TINYINT NOT NULL DEFAULT 0,
  `autor_idAutor` INT NOT NULL,
  `detalleCuotas_idDetalleCuotas` INT NOT NULL,
  `tarjeta_idTarjeta` INT NOT NULL,
  PRIMARY KEY (`idConsumo`),
  INDEX `fk_consumo_autor_idx` (`autor_idAutor` ASC) VISIBLE,
  INDEX `fk_consumo_detalleCuotas1_idx` (`detalleCuotas_idDetalleCuotas` ASC) VISIBLE,
  INDEX `fk_consumo_tarjeta1_idx` (`tarjeta_idTarjeta` ASC) VISIBLE,
  CONSTRAINT `fk_consumo_autor`
    FOREIGN KEY (`autor_idAutor`)
    REFERENCES `gestor-tarjetas`.`autor` (`idAutor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_consumo_detalleCuotas1`
    FOREIGN KEY (`detalleCuotas_idDetalleCuotas`)
    REFERENCES `gestor-tarjetas`.`detalleCuotas` (`idDetalleCuotas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_consumo_tarjeta1`
    FOREIGN KEY (`tarjeta_idTarjeta`)
    REFERENCES `gestor-tarjetas`.`tarjeta` (`idTarjeta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gestor-tarjetas`.`cuota`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestor-tarjetas`.`cuota` (
  `idCuota` INT NOT NULL,
  `numeroCuota` INT NOT NULL,
  `detalleCuotas_idDetalleCuotas` INT NOT NULL,
  `fechaVencimiento` DATE NOT NULL,
  `estaPagado` TINYINT NOT NULL,
  PRIMARY KEY (`idCuota`),
  INDEX `fk_cuota_detalleCuotas1_idx` (`detalleCuotas_idDetalleCuotas` ASC) VISIBLE,
  CONSTRAINT `fk_cuota_detalleCuotas1`
    FOREIGN KEY (`detalleCuotas_idDetalleCuotas`)
    REFERENCES `gestor-tarjetas`.`detalleCuotas` (`idDetalleCuotas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
