CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.38-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (4,'Anillos'),(3,'Aretes'),(2,'Brazaletes'),(5,'Colecciones'),(1,'Collares');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compras` (
  `users_id` int(10) NOT NULL,
  `products_id` int(10) unsigned NOT NULL,
  `id` varchar(45) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `tipo_pago` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_has_products_products1_idx` (`products_id`),
  KEY `fk_users_has_products_users1_idx` (`users_id`),
  CONSTRAINT `fk_users_has_products_products1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_products_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `precio` int(10) unsigned NOT NULL,
  `descuento` int(10) DEFAULT NULL,
  `imagen` varchar(100) NOT NULL,
  `sections_id` int(10) unsigned NOT NULL,
  `categories_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_sections1_idx` (`sections_id`),
  KEY `fk_products_categories1_idx` (`categories_id`),
  CONSTRAINT `fk_products_categories1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_sections1` FOREIGN KEY (`sections_id`) REFERENCES `sections` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Collar Queen & Princess','Collar de plata 925 con diamantes.',8500,5,'collar1.jpg',1,1),(2,'Brazalete Lucky Daisy Blair','Brazalete de plata 900 con diseño de flores.',2500,10,'brazalete1.jpg',2,2),(3,'Aretes Little Diamonds','Aretes de plata 950 con diamantes.',4500,5,'aretes1.jpg',1,3),(4,'Anillo Jade Stone','Anillo de plata 925 con piedra Jade',4000,5,'anillo1.jpg',2,4),(5,'Collar Two Hearts & Me','Collar de plata 950',9500,5,'collar2.jpg',3,1),(6,'Brazalete Pandora\'s Box','Brazalete de plata 925.',5000,15,'brazalete2.jpg',3,2),(7,'Aretes Welcome Spring con Diamantes','Aretes de plata 950 con detalle de diamantes.',6500,5,'aretes2.jpg',1,3),(8,'Anillo Square Diamonds Soft','Anillo de plata 930.',7000,10,'anillo2.jpg',2,4),(9,'Collar One Heart & One Soul','Collar de plata 900.',12000,15,'collar3.jpg',1,1),(10,'Brazalete Pandora\'s Heart','Brazalete de plata 950.',8000,10,'brazalete3.jpg',2,2),(11,'Aretes New Decade','Aretes de plata 950.',6000,10,'aretes3.jpg',3,3),(12,'Anillo Two Millions Years','Anillo de plata 925.',8000,10,'anillo3.jpg',3,4),(13,'Collar Purple Roses ','Collar de plata 950 con diamantes  violetas.',13000,10,'collar4.jpg',3,1),(14,'Brazalete Pandora\'s Life','Brazalete de plata 950.',6000,15,'brazalete4.jpg',3,2),(15,'Aretes Three Flowers','Aretes de plata 900 con diamantes.',10000,15,'aretes4.jpg',3,3),(16,'Anillo Ladies\' Company','Anillo de plata 950 con diamantes.',8000,15,'anillo4.jpg',3,4),(17,'Brazalete Tangled Lifes','Brazalate de plata 900.',5000,5,'brazalete5.jpg',3,2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sections` (
  `id` int(10) unsigned NOT NULL,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sectionscol_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (1,'ofertas'),(3,'sindef'),(2,'tendencias');
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_completo` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `rol` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idusers_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Lara','lara@labrinth.com','avatar-1606970596376.png','$2b$10$/PacTh38t1HyWDNFo/XEseVd94cqydtwWrNMC3bbtLgXeMZ2z5LJ2','admin'),(7,'Michelle Torrico','michelle@labrinth.com','default.png','$2b$10$dCCsTqMfF6hEszby0gs9heZ.EaexWQA/JbXvRttuF2jGDqWGkWosK','user'),(8,'michelle','mile@mile.com','default.png','$2b$10$5sBfH4AiVlulYOayPVd.k./z7.P4mDYLp/DArRKqD.C8ENMcVeNYq','user'),(11,'Lara Torrico','lara@lara.com','default.png','$2b$10$Tfzrq1NjAOzDrOEmnWiqs.DPHCDIen90qLnmbmVirIVi3nqnxZ8uS','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-10 11:30:20
