-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2022 at 11:29 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28
use heroku_80cb0a389fdca38;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_doc_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `id` int(11) NOT NULL,
  `nom_etudiant` varchar(255) NOT NULL,
  `matricule_etudiant` varchar(255) NOT NULL,
  `departement_etudiant` varchar(255) NOT NULL,
  `titre_doc` varchar(255) NOT NULL,
  `mot_cle_doc` varchar(255) NOT NULL,
  `membre_jury_soutenance` varchar(255) NOT NULL,
  `directeur_soutenance` varchar(255) NOT NULL,
  `source_doc` varchar(255) NOT NULL,
  `description_doc` text NOT NULL,
  `annee_soutenance` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `type_doc` varchar(255) NOT NULL DEFAULT 'memoire'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`id`, `nom_etudiant`, `matricule_etudiant`, `departement_etudiant`, `titre_doc`, `mot_cle_doc`, `membre_jury_soutenance`, `directeur_soutenance`, `source_doc`, `description_doc`, `annee_soutenance`, `created_at`, `updated_at`, `type_doc`) VALUES
(1, 'KAMAHA NKWATCHO\r\nYolande Angèle	', '14Y4578', 'Didactique des disciplines', 'La modélisation de la qualité de l’enseignement\r\n: cas de la dialectique des cultures nationales', 'analyse, education', 'BACHRI BOUBA [Maitre de Conférences/UNga], FONKOUA Pierre [Professeur/UY1], FONKENG EPAH Georges [Professeur/UY1]', ' MBALA ZE Barnabé, Professeur/UY1', 'uploads/4f2b3fd4-c52d-4c2d-9c2c-7867cd24b028-System Design Interview An Insiderâ\\u0080\\u0099s Guide (Alex Xu) (z-lib.org).pdf', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\r\n', '2020', '2022-06-05 12:00:02', '2022-07-06 11:28:47', 'memoire'),
(2, 'BEKONO Monique	', '14P47895', 'Enseignements fondamentaux en éducation', 'Dispositif de formation et de développement des compétences professionnelles via les technologies de l’information et de la communication dans les ENIEG', '', 'NKELZOK KOMTSINDI Valère,\r\nProfesseur/UDla MGBWA Vandelin,', ' ZAMBO BELINGA Joseph Marie, Professeur/UY1 ', 'uploads/96ee5abd-9417-4557-94a0-0b12a439fec0-Mobile_Touchless_Fingerprint_Recognition_Implement.pdf', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc', '2020', '2022-06-05 12:03:29', '2022-07-06 11:28:14', 'memoire'),
(3, 'EBE ZAMBO Yves François', '07P4789', 'education specialisee', 'Image inconsciente et sémiotique du corps. Une approche clinique de deux déterminannts de la relation d’aide en situation de difficulté de réinsertion sociale', 'analyse, education', 'NTUDA EBODE Joseph Vincent, Professeur/UY2 NKELZOK KOMTSINDI Valère,Professeur/UDla NGUIMFACK Léonard, Maitre de Conférences/UY1', 'MBALA ZE Barnabé, Professeur/UY1', 'uploads/ebf9a38b-7c6c-4bb1-ad07-b40d25c9e38a-quote-home.pdf', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \'de Finibus Bonorum et Malorum\' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \'Lorem ipsum dolor sit amet..\', comes from a line in section 1.10.32', '2019', '2022-06-05 12:45:52', '2022-07-06 11:27:46', 'memoire');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uidx_matricule_unique` (`matricule_etudiant`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
