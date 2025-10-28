-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 10, 2025 at 01:01 PM
-- Server version: 8.0.37
-- PHP Version: 8.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `learntoria_paam`
--

-- --------------------------------------------------------

--
-- Table structure for table `badges`
--

CREATE TABLE `badges` (
  `badge_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `icon_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `campaign_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `goal_amount` decimal(12,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--

CREATE TABLE `certificates` (
  `certificate_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `program_id` int DEFAULT NULL,
  `certificate_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `qr_code_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `issued_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cfn_groups`
--

CREATE TABLE `cfn_groups` (
  `id` int NOT NULL,
  `coordinator_id` int DEFAULT NULL,
  `group_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `country` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_general_ci,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cfn_groups`
--

INSERT INTO `cfn_groups` (`id`, `coordinator_id`, `group_name`, `country`, `state`, `city`, `address`, `latitude`, `longitude`) VALUES
(1, 2, 'Orita-obele group', 'Nigeria', 'Ondo', 'Akure', '24, State Industrial layout', NULL, NULL),
(2, 3, 'Fanibi Quaters', 'Nigeria', 'Ondo', 'Akure', '24, State Industrial layout', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cfn_meetings`
--

CREATE TABLE `cfn_meetings` (
  `id` int NOT NULL,
  `cfn_id` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meeting_time` datetime NOT NULL,
  `location_details` text COLLATE utf8mb4_general_ci,
  `attendance` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cfn_meetings`
--

INSERT INTO `cfn_meetings` (`id`, `cfn_id`, `title`, `meeting_time`, `location_details`, `attendance`) VALUES
(2, 2, 'Mid-week Fellowship', '2025-06-23 14:04:11', 'No 12, Asokoro Layout, Jabi Estate', '[2,4,5,3]'),
(5, 2, 'Sunday Evening Fellowship', '2025-09-23 14:04:11', 'No 12, Asokoro Layout, Jabi Estate', NULL),
(7, 1, 'Monday Evening Fellowship', '2024-09-20 12:04:11', 'No 7, Junction Layout, Akure', NULL),
(8, 2, 'Sunday Evening Fellowship', '2025-10-23 14:04:11', 'No 12, Asokoro Layout, Jabi Estate', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cfn_members`
--

CREATE TABLE `cfn_members` (
  `id` int NOT NULL,
  `cfn_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `joined_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cfn_members`
--

INSERT INTO `cfn_members` (`id`, `cfn_id`, `user_id`, `joined_at`) VALUES
(2, 1, 2, '2025-08-19 09:20:04'),
(5, 2, 3, '2025-08-19 10:58:57');

-- --------------------------------------------------------

--
-- Table structure for table `devotionals`
--

CREATE TABLE `devotionals` (
  `devotional_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `exhortation` text COLLATE utf8mb4_general_ci DEFAULT NULL,
  `audio_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `day_sequence` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `donation_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `payment_gateway` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `transaction_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `donation_type` enum('one-time','recurring') COLLATE utf8mb4_general_ci NOT NULL,
  `campaign_id` int DEFAULT NULL,
  `donated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_logs`
--

CREATE TABLE `event_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `user` int DEFAULT NULL,
  `apikey` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `endpoint` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `event_logs`
--

INSERT INTO `event_logs` (`id`, `user`, `apikey`, `endpoint`, `data`, `created`) VALUES
(5, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '\"\"', '2025-08-22 10:48:05'),
(6, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '\"\"', '2025-08-22 10:55:40'),
(7, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '\"\"', '2025-08-22 10:59:13'),
(8, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '\"\"', '2025-08-22 11:00:10'),
(9, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:17:08'),
(10, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:17:44'),
(11, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:19:12'),
(12, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:21:11'),
(13, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:21:39'),
(14, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:22:58'),
(15, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:23:59'),
(16, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:26:27'),
(17, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:28:12'),
(18, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:30:08'),
(19, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:31:17'),
(20, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:37:05'),
(21, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:43:40'),
(22, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:44:25'),
(23, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:44:41'),
(24, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:45:45'),
(25, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', 'null', '2025-08-22 11:46:40'),
(26, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '{\"firstname\":\"Demilade\",\"lastname\":\"Salami\",\"email\":\"salami@gmail.com\",\"phone\":\"08032317578\"}', '2025-08-22 11:46:59'),
(27, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '{\"firstname\":\"Demilade\",\"lastname\":\"Salami\",\"email\":\"salami@gmail.com\",\"phone\":\"08032317578\"}', '2025-08-22 11:48:41'),
(28, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '{\"firstname\":\"Demilade\",\"lastname\":\"Salami\",\"email\":\"salami@gmail.com\",\"phone\":\"08032317578\"}', '2025-08-22 11:49:11'),
(29, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '{\"firstname\":\"Demilade\",\"lastname\":\"Salami\",\"email\":\"davesalami@gmail.com\",\"phone\":\"08032317578\"}', '2025-08-22 11:50:15'),
(30, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '{\"firstname\":\"Demilade\",\"lastname\":\"Salami\",\"email\":\"davesalami@gmail.com\",\"phone\":\"08032317588\"}', '2025-08-22 11:50:28'),
(31, 2, 'fsdgsdfsdfgv4vwewetvwev', '', '{\"firstname\":\"Demilade\",\"lastname\":\"Salami\",\"email\":\"davesalami@gmail.com\",\"phone\":\"08032317588\"}', '2025-08-22 11:58:51'),
(32, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '{\"firstname\":\"Demilade\",\"lastname\":\"Salami\",\"email\":\"davesalami@gmail.com\",\"phone\":\"08032317588\"}', '2025-08-22 11:59:39'),
(33, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"stephendavee@gmail.com\",\"password\":\"123456\"}', '2025-08-22 12:04:33'),
(34, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"stephendavee@gmail.com\",\"password\":\"1234567\"}', '2025-08-22 12:04:47'),
(35, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"stephendavee@gmail.com\",\"password\":\"123456\"}', '2025-08-22 12:06:08'),
(36, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"stephendavee@gmail.com\",\"password\":\"123456\"}', '2025-08-22 12:07:51'),
(37, 2, 'fsdgsdfsdfgv4vwewetvwev', 'updateuserprofile', '{\"country\":\"Nigeria\",\"state\":\"ondo\",\"address\":\"14, Oyemekun Street, Akure\",\"pubkey\":\"awu87sjoo2x22a1nzldshhnu\"}', '2025-08-22 12:17:52'),
(38, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '{\"firstname\":\"Demilade\",\"lastname\":\"Salami\",\"email\":\"davesalami@gmail.com\",\"phone\":\"08032317588\"}', '2025-08-22 12:31:09'),
(39, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"stephendavee@gmail.com\",\"password\":\"123456\"}', '2025-08-22 12:31:09'),
(40, 2, 'fsdgsdfsdfgv4vwewetvwev', 'updateuserprofile', '{\"country\":\"Nigeria\",\"state\":\"ondo\",\"address\":\"14, Oyemekun Street, Akure\",\"pubkey\":\"awu87sjoo2x22a1nzldshhnu\"}', '2025-08-22 12:31:09'),
(41, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '{\"firstname\":\"Demilade\",\"lastname\":\"Salami\",\"email\":\"davesalami@gmail.com\",\"phone\":\"08032317588\"}', '2025-08-22 12:57:37'),
(42, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile\n', 'null', '2025-08-22 13:01:51'),
(43, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile\n', 'null', '2025-08-22 13:07:43'),
(44, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile\n', '{\"email\":\"stephendavee@gmail.com\",\"apikey\":\"34cvctszx4fr97ofxawdtov7\"}', '2025-08-22 13:08:30'),
(45, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers\n', '{\"email\":\"stephendavee@gmail.com\",\"apikey\":\"34cvctszx4fr97ofxawdtov7\"}', '2025-08-22 13:09:21'),
(46, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers\n', 'null', '2025-08-22 13:09:30'),
(47, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listAllUsers\n', 'null', '2025-08-22 13:10:48'),
(48, 2, 'fsdgsdfsdfgv4vwewetvwev', 'deleteUser\n', '{\"pubkey\":\"m29mt5nmk39xwnqiuqwbdyxo\"}', '2025-08-22 13:12:56'),
(49, 2, 'fsdgsdfsdfgv4vwewetvwev', 'deleteUser\n', '{\"pubkey\":\"m29mt5nmk39xwnqiuqwbdyxo\",\"email\":\"stephendavee@gmail.com\"}', '2025-08-22 13:14:33'),
(50, 2, 'fsdgsdfsdfgv4vwewetvwev', 'deleteuser\n', '{\"pubkey\":\"m29mt5nmk39xwnqiuqwbdyxo\",\"email\":\"stephendavee@gmail.com\"}', '2025-08-22 14:27:55'),
(51, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"stephendavee@gmail.com\",\"password\":\"123456\"}', '2025-08-25 13:03:06'),
(52, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '{\"firstname\":\"Demilade\",\"lastname\":\"Salami\",\"email\":\"davesalami@gmail.com\",\"phone\":\"08032317588\"}', '2025-08-25 13:06:12'),
(53, 2, 'fsdgsdfsdfgv4vwewetvwev', 'updateuserprofile', '{\"country\":\"Nigeria\",\"state\":\"ondo\",\"address\":\"14, Oyemekun Street, Akure\",\"pubkey\":\"awu87sjoo2x22a1nzldshhnu\"}', '2025-08-25 13:08:34'),
(54, 2, 'fsdgsdfsdfgv4vwewetvwev', 'updateuserprofile', 'null', '2025-08-25 13:12:41'),
(55, 2, 'fsdgsdfsdfgv4vwewetvwev', 'updateuserprofile', '{\"country\":\"Nigeria\",\"state\":\"ondo\",\"address\":\"2, Oyemekun Street, Akure\",\"pubkey\":\"awu87sjoo2x22a1nzldshhnu\"}', '2025-08-25 13:13:11'),
(56, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile', '{\"pubkey\":\"jc8x4npb5ja3smpx4bliy2tw\"}', '2025-08-25 13:19:57'),
(57, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-08-25 13:21:58'),
(58, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile', '{\"pubkey\":\"m29mt5nmk39xwnqiuqwbdyxo\"}', '2025-08-25 13:22:50'),
(59, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile', '{\"pubkey\":\"m29mt5nmk39xwnqiuqwbdyxo\"}', '2025-08-25 13:23:18'),
(60, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile', '{\"pubkey\":\"awu87sjoo2x22a1nzldshhnu\"}', '2025-08-25 13:24:36'),
(61, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile', '{\"pubkey\":\"swllrk4ii6ypqjnin6qmj52l\"}', '2025-08-25 13:26:30'),
(62, 5, 'jlvj827a6ezanbdm2q92h9mu', 'getprofile', '{\"apikey\":\"jlvj827a6ezanbdm2q92h9mu\"}', '2025-08-25 13:28:38'),
(63, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile', '{\"pubkey\":\"fsdgsdfsdfgv4vwewetvwev\"}', '2025-08-25 13:30:16'),
(64, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile', '{\"apikey\":\"fsdgsdfsdfgv4vwewetvwev\"}', '2025-08-25 13:30:54'),
(65, 4, '34cvctszx4fr97ofxawdtov7', 'deleteusers', '{\"apikey\":\"34cvctszx4fr97ofxawdtov7\"}', '2025-08-25 13:37:52'),
(66, 4, '34cvctszx4fr97ofxawdtov7', 'deleteusers', '{\"apikey\":\"34cvctszx4fr97ofxawdtov7\"}', '2025-08-25 13:44:46'),
(67, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getmeetings', 'null', '2025-08-25 13:46:48'),
(68, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-25 14:02:39'),
(69, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-25 14:03:24'),
(70, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-25 14:03:37'),
(71, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-25 14:03:56'),
(72, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-25 14:04:41'),
(73, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-25 14:04:53'),
(74, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-25 14:21:00'),
(75, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-25 14:27:02'),
(76, 4, '34cvctszx4fr97ofxawdtov7', 'selectentryor', '{\"table\":\"training_courses\",\"program_id\":3,\"id\":6}', '2025-08-25 14:31:35'),
(77, 4, '34cvctszx4fr97ofxawdtov7', 'deleteentry', '{\"table\":\"training_courses\",\"id\":4}', '2025-08-25 14:33:57'),
(78, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 14:39:10'),
(79, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 14:39:59'),
(80, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 14:40:33'),
(81, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 14:48:59'),
(82, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 14:49:35'),
(83, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 14:58:35'),
(84, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 14:59:23'),
(85, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 15:01:59'),
(86, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 15:03:08'),
(87, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 15:03:24'),
(88, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 15:07:14'),
(89, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 15:07:19'),
(90, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 15:07:22'),
(91, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 15:07:25'),
(92, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 15:07:56'),
(93, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 15:09:38'),
(94, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-09-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-08-25 15:10:57'),
(95, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":\"1\",\"title\":\"Monday Evening Fellowship\",\"meeting_time\":\"2024-09-20 12:04:11\",\"location_details\":\"No 7, Junction Layout, Akure\"}', '2025-08-25 15:15:26'),
(96, 4, '34cvctszx4fr97ofxawdtov7', 'updateentry', '{\"table\":\"cfn_meetings\",\"id\":2,\"attendance\":\"[2,4,5,3]\"}', '2025-08-26 13:26:18'),
(97, 4, '34cvctszx4fr97ofxawdtov7', 'deleteentry', '{\"table\":\"training_courses\",\"id\":4}', '2025-08-26 13:29:29'),
(98, 4, '34cvctszx4fr97ofxawdtov7', 'selectentryor', '{\"table\":\"training_courses\",\"program_id\":3,\"id\":6}', '2025-08-26 13:30:50'),
(99, 4, '34cvctszx4fr97ofxawdtov7', 'createnotification', '{\"sender\":1,\"receiver\":1,\"type\":1,\"message\":\"This is to inform you all that you have new notification for everyone in the system\"}', '2025-08-26 13:34:56'),
(100, 4, '34cvctszx4fr97ofxawdtov7', 'createnotification', '{\"sender\":1,\"receiver\":1,\"type\":1,\"message\":\"This is to inform you all that you have new notification for everyone in the system\"}', '2025-08-26 13:35:02'),
(101, 4, '34cvctszx4fr97ofxawdtov7', 'createnotification', '{\"sender\":1,\"receiver\":1,\"type\":1,\"message\":\"This is to inform you all that you have new notification for everyone in the system\"}', '2025-08-26 13:35:06'),
(102, 4, '34cvctszx4fr97ofxawdtov7', 'createnotification', '{\"sender\":1,\"receiver\":1,\"type\":1,\"message\":\"This is to inform you all that you have new notification for everyone in the system\"}', '2025-08-26 13:47:33'),
(103, 4, '34cvctszx4fr97ofxawdtov7', 'usernotification', '{\"id\":3}', '2025-08-26 14:03:42'),
(104, 4, '34cvctszx4fr97ofxawdtov7', 'usernotification', '{\"id\":3}', '2025-08-26 14:04:12'),
(105, 4, '34cvctszx4fr97ofxawdtov7', 'usernotification', '{\"id\":3}', '2025-08-26 14:05:16'),
(106, 4, '34cvctszx4fr97ofxawdtov7', 'deletetraining', '{\"table\":\"training_modules\",\"id\":1}', '2025-08-26 14:25:38'),
(107, 4, '34cvctszx4fr97ofxawdtov7', 'deletetraining', '{\"table\":\"training_modules\",\"id\":1}', '2025-08-26 14:25:43'),
(108, 4, '34cvctszx4fr97ofxawdtov7', 'gettraining', '{\"table\":\"training_modules\",\"program_id\":3}', '2025-08-26 14:28:09'),
(109, 4, '34cvctszx4fr97ofxawdtov7', 'gettraining', '{\"table\":\"training_modules\",\"program_id\":3}', '2025-08-26 14:28:20'),
(110, 4, '34cvctszx4fr97ofxawdtov7', 'gettraining', '{\"table\":\"training_modules\",\"program_id\":3}', '2025-08-26 14:28:26'),
(111, 4, '34cvctszx4fr97ofxawdtov7', 'gettraining', '{\"table\":\"training_modules\",\"program_id\":3}', '2025-08-26 14:28:34'),
(112, 4, '34cvctszx4fr97ofxawdtov7', 'gettraining', '{\"table\":\"training_modules\",\"program_id\":3}', '2025-08-26 14:28:40'),
(113, 4, '34cvctszx4fr97ofxawdtov7', 'updatetraining', '{\"table\":\"training_modules\",\"id\":2,\"video\":\"https:\\/\\/videourl.com\\/fdjkdhhddsds.jpg\"}', '2025-08-26 14:30:58'),
(114, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-26 14:33:46'),
(115, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-26 14:34:48'),
(116, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-26 14:35:07'),
(117, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-26 14:35:17'),
(118, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-26 14:35:27'),
(119, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-26 14:35:40'),
(120, 4, '34cvctszx4fr97ofxawdtov7', 'changePassword', '{\"password\":\"123\",\"pubkey\":\"gfhfgmnhuyg55yvtgugb7g8\"}', '2025-08-26 14:42:08'),
(121, 4, '34cvctszx4fr97ofxawdtov7', 'selectentryor', '{\"table\":\"training_courses\",\"program_id\":3,\"id\":6}', '2025-08-28 10:35:21'),
(122, 4, '34cvctszx4fr97ofxawdtov7', 'usernotification', '{\"id\":3}', '2025-08-28 10:58:55'),
(123, 4, '34cvctszx4fr97ofxawdtov7', 'usernotification', '{\"id\":3}', '2025-08-28 11:09:41'),
(124, 4, '34cvctszx4fr97ofxawdtov7', 'addmeeting', '{\"pub\":\"pv1gi8yrktytlsix9ub24u28dshtomsy\",\"status\":4,\"title\":\"Student Get together\",\"description\":\"Another powerful hangout in futa area\",\"user\":4}', '2025-08-28 11:16:56'),
(125, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"stephendavee@gmail.com\",\"password\":\"123456\"}', '2025-08-28 11:17:41'),
(126, 4, '34cvctszx4fr97ofxawdtov7', 'addmeeting', '{\"pub\":\"ore7tfypqfknbiju4d127odlnqmixihc\",\"status\":4,\"title\":\"Student Get together\",\"description\":\"Another powerful hangout in futa area\",\"user\":4}', '2025-08-28 11:22:19'),
(127, 4, '34cvctszx4fr97ofxawdtov7', 'deleteusers', '{\"apikey\":\"34cvctszx4fr97ofxawdtov7\"}', '2025-08-28 11:24:58'),
(128, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-08-28 11:26:01'),
(129, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile', '{\"apikey\":\"fsdgsdfsdfgv4vwewetvwev\"}', '2025-08-28 11:26:25'),
(130, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-08-28 11:26:40'),
(131, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":\"5\",\"title\":\"Monday Evening Fellowship\",\"meeting_time\":\"2024-09-20 12:04:11\",\"location_details\":\"No 7, Junction Layout,FUTA\"}', '2025-08-28 11:26:43'),
(132, 4, '34cvctszx4fr97ofxawdtov7', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":\"5\",\"title\":\"Monday Evening Fellowship\",\"meeting_time\":\"2024-09-20 12:04:11\",\"location_details\":\"No 7, Junction Layout,FUTA\"}', '2025-08-28 11:42:32'),
(133, 4, '34cvctszx4fr97ofxawdtov7', 'createnotification', '{\"sender\":1,\"receiver\":1,\"type\":1,\"message\":\"This is to inform you all that you have new notification for everyone in the system\"}', '2025-08-28 11:42:55'),
(134, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-08-28 11:52:30'),
(135, 4, '34cvctszx4fr97ofxawdtov7', 'gettraining', '{\"table\":\"training_modules\",\"program_id\":3}', '2025-08-28 13:37:10'),
(136, 4, '34cvctszx4fr97ofxawdtov7', 'login', '{\"email\":\"stephendavee@gmail.com\",\"password\":\"123456\"}', '2025-08-28 13:42:25'),
(137, 4, '34cvctszx4fr97ofxawdtov7', 'register', '{\"firstname\":\"David\",\"lastname\":\"Stephen\",\"email\":\"stephendaveele@gmail.com\",\"phone\":\"08032318599\",\"password\":\"123456\",\"password2\":\"123456\"}', '2025-08-28 13:43:39'),
(138, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-08-28 14:21:02'),
(139, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile', '{\"apikey\":\"fsdgsdfsdfgv4vwewetvwev\"}', '2025-08-28 14:29:00'),
(140, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile', '{\"apikey\":\"fsdgsdfsdfgv4vwewetvwev\"}', '2025-08-28 14:29:42'),
(141, 2, 'fsdgsdfsdfgv4vwewetvwev', 'getprofile', '{\"apikey\":\"fsdgsdfsdfgv4vwewetvwev\"}', '2025-08-28 14:31:21'),
(142, 2, 'fsdgsdfsdfgv4vwewetvwev', 'changePassword', '{\"password\":\"123\",\"pubkey\":\"gfhfgmnhuyg55yvtgugb7g8\"}', '2025-08-28 14:49:20'),
(143, 2, 'fsdgsdfsdfgv4vwewetvwev', 'changePassword', '{\"password\":\"123\",\"pubkey\":\"gfhfgmnhuyg55yvtgugb7g8\"}', '2025-08-28 14:50:30'),
(144, 4, '34cvctszx4fr97ofxawdtov7', 'createDonation', '{\"amount\":\"10000\",\"type\":\"donation for paam camp meeting\",\"payment_method\":\"Bank Transfer\",\"pub\":\"gfhfgmnhuyg55yvtgugb7g8\"}', '2025-08-28 14:57:24'),
(145, 4, '34cvctszx4fr97ofxawdtov7', 'changepassword', '{\"pubkey\":\"gfhfgmnhuyg55yvtgugb7g8\",\"amount\":\"10000\",\"type\":\"donation for paam camp meeting\",\"payment_method\":\"Bank Transfer\"}', '2025-08-28 14:58:02'),
(146, 4, '34cvctszx4fr97ofxawdtov7', 'createDonation', '{\"amount\":\"10000\",\"type\":\"donation for paam camp meeting\",\"payment_method\":\"Bank Transfer\"}', '2025-08-28 14:59:07'),
(147, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-28 15:02:47'),
(148, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-28 15:04:14'),
(149, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-28 15:04:33'),
(150, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-28 15:04:44'),
(151, 4, '34cvctszx4fr97ofxawdtov7', 'updatetraining', '{\"table\":\"training_modules\",\"id\":2,\"video\":\"https:\\/\\/videourl.com\\/fdjkdhhddsds.jpg\"}', '2025-08-28 15:04:59'),
(152, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-28 15:05:01'),
(153, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-28 15:05:08'),
(154, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-28 15:05:20'),
(155, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-28 15:44:48'),
(156, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-08-29 08:11:37'),
(157, 2, 'fsdgsdfsdfgv4vwewetvwev', 'updateuserprofile', '{\"country\":\"Nigeria\",\"state\":\"ondo\",\"address\":\"14, Oyemekun Street, Akure\",\"pubkey\":\"awu87sjoo2x22a1nzldshhnu\"}', '2025-08-29 08:11:54'),
(158, 2, 'fsdgsdfsdfgv4vwewetvwev', 'updateuserprofile', '{\"country\":\"Nigeria\",\"state\":\"ondo\",\"address\":\"14, Oyemekun Street, Akure\",\"pubkey\":\"awu87sjoo2x22a1nzldshhnu\"}', '2025-08-29 08:12:17'),
(159, 2, 'fsdgsdfsdfgv4vwewetvwev', 'adduser', '{\"firstname\":\"Demilade\",\"lastname\":\"Salami\",\"email\":\"davesalami@gmail.com\",\"phone\":\"08032317588\"}', '2025-08-29 08:12:36'),
(160, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"stephendavee@gmail.com\",\"password\":\"123456\"}', '2025-08-29 08:13:03'),
(161, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-08-29 10:06:30'),
(162, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-08-29 10:06:47'),
(163, 2, 'fsdgsdfsdfgv4vwewetvwev', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-09-01 08:23:45'),
(164, 2, 'fsdgsdfsdfgv4vwewetvwev', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-09-01 08:24:01'),
(165, 2, 'fsdgsdfsdfgv4vwewetvwev', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-09-01 08:47:31'),
(166, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-09-01 10:35:32'),
(167, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-09-05 10:08:28'),
(168, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"oluwasolaowoyemi@gmail.com\",\"password\":\"12345\"}', '2025-09-08 12:47:38'),
(169, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-09-08 12:48:40'),
(170, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"oluwasolaowoyemi.i@gmail.com\",\"password\":\"12345\"}', '2025-09-08 12:49:50'),
(171, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"oluwasolaowoyemi.i@gmail.com\",\"password\":\"12345\"}', '2025-09-08 12:50:32'),
(172, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"oluwasolaowoyemi.i@gmail.com\",\"password\":\"1234\"}', '2025-09-08 12:50:38'),
(173, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"solaagro@gmail.com\",\"password\":\"12345\"}', '2025-09-08 13:21:34'),
(174, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"solaagro@gmail.com\",\"password\":\"1234\"}', '2025-09-08 13:22:39'),
(175, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"oluwasolaowoyemi.i@gmail.com\",\"password\":\"123443\"}', '2025-09-08 13:22:51'),
(176, 2, 'fsdgsdfsdfgv4vwewetvwev', 'loginuser', '{\"email\":\"oluwasolaowoyemi.i@gmail.com\",\"password\":\"1234\"}', '2025-09-08 13:23:03'),
(177, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-09-08 13:28:55'),
(178, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-09-08 13:31:22'),
(179, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-09-08 13:31:24'),
(180, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-09-08 13:32:17'),
(181, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-09-08 13:32:18'),
(182, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-09-09 08:52:38'),
(183, 2, 'fsdgsdfsdfgv4vwewetvwev', 'listusers', 'null', '2025-09-09 08:52:45'),
(184, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-09-09 11:51:58'),
(185, 4, '34cvctszx4fr97ofxawdtov7', 'addtraining', '{\"table\":\"training_courses\",\"program_id\":2,\"module_id\":2,\"title\":\"Leadership Training Introductions\",\"description\":\"Introduction to Leadership training to become CFN Leader\"}', '2025-09-09 11:52:29'),
(186, 4, '34cvctszx4fr97ofxawdtov7', 'register', '{\"firstname\":\"David\",\"lastname\":\"Stephen\",\"email\":\"stephendaveele@gmail.com\",\"phone\":\"08032318599\",\"password\":\"123456\",\"password2\":\"123456\"}', '2025-09-09 12:00:57'),
(187, 2, 'fsdgsdfsdfgv4vwewetvwev', 'addentry', '{\"table\":\"cfn_meetings\",\"validate\":\"meeting_time\",\"cfn_id\":2,\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-10-23 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-09-10 11:51:59'),
(188, 2, 'fsdgsdfsdfgv4vwewetvwev', 'updateentry', '{\"table\":\"cfn_meetings\",\"id\":3,\"validate\":\"meeting_time\",\"title\":\"Sunday Evening Fellowship\",\"meeting_time\":\"2025-10-21 14:04:11\",\"location_details\":\"No 12, Asokoro Layout, Jabi Estate\"}', '2025-09-10 11:54:26'),
(189, 2, 'fsdgsdfsdfgv4vwewetvwev', 'deleteentry', '{\"table\":\"cfn_meetings\",\"id\":3}', '2025-09-10 11:55:52'),
(190, 2, 'fsdgsdfsdfgv4vwewetvwev', 'selectentry', '{\"table\":\"cfn_meetings\"}', '2025-09-10 11:57:00'),
(191, 2, 'fsdgsdfsdfgv4vwewetvwev', 'selectentry', '{\"table\":\"cfn_meetings\",\"title\":\"Mid-week Fellowship\"}', '2025-09-10 11:58:44');

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `lesson_id` int NOT NULL,
  `module_id` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `content_type` enum('video','audio','text') COLLATE utf8mb4_general_ci NOT NULL,
  `content_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lesson_order` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `live_streams`
--

CREATE TABLE `live_streams` (
  `stream_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `stream_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` bigint UNSIGNED NOT NULL,
  `sender` int NOT NULL,
  `receiver` int NOT NULL,
  `type` int NOT NULL,
  `message` varchar(2000) COLLATE utf8mb4_general_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `sender`, `receiver`, `type`, `message`, `created`, `status`) VALUES
(1, 1, 3, 2, 'This is to inform you that you have new notification', '2025-08-19 14:32:47', 1),
(2, 1, 1, 1, 'This is to inform you all that you have new notification for everyone in the system', '2025-08-19 14:32:25', 1),
(3, 1, 1, 1, 'This is to inform you all that you have new notification for everyone in the system', '2025-08-26 13:34:56', 1),
(4, 1, 1, 1, 'This is to inform you all that you have new notification for everyone in the system', '2025-08-26 13:35:02', 1),
(5, 1, 1, 1, 'This is to inform you all that you have new notification for everyone in the system', '2025-08-26 13:35:06', 1),
(6, 1, 1, 1, 'This is to inform you all that you have new notification for everyone in the system', '2025-08-26 13:47:33', 1),
(7, 1, 1, 1, 'This is to inform you all that you have new notification for everyone in the system', '2025-08-28 11:42:55', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `order_status` varchar(50) COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `price` decimal(10,2) NOT NULL,
  `product_type` enum('ebook','merchandise') COLLATE utf8mb4_general_ci NOT NULL,
  `file_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `stock_quantity` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` int NOT NULL,
  `lesson` int DEFAULT NULL,
  `old_lesson_id` int DEFAULT NULL,
  `question` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `a` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `b` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `c` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `d` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ca` varchar(12) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `lesson`, `old_lesson_id`, `question`, `a`, `b`, `c`, `d`, `ca`) VALUES
(6, 2, NULL, 'what is the name of Nigerian president?', 'bola', 'ahmed', 'fela', 'borokini', 'a'),
(7, 2, NULL, 'what is the name of Capital of Nigeia?', 'bola', 'ahmed', 'fela', 'borokini', 'c');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_attempts`
--

CREATE TABLE `quiz_attempts` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `lesson` int DEFAULT NULL,
  `quiz_id` int DEFAULT NULL,
  `score` decimal(5,2) NOT NULL,
  `attempted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_attempts`
--

INSERT INTO `quiz_attempts` (`id`, `user_id`, `lesson`, `quiz_id`, `score`, `attempted_at`) VALUES
(1, 2, 5, NULL, 69.50, '2025-08-20 14:19:09'),
(2, 2, 6, NULL, 69.50, '2025-08-20 14:20:22'),
(4, 5, 6, NULL, 69.50, '2025-08-20 14:21:45');

-- --------------------------------------------------------

--
-- Table structure for table `referrals`
--

CREATE TABLE `referrals` (
  `referral_id` int NOT NULL,
  `referrer_user_id` int DEFAULT NULL,
  `invitee_user_id` int DEFAULT NULL,
  `status` enum('pending','registered','completed_training') COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `role_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `training_courses`
--

CREATE TABLE `training_courses` (
  `id` bigint UNSIGNED NOT NULL,
  `program_id` int DEFAULT NULL,
  `module_id` int DEFAULT NULL,
  `title` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(225) COLLATE utf8mb4_general_ci NOT NULL,
  `content` varchar(5000) COLLATE utf8mb4_general_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `training_courses`
--

INSERT INTO `training_courses` (`id`, `program_id`, `module_id`, `title`, `description`, `content`, `created`, `status`) VALUES
(1, 2, 2, 'Leadership Training Introductions', 'Introduction to Leadership training to become CFN Leader', '', '2025-08-18 13:26:50', 1),
(2, 2, 2, 'The Leadership Training Introductions', 'Introduction to Leadership training to become CFN Leader', '', '2025-08-19 07:50:49', 1),
(5, 6, 2, 'The power of the Holy Spirit', 'Give the Holy Spirit a way in your life', '', '2025-08-19 09:01:44', 1),
(6, 5, 2, 'The Second coming of Jesus Christ', 'Salvation, the only ticket to Ethernal Life', '', '2025-08-19 08:59:27', 1),
(7, 2, 2, 'Living a Purposeful life', 'Demands for doing God', '', '2025-08-19 08:58:12', 1),
(8, 2, 2, 'Accepting Christ', 'Denying Satan', '', '2025-08-19 09:07:10', 1),
(9, 2, 2, 'Standing for christ', 'Christ our backend', '', '2025-08-19 09:09:19', 1),
(10, 2, 2, 'God is good', 'The Goodness of God', '', '2025-08-19 09:10:50', 1);

-- --------------------------------------------------------

--
-- Table structure for table `training_modules`
--

CREATE TABLE `training_modules` (
  `id` int NOT NULL,
  `program_id` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `video` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int NOT NULL DEFAULT '1',
  `stage_order` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `training_modules`
--

INSERT INTO `training_modules` (`id`, `program_id`, `title`, `description`, `video`, `created`, `status`, `stage_order`) VALUES
(2, 2, 'Leadership Training Introductions', 'Introduction to Leadership training to become CFN Leader', 'https://videourl.com/fdjkdhhddsds.jpg', '2025-08-18 12:44:31', 1, 0),
(3, 2, 'The way of holiness', 'understanding what is takes to stay holy', 'https://videourl/holinessistheway.jpg', '2025-08-19 09:43:17', 1, 0),
(4, 2, 'Executive Innauguration meetings', 'ok', NULL, '2025-08-19 09:47:00', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `training_programs`
--

CREATE TABLE `training_programs` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `training_programs`
--

INSERT INTO `training_programs` (`id`, `title`, `description`, `created`, `status`) VALUES
(1, 'Global Mandate Training Program', 'Foundational training for all members.', '2025-08-18 10:14:39', 1),
(2, 'Leadership Training', 'Leadership training to become CFN Leader', '2025-08-18 11:27:35', 1);

-- --------------------------------------------------------

--
-- Table structure for table `training_progress`
--

CREATE TABLE `training_progress` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `course` int DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deadline` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `completed_at` datetime DEFAULT NULL,
  `program` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `training_progress`
--

INSERT INTO `training_progress` (`id`, `user_id`, `course`, `created`, `deadline`, `status`, `completed_at`, `program`) VALUES
(32, 6, 2, '2025-08-18 15:01:36', '2025-10-07 15:49:27', 1, '2025-10-07 15:49:27', 2),
(33, 6, 2, '2025-08-28 14:37:34', '2025-10-17 15:34:47', 1, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `pubkey` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `apikey` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `firstname` varchar(25) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastname` varchar(25) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `othername` varchar(35) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(84) COLLATE utf8mb4_general_ci NOT NULL,
  `otp` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email_validated` int NOT NULL DEFAULT '0',
  `phone_validated` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `country` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lga` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(155) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country_code` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `occupation` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_roles` int NOT NULL DEFAULT '1',
  `team` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `role_title` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location_title` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1'
) ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `pubkey`, `apikey`, `firstname`, `lastname`, `othername`, `email`, `phone`, `password`, `otp`, `email_validated`, `phone_validated`, `created_at`, `updated_at`, `country`, `state`, `lga`, `city`, `address`, `country_code`, `occupation`, `user_roles`, `team`, `role_title`, `location_title`, `status`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, 'new.user@example.com', '+1234567890', 'hashed_password_string', NULL, 0, 0, '2025-08-07 10:24:55', '2025-08-07 10:24:55', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, 1),
(2, NULL, 'fsdgsdfsdfgv4vwewetvwev', 'Alexander', 'Desmond', NULL, 'ogbajigodwin@gmail.com', '+2348032318588', '$2y$10$kVjrr2tJljdj8EbJOkwB/ucwFJfxAwpM0DoMWt2d3EYMma2bfWICG', '298125194', 1, 0, '2025-08-07 10:27:29', '2025-08-20 14:58:23', NULL, NULL, NULL, NULL, 'Anglican Office Complex, Alagbaka', NULL, 'Businessman', 2, '[2]', 'Center Coordinator', 'Orita-obele group', 1),
(3, 'jc8x4npb5ja3smpx4bliy2tw', 'dxhqy1pupz1aavqcd5vl2m1d', 'emmanuel', 'Dalington', NULL, 'dalingtone@gmail.com', '08032318522', '$2y$10$iho5ELCh9vf9cAiHkb9Or.8UuACBnM7diQ7afh8mD3gH7oSrx6NyK', NULL, 0, 0, '2025-08-11 13:37:33', '2025-08-20 11:14:49', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, '[5]', 'Center Coordinator', 'Fanibi Quaters', 1),
(4, 'm29mt5nmk39xwnqiuqwbdyxo', '34cvctszx4fr97ofxawdtov7', 'Dave', 'Stephen', NULL, 'stephendave@gmail.com', '08032318583', '$2y$10$9HW9DbmUgH5Q2hVYPevHBOXB7X6L//WLlD/brmCzdQ.QopOfiisba', NULL, 0, 0, '2025-08-11 13:39:49', '2025-08-25 13:37:52', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, 0),
(5, 'awu87sjoo2x22a1nzldshhnu', 'jlvj827a6ezanbdm2q92h9mu', 'David', 'Stephen', NULL, 'stephendavee@gmail.com', '08032318590', '$2y$10$cwlboKmLzO0wt6egswTlEeIcmXErR28waci2Dl0HzbA7hs.aA5B4O', NULL, 0, 0, '2025-08-11 13:55:40', '2025-08-29 08:11:54', 'Nigeria', 'ondo', NULL, NULL, '14, Oyemekun Street, Akure', NULL, NULL, 3, NULL, NULL, NULL, 1),
(6, 'swllrk4ii6ypqjnin6qmj52l', 'mezeprkbzu7t6u3yba8qfvwrnl6thavq', 'David', 'Stephen', NULL, 'stephendave22@gmail.com', '08032318560', '$2y$10$RMaJbZM0QGiiV6cjXXQEvuTrPc19.PJ7PD4bW9arzNcXhUUy34hLC', '4504', 0, 0, '2025-08-18 07:35:22', '2025-08-28 14:31:06', 'Nigeria', 'Ondo', NULL, NULL, '23, Oyemekun Street, Akure', '234', NULL, 3, NULL, NULL, NULL, 0),
(7, 'c4aooj6idovqbdlwhr3yfja2', 'kzyicrxftn4rukeubihcnkr2tdljlibk', 'David', 'Stephen', NULL, 'stephendaveele@gmail.com', '08032318599', '$2y$10$dK0X9CxuHX3QQqGQnsHpluBmGqwMnANlt.Nxt9zfB5EeZKrvFSH7.', '8158', 0, 0, '2025-08-22 10:45:09', '2025-08-22 10:45:09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1),
(8, '7kevhne5nskk6wzr3lbxhk53', 'yc3468hj8w9j2nlnutkdem22g2omkiq6', 'Abdulrahman', 'Adedokun', NULL, 'abdulrahman@gmail.com', '08032313334', '', NULL, 0, 0, '2025-08-22 10:46:05', '2025-08-22 10:46:05', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1),
(9, '22i8evx7wl2w5adwsjbbpjm7', 'qm6euvxzsunzlpi95mchosbzek5q2a2z', 'Demilade', 'Salami', NULL, 'salami@gmail.com', '08032317578', '', NULL, 0, 0, '2025-08-22 11:48:41', '2025-08-22 11:48:41', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1),
(10, 'iwjscjmh43ibhtkojry57svs', '4wmnbnfs7me9ai2825ht5ekclz4pyavu', 'Demilade', 'Salami', NULL, 'davesalami@gmail.com', '08032317588', '', NULL, 0, 0, '2025-08-22 11:50:28', '2025-08-22 11:50:28', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1),
(11, 'gq4l26ikgdqqd3k8ng79w7u5', 'c4qwxnfn46rplx98u2tz5bes8mpt5vw5', 'avid', 'Stephen', NULL, 'stephendaveeleven@gmail.com', '08032318531', '$2y$10$QJDW6oIfAZlVGR.71kiMf.ecSWHdqKnysxZZ8TTwdbolORdWgLkFy', '6733', 0, 0, '2025-08-28 14:05:37', '2025-09-08 11:11:34', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1),
(12, '7pwpi6gul3hfjw87q696nt25', 'h851rvyga49ebn9fwkf2k4lwttcsg922', 'Owoyemi', 'Itunu', NULL, 'oluwasolaowoyemi.i@gmail.com', '08109951960', '$2y$10$BsXbZHGRzlbvPMTQr2TSWud4EwfWMiy/.HTt6owZegBxpOnDotjga', '9028', 0, 0, '2025-09-08 12:36:56', '2025-09-08 12:36:56', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_badges`
--

CREATE TABLE `user_badges` (
  `user_badge_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `badge_id` int DEFAULT NULL,
  `earned_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_devotional_progress`
--

CREATE TABLE `user_devotional_progress` ( 
  `progress_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `last_completed_day` int DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `profile_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `paam_reference_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `residential_address` text COLLATE utf8mb4_general_ci,
  `country_code` varchar(5) COLLATE utf8mb4_general_ci NOT NULL,
  `occupation` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `profile_picture_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `privacy_settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ;

--
-- Dumping data for table `user_profiles`
--

INSERT INTO `user_profiles` (`profile_id`, `user_id`, `paam_reference_id`, `full_name`, `residential_address`, `country_code`, `occupation`, `profile_picture_url`, `privacy_settings`) VALUES
(1, 1, NULL, 'John Doe', NULL, '+1', 'Student', NULL, NULL),
(2, 2, NULL, 'Godwin Ogbaji', '24\r\nState Industrial Layout', '', 'Businessman', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_role_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `badges`
--
ALTER TABLE `badges`
  ADD PRIMARY KEY (`badge_id`);

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`campaign_id`);

--
-- Indexes for table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`certificate_id`),
  ADD UNIQUE KEY `qr_code_id` (`qr_code_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `cfn_groups`
--
ALTER TABLE `cfn_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coordinator_id` (`coordinator_id`);

--
-- Indexes for table `cfn_meetings`
--
ALTER TABLE `cfn_meetings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cfn_meetings_ibfk_1` (`cfn_id`);

--
-- Indexes for table `cfn_members`
--
ALTER TABLE `cfn_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cfn_members_ibfk_1` (`cfn_id`),
  ADD KEY `cfn_members_ibfk_2` (`user_id`);

--
-- Indexes for table `devotionals`
--
ALTER TABLE `devotionals`
  ADD PRIMARY KEY (`devotional_id`),
  ADD UNIQUE KEY `day_sequence` (`day_sequence`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`donation_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `campaign_id` (`campaign_id`);

--
-- Indexes for table `event_logs`
--
ALTER TABLE `event_logs`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`lesson_id`),
  ADD KEY `lessons_ibfk_1` (`module_id`);

--
-- Indexes for table `live_streams`
--
ALTER TABLE `live_streams`
  ADD PRIMARY KEY (`stream_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quizzes_ibfk_1` (`old_lesson_id`);

--
-- Indexes for table `quiz_attempts`
--
ALTER TABLE `quiz_attempts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_attempts_ibfk_1` (`user_id`),
  ADD KEY `quiz_attempts_ibfk_2` (`quiz_id`);

--
-- Indexes for table `referrals`
--
ALTER TABLE `referrals`
  ADD PRIMARY KEY (`referral_id`),
  ADD KEY `referrer_user_id` (`referrer_user_id`),
  ADD KEY `invitee_user_id` (`invitee_user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `training_courses`
--
ALTER TABLE `training_courses`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `training_modules`
--
ALTER TABLE `training_modules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `training_modules_ibfk_1` (`program_id`);

--
-- Indexes for table `training_programs`
--
ALTER TABLE `training_programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `training_progress`
--
ALTER TABLE `training_progress`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_number` (`phone`);

--
-- Indexes for table `user_badges`
--
ALTER TABLE `user_badges`
  ADD PRIMARY KEY (`user_badge_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `badge_id` (`badge_id`);

--
-- Indexes for table `user_devotional_progress`
--
ALTER TABLE `user_devotional_progress`
  ADD PRIMARY KEY (`progress_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`profile_id`),
  ADD UNIQUE KEY `paam_reference_id` (`paam_reference_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_role_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `badges`
--
ALTER TABLE `badges`
  MODIFY `badge_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `campaign_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `certificates`
--
ALTER TABLE `certificates`
  MODIFY `certificate_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cfn_groups`
--
ALTER TABLE `cfn_groups`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cfn_meetings`
--
ALTER TABLE `cfn_meetings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cfn_members`
--
ALTER TABLE `cfn_members`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `devotionals`
--
ALTER TABLE `devotionals`
  MODIFY `devotional_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `donation_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_logs`
--
ALTER TABLE `event_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lessons`

--
ALTER TABLE `lessons`
  MODIFY `lesson_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `live_streams`
--
ALTER TABLE `live_streams`
  MODIFY `stream_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `quiz_attempts`
--
ALTER TABLE `quiz_attempts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `referrals`
--
ALTER TABLE `referrals`
  MODIFY `referral_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `training_courses`
--
ALTER TABLE `training_courses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `training_modules`
--
ALTER TABLE `training_modules`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `training_programs`
--
ALTER TABLE `training_programs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `training_progress`
--
ALTER TABLE `training_progress`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_badges`
--
ALTER TABLE `user_badges`
  MODIFY `user_badge_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_devotional_progress`
--
ALTER TABLE `user_devotional_progress`
  MODIFY `progress_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_profiles`
--
ALTER TABLE `user_profiles`
  MODIFY `profile_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `user_role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `certificates`
--
ALTER TABLE `certificates`
  ADD CONSTRAINT `certificates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_2` FOREIGN KEY (`program_id`) REFERENCES `training_programs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cfn_groups`
--
ALTER TABLE `cfn_groups`
  ADD CONSTRAINT `cfn_groups_ibfk_1` FOREIGN KEY (`coordinator_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `cfn_meetings`
--
ALTER TABLE `cfn_meetings`
  ADD CONSTRAINT `cfn_meetings_ibfk_1` FOREIGN KEY (`cfn_id`) REFERENCES `cfn_groups` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cfn_members`
--
ALTER TABLE `cfn_members`
  ADD CONSTRAINT `cfn_members_ibfk_1` FOREIGN KEY (`cfn_id`) REFERENCES `cfn_groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cfn_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `donations_ibfk_2` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`campaign_id`) ON DELETE SET NULL;

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `training_modules` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`old_lesson_id`) REFERENCES `lessons` (`lesson_id`) ON DELETE CASCADE;

--
-- Constraints for table `quiz_attempts`
--
ALTER TABLE `quiz_attempts`
  ADD CONSTRAINT `quiz_attempts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `quiz_attempts_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `referrals`
--
ALTER TABLE `referrals`
  ADD CONSTRAINT `referrals_ibfk_1` FOREIGN KEY (`referrer_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `referrals_ibfk_2` FOREIGN KEY (`invitee_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `training_modules`
--
ALTER TABLE `training_modules`
  ADD CONSTRAINT `training_modules_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `training_programs` (`id`) ON DELETE CASCADE;
COMMIT;

-- --------------------------------------------------------

--
-- Table structure for table `prayer_focus`
--

CREATE TABLE `prayer_focus` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `actions` text COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `verse_of_the_day`
--

CREATE TABLE `verse_of_the_day` (
  `id` int NOT NULL,
  `bible_verse` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `exhortation` text COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_completion`
--

CREATE TABLE `course_completion` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `completed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `community_spotlight`
--

CREATE TABLE `community_spotlight` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `testimony` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for new tables
--

--
-- Indexes for table `prayer_focus`
--
ALTER TABLE `prayer_focus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `verse_of_the_day`
--
ALTER TABLE `verse_of_the_day`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `date` (`date`);

--
-- Indexes for table `course_completion`
--
ALTER TABLE `course_completion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `community_spotlight`
--
ALTER TABLE `community_spotlight`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for new tables
--

--
-- AUTO_INCREMENT for table `prayer_focus`
--
ALTER TABLE `prayer_focus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `verse_of_the_day`
--
ALTER TABLE `verse_of_the_day`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_completion`
--
ALTER TABLE `course_completion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `community_spotlight`
--
ALTER TABLE `community_spotlight`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for new tables
--

--
-- Constraints for table `course_completion`
--
ALTER TABLE `course_completion`
  ADD CONSTRAINT `course_completion_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `course_completion_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `training_courses` (`id`) ON DELETE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
