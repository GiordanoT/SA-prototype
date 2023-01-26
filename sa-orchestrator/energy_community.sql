-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Creato il: Gen 24, 2023 alle 12:49
-- Versione del server: 8.0.32
-- Versione PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+01:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `energy_community`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `consumptions`
--

CREATE TABLE `consumptions` (
  `id` int NOT NULL,
  `timestamp` timestamp NOT NULL,
  `user` int NOT NULL,
  `value` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `productions`
--

CREATE TABLE `productions` (
  `id` int NOT NULL,
  `timestamp` timestamp NOT NULL,
  `user` int NOT NULL,
  `value` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `solar_panels`
--

CREATE TABLE `solar_panels` (
  `id` int NOT NULL,
  `timestamp` timestamp NOT NULL,
  `user` int NOT NULL,
  `code` int NOT NULL,
  `value` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `wind_turbines`
--

CREATE TABLE `wind_turbines` (
  `id` int NOT NULL,
  `timestamp` timestamp NOT NULL,
  `user` int NOT NULL,
  `code` int NOT NULL,
  `value` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `consumptions`
--
ALTER TABLE `consumptions`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `productions`
--
ALTER TABLE `productions`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `solar_panels`
--
ALTER TABLE `solar_panels`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `wind_turbines`
--
ALTER TABLE `wind_turbines`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `consumptions`
--
ALTER TABLE `consumptions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `productions`
--
ALTER TABLE `productions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `solar_panels`
--
ALTER TABLE `solar_panels`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `wind_turbines`
--
ALTER TABLE `wind_turbines`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
