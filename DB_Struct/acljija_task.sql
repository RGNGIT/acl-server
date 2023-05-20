-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 192.168.1.3    Database: acljija
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `Key` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(128) DEFAULT NULL,
  `Description` varchar(1024) DEFAULT NULL,
  `OpenDate` date DEFAULT NULL,
  `PlannedCloseDate` date DEFAULT NULL,
  `FactCloseDate` date DEFAULT NULL,
  `Priority_Key` int DEFAULT NULL,
  `Node_Key` int DEFAULT NULL,
  `Task_Type_Key` int DEFAULT NULL,
  `Author_Key` int DEFAULT NULL,
  `Task_Status_Key` int DEFAULT '1',
  PRIMARY KEY (`Key`),
  KEY `Priority_Key` (`Priority_Key`),
  KEY `Node_Key` (`Node_Key`),
  KEY `Author_Key` (`Author_Key`),
  KEY `Task_Type_Key` (`Task_Type_Key`),
  KEY `Task_Status_Key` (`Task_Status_Key`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`Priority_Key`) REFERENCES `priority` (`Key`),
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`Node_Key`) REFERENCES `node` (`Key`),
  CONSTRAINT `task_ibfk_3` FOREIGN KEY (`Task_Type_Key`) REFERENCES `task_type` (`Key`),
  CONSTRAINT `task_ibfk_4` FOREIGN KEY (`Author_Key`) REFERENCES `phys` (`Key`),
  CONSTRAINT `task_ibfk_5` FOREIGN KEY (`Task_Type_Key`) REFERENCES `task_type` (`Key`),
  CONSTRAINT `task_ibfk_6` FOREIGN KEY (`Task_Type_Key`) REFERENCES `task_type` (`Key`),
  CONSTRAINT `task_ibfk_7` FOREIGN KEY (`Task_Status_Key`) REFERENCES `task_status` (`Key`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-20 19:10:08
