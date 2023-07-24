CREATE DATABASE recetas_db;
USE recetas_db;

CREATE TABLE recetas(
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(50),
ingredientes VARCHAR(100),
instrucciones TEXT);

INSERT INTO `recetas_db`.`recetas` (`nombre`, `ingredientes`, `instrucciones`) VALUES ('Gazpacho', 'Tomate, ajo, cebolla, pimiento', 'Triturar todo y a gozar');
INSERT INTO `recetas_db`.`recetas` (`nombre`, `ingredientes`, `instrucciones`) VALUES ('Tortilla francesa', 'Huevos, sal', 'Batir los huevos, echamos la sal y lo llevamos a la sartén.');
INSERT INTO `recetas_db`.`recetas` (`nombre`, `ingredientes`, `instrucciones`) VALUES ('Filetes de pollo empanados', 'Filetes, sal, pan rallado, huevo', 'Batir los huevos, echamos la sal, empanamos y lo llevamos a la sartén.');