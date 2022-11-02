-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2022 at 12:02 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation`
--
CREATE DATABASE IF NOT EXISTS `vacation` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `vacation`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(14, 17),
(17, 1),
(13, 17),
(13, 1),
(18, 17),
(18, 1),
(18, 18);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `roleId`) VALUES
(13, 'yael', 'boyer', 'yaeluli', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 2),
(14, 'dina', 'roz', 'dinar', 'dde0fe1469e89be466e8d41dcc279d2e75ef720195d2481cb18f3f1d3a5b4b3c58a1badaf93035fca6dc6d961e8bd960f3298d128249bd3db47951c3444b635f', 2),
(17, 'yael', 'boyer', 'TheAdmin1', 'c6d2dec0e0ec21a22d3769f9647fb889b95f72810412e066951505101ccd560f4ca4097f1e04a0217b014d833acb25bfe95b3fcfb5a30177c1d478b2196df332', 1),
(18, 'avi', 'boyer', 'abush', 'bf6896643ea3cb5e1fb25d8628ab0a8f010097aa6f76c48b49f6393192c57461e639d4a8333b3a7114f75429c0e55fe74d5c79ae84788e3a5e1211d328b11a37', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(1000) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `imageName` varchar(50) NOT NULL,
  `arrivalDate` date NOT NULL,
  `departureDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `imageName`, `arrivalDate`, `departureDate`, `price`) VALUES
(1, 'Seychelles', 'Seychelles is an archipelago (island chain) of 155 different islands, small and large and some of them are not even inhabited.  The nature and beaches are wonderful and well preserved, with soft golden sand, transparent turquoise water, coral reefs, palm trees and of course warm tropical weather throughout the months of the year.', '341c1075-4079-47ac-b241-848446d3b6fe.jpg', '2022-10-29', '2022-10-30', '1200.00'),
(14, 'Baku, Azerbaijan', 'Baku is the capital of Azerbaijan and it is also the largest city among the cities of the Caucasus. Baku, located on the coast of the Caspian Sea, is actually divided into three parts - the old city, the new city, which was built after the discovery of oil in the area, and the Soviet city. ', '108c40f5-6426-4086-97d2-80c89edff852.jpg', '2022-10-24', '2022-10-28', '1000.00'),
(15, 'Delhi,India', 'Delhi, the capital of India and the gateway for most travelers to the country, is full of culture, attractions, shopping and good food. Give yourself two days to get used to the high density, the traffic congestion and the fast pace - and you will fall in love. The giant city of 12 million inhabitants has in recent years begun to be perceived more as a fascinating tourist attraction and less as a transit stop. ', '3ce0ec93-4dcd-4b31-a63e-926dded901ce.jpg', '2022-10-23', '2022-10-26', '1450.00'),
(16, 'Lake Plastiras, Greece', 'Lake Plastiria is an artificial lake, created in 1960 , The dam itself was not crowned as a resounding success, because the electricity generation plant was not successful, but the lake blended well into the forested landscape, and here and there you can find recreational activities such as kayaking. ', '90928800-842a-4c44-82ea-73349d74a9bc.jpg', '2022-11-07', '2022-11-18', '1000.00'),
(17, 'Karlsruhe,Germany', 'Karlsruhe,  after Stuttgart, is considered one of the recommended destinations for the whole family. The reason for this is quite simple, in Karlsruhe you will find all the necessary ingredients for a fun family vacation: parks, carriages and cable cars, museums, water parks and swimming pools and more. The visiting children receive a special version of the city map, which they can stamp at each station and attraction they visit. ', 'b3dd53b2-06fb-4665-9869-d1c84493863a.jpg', '2022-10-31', '2022-11-06', '1200.00'),
(18, 'Papua, New Guinea', 'Papua New Guinea is one of the countries where culture and nature have created an intoxicating and intense combination of unforgettable landscapes and customs. Not many come to Papua and it is known that the trip there is challenging and difficult, but those who come here will have a stunning \"once in a lifetime\" experience. ', '46091948-6325-47de-83e6-eb05795ce248.jpg', '2022-10-23', '2022-10-27', '1950.00'),
(19, 'Cape Town, South Africa', 'Cape Town, is considered one of the most beautiful cities in the world. Cape Town is at the foot of Table Mountain and overlooks the Atlantic Ocean. The city offers many attractions for visitors, including good museums, especially the Museum of History and Culture and the Jewish Museum, unique neighborhoods such as the Malay Quarter or the colorful Bo-Kaap Quarter, and great beaches. ', 'c0bd8568-1069-4545-8a50-1ab83874a450.jpg', '2022-10-24', '2022-10-24', '1420.00'),
(20, 'London,England', 'London is one of the main attractions for tourists from around the world, thanks to its characteristics and thanks to a chain of sites and attractions: Big Ben and the Parliament Building, the Tower and London Bridge, the prestigious Oxford Street, Hyde Park, Buckingham Palace, Madame Tussauds Museum, the Ferris Wheel on the Thames- So many attractions in London and this is just a part of what London has to offer. ', 'c0bd8568-1069-4545-8a50-1ab83874a450.jpg', '2022-10-23', '2022-10-27', '700.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
