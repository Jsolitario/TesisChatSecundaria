/* Tablas prototipo para mandar a revision */


CREATE TABLE `chat`.`maestros` (
  `idMaestros` INT NOT NULL,
  `Nombres` VARCHAR(30) NULL,
  `Apellido_P` VARCHAR(20) NULL,
  `Apellido_M` VARCHAR(20) NULL,
  `Direccion` VARCHAR(40) NULL,
  `Telefono` VARCHAR(10) NULL,
  `Celular` VARCHAR(10) NULL,
  `Materia` INT NULL,
  `Clases` INT NULL,
  PRIMARY KEY (`idMaestros`))
COMMENT = 'Tabla de profesores Trabajando';

/* crear tabla de padres prototipo */
CREATE TABLE chat.padres (
  idPadres INT NOT NULL,
  Nombre VARCHAR(30) NULL,
  Apellido_P VARCHAR(20) NULL,
  Apellido_M VARCHAR(20) NULL,
  Direccion VARCHAR(40) NULL,
  Telefono VARCHAR(10) NULL,
  Celular VARCHAR(10) NULL,
  CURP VARCHAR(45) NULL,
  Estado BIT NULL DEFAULT 0 AFTER `CURP`,
  PRIMARY KEY (idPadres),
  UNIQUE INDEX CURP_UNIQUE (CURP ASC) VISIBLE)
COMMENT = 'Tabla con informacion de los padres para obtene rla informacion por parte de los maestros';



/* Actualizacion de tablas */
ALTER TABLE `chat`.`padres` 
ADD COLUMN `Estado` BIT NULL DEFAULT 0 AFTER `CURP`;

ALTER TABLE `chat`.`padres` 
CHANGE COLUMN `Telefono` `Telefono` VARCHAR(10) NULL DEFAULT NULL ,
CHANGE COLUMN `Celular` `Celular` VARCHAR(10) NULL DEFAULT NULL ;



/* insert into tablas */
INSERT INTO `chat`.`padres` (`Nombre`, `Apellido_P`, `Apellido_M`, `Direccion`, `Telefono`) VALUES ('Miguel', 'Garcia', 'Sanchez', 'avenida sin nombre', '3141219678');
