-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2025 at 01:01 PM
-- Server version: 10.4.32-MariaDB-log
-- PHP Version: 8.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thbm_newproject2025`
--

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `dgft_branch_id` int(11) DEFAULT NULL,
  `profile_id` int(11) DEFAULT NULL,
  `iec_code` varchar(255) DEFAULT NULL,
  `dgft_branch_code` varchar(155) DEFAULT NULL,
  `branch_addr1` text DEFAULT NULL,
  `branch_addr2` text DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_3zCO636BaPUG2aog', 's:7:\"forever\";', 2080891038),
('laravel_cache_6bmxSK35pEEdrP0T', 's:7:\"forever\";', 2080894292),
('laravel_cache_7JLOAVWtuNiNXVZ7', 's:7:\"forever\";', 2080898712),
('laravel_cache_7RXHb23oaM42sdlk', 'a:1:{s:11:\"valid_until\";i:1765539522;}', 1766748582),
('laravel_cache_9tU182NrwnbAAjvG', 's:7:\"forever\";', 2080896785),
('laravel_cache_hP4O2F4Vxv2a4qTu', 's:7:\"forever\";', 2080893762),
('laravel_cache_HqJXBBtGIWcuku3t', 's:7:\"forever\";', 2080898316),
('laravel_cache_jKghqX7HU1Cv0GTE', 's:7:\"forever\";', 2080891724),
('laravel_cache_PkVFNjIohpnpIFOQ', 's:7:\"forever\";', 2080894204),
('laravel_cache_qIWeccO69GuYsDbV', 's:7:\"forever\";', 2080893611),
('laravel_cache_QNJOa2ECDzwOnFvo', 's:7:\"forever\";', 2080891167),
('laravel_cache_spBjiIyTmvvsoGah', 's:7:\"forever\";', 2080900661),
('laravel_cache_Swx8VCQAz0pEt7CH', 'a:1:{s:11:\"valid_until\";i:1765539573;}', 1766749233),
('laravel_cache_UdzHpIADWOhoNX1A', 's:7:\"forever\";', 2080890919),
('laravel_cache_uOGOxwTx5JoRYBJF', 's:7:\"forever\";', 2080893262),
('laravel_cache_vLBimGt44SiUDEkp', 's:7:\"forever\";', 2080893346),
('laravel_cache_WFG96XfPYg7r1DCZ', 's:7:\"forever\";', 2080898266),
('laravel_cache_WkixAw9xTxUL00Hs', 's:7:\"forever\";', 2080898051),
('laravel_cache_Y7oW7u71OD4zbD7o', 's:7:\"forever\";', 2080893446),
('laravel_cache_z5j9CVsOFTOMlkCi', 's:7:\"forever\";', 2080891331),
('laravel_cache_zbtZTtOOVC7T0Myg', 'a:1:{s:11:\"valid_until\";i:1765539645;}', 1766749305);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dgft_branches`
--

CREATE TABLE `dgft_branches` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `dgft_user_id` int(11) DEFAULT NULL,
  `branch_code` varchar(155) DEFAULT NULL,
  `branch_addr1` text DEFAULT NULL,
  `branch_addr2` text DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dgft_branches`
--

INSERT INTO `dgft_branches` (`id`, `dgft_user_id`, `branch_code`, `branch_addr1`, `branch_addr2`, `city`, `state`, `pincode`, `created_at`, `updated_at`) VALUES
(1, 1, '1', 'Branch 1 Addr1', 'Branch 1 Addr2', 'city1', 'satate1', '111111', '2025-12-10 09:12:54', '2025-12-10 09:12:54'),
(2, 2, '2', 'Branch 2 Addr1', 'Branch 2  Addr2', 'city2', 'state2', '222222', '2025-12-10 09:12:54', '2025-12-10 09:12:54'),
(3, 3, '3', 'Branch 3 Addr1', 'Branch 3 Addr2', 'city3', 'state3', '333333', '2025-12-10 09:16:13', '2025-12-10 09:16:13'),
(4, 4, '4', 'Branch 4 Addr1', 'Branch 4 Addr2', 'city4', 'satate4', '444444', '2025-12-10 09:12:54', '2025-12-10 09:12:54'),
(5, 5, '5', 'Branch 5 Addr1', 'Branch 5 Addr2', 'city5', 'state5', '555555', '2025-12-10 09:12:54', '2025-12-10 09:12:54'),
(6, 6, '6', 'Branch 6 Addr1', 'Branch 6 Addr2', 'city6', 'state6', '666666', '2025-12-10 09:16:13', '2025-12-10 09:16:13'),
(7, 7, '7', 'Branch 7 Addr1', 'Branch 7 Addr2', 'city7', 'satate4', '777777', '2025-12-10 09:12:54', '2025-12-10 09:12:54'),
(8, 8, '8', 'Branch 8 Addr1', 'Branch 8 Addr2', 'city8', 'state5', '888888', '2025-12-10 09:12:54', '2025-12-10 09:12:54'),
(9, 9, '9', 'Branch 9 Addr1', 'Branch 9 Addr2', 'city9', 'state6', '999999', '2025-12-10 09:16:13', '2025-12-10 09:16:13'),
(10, 10, '10', 'Branch 10 Addr1', 'Branch 10 Addr2', 'city10', 'satate10', '100000', '2025-12-10 09:12:54', '2025-12-10 09:12:54'),
(11, 11, '11', 'Branch 11 Addr1', 'Branch 11 Addr2', 'city11', 'state11', '110000', '2025-12-10 09:12:54', '2025-12-10 09:12:54'),
(12, 12, '12', 'Branch 12 Addr1', 'Branch 12 Addr2', 'city12', 'state12', '120000', '2025-12-10 09:16:13', '2025-12-10 09:16:13'),
(13, 13, '13', 'Branch 13 Addr1', 'Branch 13 Addr2', 'city13', 'satate13', '130000', '2025-12-10 09:12:54', '2025-12-10 09:12:54'),
(14, 14, '14', 'Branch 14 Addr1', 'Branch 14 Addr2', 'city14', 'state14', '140000', '2025-12-10 09:12:54', '2025-12-10 09:12:54'),
(15, 15, '15', 'Branch 15 Addr1', 'Branch 15 Addr2', 'city15', 'state15', '150000', '2025-12-10 09:16:13', '2025-12-10 09:16:13');

-- --------------------------------------------------------

--
-- Table structure for table `dgft_directors`
--

CREATE TABLE `dgft_directors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `dgft_user_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dgft_directors`
--

INSERT INTO `dgft_directors` (`id`, `dgft_user_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 1, 'Director 1', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(2, 2, 'Director 2', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(3, 3, 'Director 3', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(4, 4, 'Director 4', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(5, 5, 'Director 5', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(6, 6, 'Director 6', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(7, 7, 'Director 7', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(8, 8, 'Director 8', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(9, 9, 'Director 9', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(10, 10, 'Director 10', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(11, 11, 'Director 11', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(12, 12, 'Director 12', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(13, 13, 'Director 13', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(14, 14, 'Director 14', '2025-12-10 09:03:27', '2025-12-10 09:03:27'),
(15, 15, 'Director 15', '2025-12-10 09:03:27', '2025-12-10 09:03:27');

-- --------------------------------------------------------

--
-- Table structure for table `dgft_imp_exp_users`
--

CREATE TABLE `dgft_imp_exp_users` (
  `id` int(11) NOT NULL,
  `iec` varchar(255) DEFAULT NULL,
  `entityName` varchar(255) DEFAULT NULL,
  `addressLine1` varchar(255) DEFAULT NULL,
  `addressLine2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pin` int(11) DEFAULT NULL,
  `contactNo` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `iecIssueDate` varchar(255) DEFAULT NULL,
  `exporterType` int(11) DEFAULT NULL,
  `pan` varchar(255) DEFAULT NULL,
  `iecStatus` int(11) DEFAULT NULL,
  `starStatus` int(11) DEFAULT NULL,
  `iecModificationDate` varchar(255) DEFAULT NULL,
  `dataAsOn` varchar(255) DEFAULT NULL,
  `natureOfConcern` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dgft_imp_exp_users`
--

INSERT INTO `dgft_imp_exp_users` (`id`, `iec`, `entityName`, `addressLine1`, `addressLine2`, `city`, `state`, `pin`, `contactNo`, `email`, `iecIssueDate`, `exporterType`, `pan`, `iecStatus`, `starStatus`, `iecModificationDate`, `dataAsOn`, `natureOfConcern`) VALUES
(1, 'IEC0000001', 'Entity 1', 'Address 1A', 'Address 1B', 'City1', 'State1', 123456, '1111111111', 'iec_user01@yopmail.com', '2021-01-01', 1, 'PAN001', 1, 1, '26062023', '2025-06-01', 0),
(2, 'IEC0000002', 'Entity 2', 'Address 2A', 'Address 2B', 'City2', 'State2', 123457, '2222222222', '2iec_user2@yopmail.com', '2021-02-01', 1, 'PAN002', 1, 1, '26062029', '2025-06-01', 0),
(3, 'IEC0000003', 'Entity 3', 'Address 3A', 'Address 3B', 'City3', 'State3', 123458, '3333333333', 'iec_user30@yopmail.com', '2021-03-01', 1, 'PAN003', 1, 1, '26062024', '2025-06-01', 0),
(4, 'IEC0000004', 'Entity 4', 'Address 4A', 'Address 4B', 'City4', 'State4', 123459, '4444444444', 'iec_user4@yopmail.com', '2021-04-01', 1, 'PAN004', 1, 1, '26062026', '2025-06-01', 0),
(5, 'IEC0000005', 'Entity 5', 'Address 5A', 'Address 5B', 'City5', 'State5', 123460, '5555555555', 'iec_user5@yopmail.com', '2021-05-01', 1, 'PAN005', 1, 1, '26062024', '2025-06-01', 0),
(6, 'IEC0000006', 'Entity 6', 'Address 6A', 'Address 6B', 'City6', 'State6', 123461, '6666666666', 'user6@yopmail.com', '2021-06-01', 1, 'PAN006', 1, 1, '26062024', '2025-06-01', 0),
(7, 'IEC0000007', 'Entity 7', 'Address 7A', 'Address 7B', 'City7', 'State7', 123462, '7777777777', 'iec_user7@yopmail.com', '2021-07-01', 1, 'PAN007', 1, 1, '26062024', '2025-06-01', 0),
(8, 'IEC0000008', 'Entity 8', 'Address 8A', 'Address 8B', 'City8', 'State8', 123463, '8888888888', 'iec_user8@yopmail.com', '2021-08-01', 1, 'PAN008', 1, 1, '24062022', '2025-06-01', 0),
(9, 'IEC0000009', 'Entity 9', 'Address 9A', 'Address 9B', 'City9', 'State9', 123464, '9999999999', 'user9@yopmail.com', '2021-09-01', 1, 'PAN009', 1, 1, '24062028', '2025-06-01', 0),
(10, 'IEC0000010', 'Entity 10', 'Address 10A', 'Address 10B', 'City10', 'State10', 123465, '1010101010', 'iec_user10@yopmail.com', '2021-10-01', 1, 'PAN010', 1, 1, '24062022', '2025-06-01', 0),
(11, 'IEC0000011', 'Entity 11', 'Address 11A', 'Address 11B', 'City11', 'State11', 123466, '1111111112', 'iec_user11@yopmail.com', '2021-11-01', 1, 'PAN011', 1, 1, '24062022', '2025-06-01', 0),
(12, 'IEC0000012', 'Entity 12', 'Address 12A', 'Address 12B', 'City12', 'State12', 123467, '1212121212', 'user12@yopmail.com', '2021-12-01', 1, 'PAN012', 1, 1, '24062022', '2025-06-01', 0),
(13, 'IEC0000013', 'Entity 13', 'Address 13A', 'Address 13B', 'City13', 'State13', 123468, '1313131313', 'user13@yopmail.com', '2022-01-01', 1, 'PAN013', 1, 1, '24062022', '2025-06-01', 0),
(14, 'IEC0000014', 'Entity 14', 'Address 14A', 'Address 14B', 'City14', 'State14', 123469, '1414141414', 'user14@yopmail.com', '2022-02-01', 1, 'PAN014', 1, 1, '24062029', '2025-06-01', 0),
(15, 'IEC0000015', 'Entity 15', 'Address 15A', 'Address 15B', 'City15', 'State15', 123470, '1515151515', 'iec_user15@yopmail.com', '2022-03-01', 1, 'PAN015', 1, 1, '24062020', '2025-06-01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `directors`
--

CREATE TABLE `directors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `profile_id` int(11) DEFAULT NULL,
  `iec_code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doc_file_uploads`
--

CREATE TABLE `doc_file_uploads` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `exp_id` int(11) DEFAULT NULL,
  `application_number` varchar(255) DEFAULT NULL,
  `doc_id` int(11) DEFAULT NULL,
  `doc_upload_ref` varchar(255) DEFAULT NULL,
  `doc_type` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL COMMENT 'imp_exp_user table id',
  `query_id` varchar(255) DEFAULT NULL,
  `doc_upload_date` timestamp NULL DEFAULT NULL,
  `query_raised_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doc_file_uploads`
--

INSERT INTO `doc_file_uploads` (`id`, `exp_id`, `application_number`, `doc_id`, `doc_upload_ref`, `doc_type`, `user_id`, `query_id`, `doc_upload_date`, `query_raised_id`, `created_at`, `updated_at`) VALUES
(3, 2, 'EntiE202500002', 60, '00002_60_74_588671763352691.pdf', 'certified_copy_proforma', 74, NULL, '2025-11-17 04:11:31', NULL, '2025-11-17 04:11:31', '2025-11-17 04:11:31'),
(4, 2, 'EntiE202500002', 70, '00002_70_74_479821763352692.pdf', 'declaration_letter', 74, NULL, '2025-11-17 04:11:32', NULL, '2025-11-17 04:11:32', '2025-11-17 04:11:32'),
(114, 5, 'Enti/E/2025/00005', 100, '00005_100_3_487311764064127.pdf', 'committee_query_attach', 3, 'Exp001', '2025-11-25 09:48:47', 1, '2025-11-25 09:48:47', '2025-11-25 09:48:47'),
(115, 5, 'EntiE202500005', 130, '00005_130_2_828801764064144.pdf', 'icmr_replyto_comm_attach', 2, 'Exp001', '2025-11-25 09:49:04', 2, '2025-11-25 09:49:04', '2025-11-25 09:49:04'),
(116, 5, 'Enti/E/2025/00005', 100, '00005_100_4_553061764064183.pdf', 'committee_query_attach', 4, 'Exp002', '2025-11-25 09:49:43', 3, '2025-11-25 09:49:43', '2025-11-25 09:49:43'),
(117, 5, 'EntiE202500005', 130, '00005_130_2_336411764064212.pdf', 'icmr_replyto_comm_attach', 2, 'Exp002', '2025-11-25 09:50:12', 4, '2025-11-25 09:50:12', '2025-11-25 09:50:12'),
(118, 5, 'Enti/E/2025/00005', 100, '00005_100_4_617471764064255.pdf', 'committee_query_attach', 4, 'Exp003', '2025-11-25 09:50:55', 5, '2025-11-25 09:50:55', '2025-11-25 09:50:55'),
(119, 5, 'EntiE202500005', 130, '00005_130_2_628861764065151.pdf', 'icmr_replyto_comm_attach', 2, 'Exp003', '2025-11-25 10:05:51', 6, '2025-11-25 10:05:51', '2025-11-25 10:05:51'),
(120, 5, 'Enti/E/2025/00005', 100, '00005_100_4_916601764065182.pdf', 'committee_query_attach', 4, 'Exp004', '2025-11-25 10:06:22', 7, '2025-11-25 10:06:22', '2025-11-25 10:06:22'),
(121, 9, 'Enti/E/2025/00009', 60, '00009_60_74_356981764069213.pdf', 'certified_copy_proforma', 74, NULL, '2025-11-25 11:13:33', NULL, '2025-11-25 11:13:33', '2025-11-25 11:13:33'),
(122, 9, 'Enti/E/2025/00009', 70, '00009_70_74_630991764069213.pdf', 'declaration_letter', 74, NULL, '2025-11-25 11:13:33', NULL, '2025-11-25 11:13:33', '2025-11-25 11:13:33'),
(123, 4, 'EntiE202500004', 80, '00004_80_2_790221764072758.pdf', 'icmr_query_attach', 2, 'Exp005', '2025-11-25 12:12:38', 8, '2025-11-25 12:12:38', '2025-11-25 12:12:38'),
(124, 4, 'Enti/E/2025/00004', 100, '00004_100_3_695111764136557.pdf', 'committee_query_attach', 3, 'Exp006', '2025-11-26 05:55:57', 9, '2025-11-26 05:55:57', '2025-11-26 05:55:57'),
(125, 4, 'EntiE202500004', 130, '00004_130_2_902711764136682.pdf', 'icmr_replyto_comm_attach', 2, 'Exp006', '2025-11-26 05:58:02', 10, '2025-11-26 05:58:02', '2025-11-26 05:58:02'),
(126, 4, 'Enti/E/2025/00004', 100, '00004_100_3_115091764136727.pdf', 'committee_query_attach', 3, 'Exp007', '2025-11-26 05:58:47', 11, '2025-11-26 05:58:47', '2025-11-26 05:58:47'),
(127, 10, 'Enti/E/2025/00010', 60, '00010_60_74_886991764137231.pdf', 'certified_copy_proforma', 74, NULL, '2025-11-26 06:07:11', NULL, '2025-11-26 06:07:11', '2025-11-26 06:07:11'),
(128, 10, 'Enti/E/2025/00010', 70, '00010_70_74_298391764137231.pdf', 'declaration_letter', 74, NULL, '2025-11-26 06:07:11', NULL, '2025-11-26 06:07:11', '2025-11-26 06:07:11'),
(129, 9, 'Enti/E/2025/00009', 100, '00009_100_3_785671764147387.pdf', 'committee_query_attach', 3, 'Exp008', '2025-11-26 08:56:27', 12, '2025-11-26 08:56:27', '2025-11-26 08:56:27'),
(130, 9, 'EntiE202500009', 130, '00009_130_2_407461764147586.pdf', 'icmr_replyto_comm_attach', 2, 'Exp008', '2025-11-26 08:59:46', 13, '2025-11-26 08:59:46', '2025-11-26 08:59:46'),
(131, 11, 'Enti/E/2025/00011', 1, '00011_1_74_920611764150787.pdf', 'upload_comp_institute_denied_export', 74, NULL, '2025-11-26 09:53:07', NULL, '2025-11-26 09:53:07', '2025-11-26 09:53:07'),
(132, 11, 'Enti/E/2025/00011', 60, '00011_60_74_933971764150787.pdf', 'certified_copy_proforma', 74, NULL, '2025-11-26 09:53:07', NULL, '2025-11-26 09:53:07', '2025-11-26 09:53:07'),
(133, 11, 'Enti/E/2025/00011', 70, '00011_70_74_507561764150787.pdf', 'declaration_letter', 74, NULL, '2025-11-26 09:53:07', NULL, '2025-11-26 09:53:07', '2025-11-26 09:53:07'),
(134, 9, 'Enti/E/2025/00009', 100, '00009_100_4_991291764154213.pdf', 'committee_query_attach', 4, 'Exp009', '2025-11-26 10:50:13', 14, '2025-11-26 10:50:13', '2025-11-26 10:50:13'),
(135, 9, 'EntiE202500009', 130, '00009_130_2_553741764154258.pdf', 'icmr_replyto_comm_attach', 2, 'Exp009', '2025-11-26 10:50:58', 15, '2025-11-26 10:50:58', '2025-11-26 10:50:58'),
(136, 9, 'EntiE202500009', 130, '00009_130_2_171961764154324.pdf', 'icmr_replyto_comm_attach', 2, 'Exp0010', '2025-11-26 10:52:04', 17, '2025-11-26 10:52:04', '2025-11-26 10:52:04'),
(137, 9, 'Enti/E/2025/00009', 100, '00009_100_4_900591764154352.pdf', 'committee_query_attach', 4, 'Exp0011', '2025-11-26 10:52:32', 18, '2025-11-26 10:52:32', '2025-11-26 10:52:32'),
(138, 12, 'Enti/E/2025/00012', 60, '00012_60_74_259301764155437.pdf', 'certified_copy_proforma', 74, NULL, '2025-11-26 11:10:37', NULL, '2025-11-26 11:10:37', '2025-11-26 11:10:37'),
(139, 12, 'Enti/E/2025/00012', 70, '00012_70_74_531791764155437.pdf', 'declaration_letter', 74, NULL, '2025-11-26 11:10:37', NULL, '2025-11-26 11:10:37', '2025-11-26 11:10:37'),
(140, 11, 'EntiE202500011', 80, '00011_80_2_927661764242035.pdf', 'icmr_query_attach', 2, 'Exp0012', '2025-11-27 11:13:55', 19, '2025-11-27 11:13:55', '2025-11-27 11:13:55'),
(141, 7, 'Enti/E/2025/00007', 100, '00007_100_3_381931764242066.pdf', 'committee_query_attach', 3, 'Exp0013', '2025-11-27 11:14:26', 20, '2025-11-27 11:14:26', '2025-11-27 11:14:26'),
(142, 7, 'Enti/E/2025/00007', 100, '00007_100_4_325921764303115.pdf', 'committee_query_attach', 4, 'Exp0014', '2025-11-28 04:11:55', 21, '2025-11-28 04:11:55', '2025-11-28 04:11:55'),
(143, 7, 'EntiE202500007', 110, '00007_110_2_945571764310457.pdf', 'icmr_forward_query_attach', 2, 'Exp0014', '2025-11-28 06:14:17', 22, '2025-11-28 06:14:17', '2025-11-28 06:14:17'),
(144, 7, 'EntiE202500007', 120, '00007_120_80_804631764313774.pdf', 'iec_forward_answer_attach', 80, 'Exp0014', '2025-11-28 07:09:34', 23, '2025-11-28 07:09:34', '2025-11-28 07:09:34'),
(145, 7, 'EntiE202500007', 130, '00007_130_2_458051764314489.pdf', 'icmr_replyto_comm_attach', 2, 'Exp0014', '2025-11-28 07:21:29', 24, '2025-11-28 07:21:29', '2025-11-28 07:21:29'),
(146, 7, 'EntiE202500007', 130, '00007_130_2_595031764317353.pdf', 'icmr_replyto_comm_attach', 2, 'Exp0013', '2025-11-28 08:09:13', 25, '2025-11-28 08:09:13', '2025-11-28 08:09:13'),
(147, 4, 'DRAFT/E/2025/00004', 1, '00004_1_74_510631764581979.pdf', 'upload_comp_institute_denied_export', 74, NULL, '2025-12-01 09:39:39', NULL, '2025-12-01 09:39:39', '2025-12-01 09:39:39'),
(148, 4, 'DRAFT/E/2025/00004', 40, '00004_40_74_800781764581979.pdf', 'biomaterial_micro_organisms_approval_file', 74, NULL, '2025-12-01 09:39:39', NULL, '2025-12-01 09:39:39', '2025-12-01 09:39:39'),
(149, 4, 'DRAFT/E/2025/00004', 50, '00004_50_74_815091764581979.pdf', 'ibsc_rcgm_approval_applicable_file', 74, NULL, '2025-12-01 09:39:39', NULL, '2025-12-01 09:39:39', '2025-12-01 09:39:39'),
(150, 4, 'DRAFT/E/2025/00004', 60, '00004_60_74_498291764581979.pdf', 'certified_copy_proforma', 74, NULL, '2025-12-01 09:39:39', NULL, '2025-12-01 09:39:39', '2025-12-01 09:39:39'),
(151, 4, 'DRAFT/E/2025/00004', 70, '00004_70_74_511921764581979.pdf', 'declaration_letter', 74, NULL, '2025-12-01 09:39:39', NULL, '2025-12-01 09:39:39', '2025-12-01 09:39:39'),
(152, 13, 'Enti/E/2025/00013', 1, '00013_1_74_879811764582036.pdf', 'upload_comp_institute_denied_export', 74, NULL, '2025-12-01 09:40:36', NULL, '2025-12-01 09:40:36', '2025-12-01 09:40:36'),
(153, 13, 'Enti/E/2025/00013', 40, '00013_40_74_124661764582036.pdf', 'biomaterial_micro_organisms_approval_file', 74, NULL, '2025-12-01 09:40:36', NULL, '2025-12-01 09:40:36', '2025-12-01 09:40:36'),
(154, 13, 'Enti/E/2025/00013', 50, '00013_50_74_438011764582036.pdf', 'ibsc_rcgm_approval_applicable_file', 74, NULL, '2025-12-01 09:40:36', NULL, '2025-12-01 09:40:36', '2025-12-01 09:40:36'),
(155, 13, 'Enti/E/2025/00013', 60, '00013_60_74_355391764582036.pdf', 'certified_copy_proforma', 74, NULL, '2025-12-01 09:40:36', NULL, '2025-12-01 09:40:36', '2025-12-01 09:40:36'),
(156, 13, 'Enti/E/2025/00013', 70, '00013_70_74_323711764582036.pdf', 'declaration_letter', 74, NULL, '2025-12-01 09:40:36', NULL, '2025-12-01 09:40:36', '2025-12-01 09:40:36'),
(157, 13, 'EntiE202500013', 80, '00013_80_2_561251764582288.pdf', 'icmr_query_attach', 2, 'Exp0012', '2025-12-01 09:44:48', 26, '2025-12-01 09:44:48', '2025-12-01 09:44:48'),
(158, 13, 'EntiE202500013', 90, '00013_90_74_472541764582523.pdf', 'iec_answer_attach', 74, 'Exp0012', '2025-12-01 09:48:43', 27, '2025-12-01 09:48:43', '2025-12-01 09:48:43'),
(159, 13, 'Enti/E/2025/00013', 100, '00013_100_3_142121764583031.pdf', 'committee_query_attach', 3, 'Exp0013', '2025-12-01 09:57:11', 28, '2025-12-01 09:57:11', '2025-12-01 09:57:11'),
(160, 13, 'Enti/E/2025/00013', 100, '00013_100_4_244471764588035.pdf', 'committee_query_attach', 4, 'Exp0014', '2025-12-01 11:20:35', 29, '2025-12-01 11:20:35', '2025-12-01 11:20:35'),
(161, 13, 'EntiE202500013', 130, '00013_130_2_423931764588744.pdf', 'icmr_replyto_comm_attach', 2, 'Exp0013', '2025-12-01 11:32:24', 30, '2025-12-01 11:32:24', '2025-12-01 11:32:24'),
(162, 13, 'EntiE202500013', 110, '00013_110_2_719251764588805.pdf', 'icmr_forward_query_attach', 2, 'Exp0013', '2025-12-01 11:33:25', 31, '2025-12-01 11:33:25', '2025-12-01 11:33:25'),
(163, 13, 'EntiE202500013', 120, '00013_120_74_645781764589352.pdf', 'iec_forward_answer_attach', 74, 'Exp0013', '2025-12-01 11:42:32', 32, '2025-12-01 11:42:32', '2025-12-01 11:42:32'),
(164, 13, 'EntiE202500013', 130, '00013_130_2_746341764590093.pdf', 'icmr_replyto_comm_attach', 2, 'Exp0013', '2025-12-01 11:54:53', 33, '2025-12-01 11:54:53', '2025-12-01 11:54:53');

-- --------------------------------------------------------

--
-- Table structure for table `doc_masters`
--

CREATE TABLE `doc_masters` (
  `id` bigint(20) NOT NULL,
  `doc_id` int(11) NOT NULL,
  `doc_type` varchar(255) DEFAULT NULL,
  `doc_description` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `deactivate_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doc_masters`
--

INSERT INTO `doc_masters` (`id`, `doc_id`, `doc_type`, `doc_description`, `status`, `deactivate_date`, `created_at`, `updated_at`) VALUES
(1, 1, 'upload_comp_institute_denied_export', 'Whether the applicant/ company/ institution has been denied export authorization in last 3 years', 1, NULL, '2025-04-21 05:39:06', '2025-04-21 05:39:06'),
(2, 10, 'sending_bg_comp_inst', 'Background of company/institute for sending party', 1, NULL, '2025-04-21 05:39:06', '2025-04-21 05:39:06'),
(3, 20, 'receiving_bg_comp_inst', 'Background of Company/Institute for receiving party', 1, NULL, '2025-04-21 05:39:06', '2025-04-21 05:39:06'),
(4, 30, 'details_planned_analysis', 'Give details of the planned analysis for purpose of export of samples', 1, NULL, '2025-04-21 05:39:06', '2025-04-21 05:39:06'),
(5, 40, 'biomaterial_micro_organisms_approval_file', 'If the Biomaterial contains micro-organisms listed in appendix 3 category 2 of list of SCOMET items, has approval been obtained from DGFT', 1, NULL, '2025-04-21 05:39:06', '2025-04-21 05:39:06'),
(6, 50, 'ibsc_rcgm_approval_applicable_file', 'For the export of hazardous micro organisms/genetically engineered organisms or cells has IBSC/RCGM approval been obtained', 1, NULL, '2025-04-21 05:39:06', '2025-04-21 05:39:06'),
(7, 60, 'certified_copy_proforma', 'Upload Certified copy of commercial Contract/Proforma Invoice', 1, NULL, '2025-04-21 05:39:06', '2025-04-21 05:39:06'),
(8, 70, 'declaration_letter', 'Upload duly signed declaration of letter', 1, NULL, '2025-04-21 05:39:06', '2025-04-21 05:39:06'),
(9, 80, 'icmr_query_attach', 'upload the attachment of the query through ICMR', 1, NULL, '2025-04-21 05:39:06', '2025-04-21 05:39:06'),
(10, 90, 'iec_answer_attach', 'upload the attachment of the query through IEC holder', 1, NULL, '2025-04-21 05:39:06', '2025-04-21 05:39:06'),
(11, 100, 'committee_query_attach', 'upload the attachment of the query through Committee Member', 1, NULL, '2025-04-21 05:39:06', '2025-05-06 08:53:16'),
(12, 110, 'icmr_forward_query_attach', 'upload the attachment of the query forward through ICMR', 1, NULL, '2025-05-13 05:05:04', '2025-05-13 09:19:19'),
(13, 120, 'iec_forward_answer_attach', 'upload the attachment of the forward query through IEC holder', 1, NULL, '2025-05-13 06:02:49', '2025-05-13 09:19:24'),
(15, 130, 'icmr_replyto_comm_attach', 'upload the attachment of the query reply to committee through ICMR', 1, '2025-05-22 04:25:57', '2025-05-23 04:27:45', '2025-05-23 04:27:45'),
(16, 140, 'upload_samples_being_exported_file', 'Upload a representative copy of the informed consent form.the purpose for which the samples are being exported.', 1, NULL, '2025-09-29 04:51:07', '2025-09-29 04:51:07'),
(17, 150, 'upload_global_clinical_trial_file', 'Upload communication from CDSCO mentioning the requirement of THBM/ICMR approval.', 1, NULL, '2025-09-29 04:53:20', '2025-09-29 04:53:20'),
(18, 160, 'upload_any_other_document_file', 'Upload Any other document.', 1, NULL, '2025-09-29 04:54:35', '2025-09-29 04:54:35'),
(19, 404, 'document_not_found_404', 'document not found', 1, NULL, '2025-11-14 09:15:10', '2025-11-14 09:15:10');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `home_sliders`
--

CREATE TABLE `home_sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_slug` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'true = 1, false = 0',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_sliders`
--

INSERT INTO `home_sliders` (`id`, `banner_title`, `banner_slug`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Azadi-ka-amrit', 'azadi-ka-amrit', '1764934243.jpg', 1, '2025-12-05 11:30:43', '2025-12-08 07:13:09'),
(2, 'Sabka-saath', 'sabka-saath', '1764934276.jpg', 0, '2025-12-05 11:31:16', '2025-12-08 07:20:47'),
(3, 'Man ki Baat', 'man-ki-baat', '1764934297.jpg', 0, '2025-12-05 11:31:37', '2025-12-08 07:17:12');

-- --------------------------------------------------------

--
-- Table structure for table `hs_code_items`
--

CREATE TABLE `hs_code_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hs_code` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `import_policy` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `imp_exp_users`
--

CREATE TABLE `imp_exp_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED DEFAULT NULL,
  `iec_code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `address2` longtext DEFAULT NULL,
  `department` longtext DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `state` text DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `ip_address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `imp_exp_users`
--

INSERT INTO `imp_exp_users` (`id`, `role_id`, `iec_code`, `name`, `email`, `address`, `address2`, `department`, `designation`, `state`, `city`, `pincode`, `mobile_number`, `status`, `ip_address`, `created_at`, `updated_at`) VALUES
(2, 4, 'IEC0000003', 'Entity 3', 'iec_user30@yopmail.com', 'Address 3A', 'Address 3B', 'Test Dept3', 'Test Desgn3', 'State3', 'City3', '123458', '3333333333', 1, '127.0.0.1', '2025-12-11 08:40:36', '2025-12-11 08:40:36');

-- --------------------------------------------------------

--
-- Table structure for table `imp_exp_user_logins`
--

CREATE TABLE `imp_exp_user_logins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `impexp_user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `role_id` bigint(20) UNSIGNED DEFAULT NULL,
  `iec_code` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `auth_token` varchar(255) DEFAULT NULL,
  `validity_status` varchar(155) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `ip_address` varchar(255) DEFAULT NULL,
  `invalid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `imp_exp_user_logins`
--

INSERT INTO `imp_exp_user_logins` (`id`, `impexp_user_id`, `role_id`, `iec_code`, `email`, `password`, `remember_token`, `auth_token`, `validity_status`, `status`, `ip_address`, `invalid_at`, `created_at`, `updated_at`) VALUES
(1, 2, 4, 'IEC0000003', 'iec_user30@yopmail.com', 'e3e1511325e2a33bc3bde999c521927213111c5b4f2c0d61aa7de54ab9ae3a95', 'TuV12ih4ntBekHJaNPKfMqCtxYiBlYKkrBPM4j1lWCqxdRdJJT2kEagur1P5F17vr', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2dlbmVyYXRlLXBhc3N3b3JkLzMiLCJpYXQiOjE3NjQ4NDQ1NzgsImV4cCI6MTc2NDg0ODE3OCwibmJmIjoxNzY0ODQ0NTc4LCJqdGkiOiJkUzJNalk4bXBtMzlXM0FZIiwic3ViIjoiMyIsInBydiI6ImU0MzY0MDJkZjM1NzNiOD', 'true', 1, '127.0.0.1', NULL, '2025-12-11 08:40:36', '2025-12-11 12:09:35');

-- --------------------------------------------------------

--
-- Table structure for table `imp_exp_user_profiles`
--

CREATE TABLE `imp_exp_user_profiles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `impexp_user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `iec_code` varchar(255) DEFAULT NULL,
  `entity_name` text DEFAULT NULL,
  `address_line1` text DEFAULT NULL,
  `address_line2` text DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `contact_no` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `iec_issue_date` varchar(255) DEFAULT NULL,
  `exporter_type` varchar(255) DEFAULT NULL,
  `pan_number` varchar(255) DEFAULT NULL,
  `iec_status` tinyint(1) DEFAULT NULL,
  `star_status` tinyint(1) DEFAULT NULL,
  `iec_modification_date` varchar(255) DEFAULT NULL,
  `data_as_on` varchar(255) DEFAULT NULL,
  `nature_of_concern` varchar(255) DEFAULT NULL,
  `validity_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(15, '0001_01_01_000000_create_users_table', 1),
(16, '0001_01_01_000001_create_cache_table', 1),
(17, '0001_01_01_000002_create_jobs_table', 1),
(18, '2025_07_08_091539_create_roles_table', 1),
(19, '2025_07_14_105946_create_imp_exp_users_table', 1),
(20, '2025_07_14_110017_create_user_logins_table', 1),
(21, '2025_07_14_110029_create_user_login_histories_table', 1),
(22, '2025_12_05_110316_create_home_sliders_table', 2),
(23, '2025_12_05_110315_create_home_sliders_table', 3),
(24, '2025_12_08_142759_create_imp_exp_user_logins_table', 4),
(25, '2025_12_08_142934_create_imp_exp_user_profiles_table', 5),
(26, '2025_12_08_145127_create_dgft_branches_table', 6),
(27, '2025_12_08_145139_create_dgft_directors_table', 7),
(28, '2025_12_10_140600_create_directors_table', 8),
(29, '2025_12_10_140612_create_branches_table', 9),
(30, '2025_07_14_105945_create_imp_exp_users_table', 10),
(31, '2025_12_08_142758_create_imp_exp_user_logins_table', 11);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `role_slug` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `role_slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin', 1, '2025-07-16 08:32:54', '2025-12-08 06:53:30'),
(2, 'Icmr', 'icmr', 1, '2025-07-16 08:33:02', '2025-07-16 08:33:02'),
(3, 'Committee', 'committee', 1, '2025-07-16 08:33:10', '2025-07-16 08:33:10'),
(4, 'Imp-Exp', 'imp-exp', 1, '2025-07-16 08:33:21', '2025-07-16 08:33:21'),
(5, 'tester', 'tester', 1, '2025-09-11 10:19:26', '2025-09-11 10:19:26'),
(6, 'Test1', 'test1', 1, '2025-12-08 06:44:21', '2025-12-08 06:44:21');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0JPJrTLyzcc6JYPIJo2Pkk3FTV5fkIWIuMNcWAs2', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidlBKdmdjT2tOOHREaFBvdVVJc3cxV0JQVmtEeVlpSER6ZW1NbmFJQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC8ud2VsbC1rbm93bi9hcHBzcGVjaWZpYy9jb20uY2hyb21lLmRldnRvb2xzLmpzb24iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1765535952),
('Q3AkJJmu4xH2ipboOjPSM3BPiWzvizO0PdKaJVDp', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTDBvTFpYR2VWZGY1cHNNUjZscnVlNlJJSW13OHQ3WmFJVUl4bHNZSSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC8ud2VsbC1rbm93bi9hcHBzcGVjaWZpYy9jb20uY2hyb21lLmRldnRvb2xzLmpzb24iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1765540790),
('qSGAF6DDHshIoqgrH7sZliHkgzHhRk8LFRyLJzsG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWFRkQ0Q3N090SjlucWNLcEJ2T2d0TTRDanNpTURmY3hma1R1TFJiWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDk6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9iZW5lZmljaWFyeS9sb2dpbj9yb2xlPWljbXIiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1765534113);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `ip_address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `name`, `email`, `address`, `designation`, `department`, `mobile_number`, `email_verified_at`, `status`, `ip_address`, `created_at`, `updated_at`) VALUES
(1, 1, 'Alok Admin', 'test_admin@yopmail.com', 'New Delhi', 'Developer', 'DHR', '888821541', NULL, 1, NULL, '2025-07-16 08:34:29', '2025-12-08 06:31:03'),
(2, 2, 'ICMR officail', 'test_icmr@yopmail.com', 'New Delhi', 'Scientist_D', 'ICMR', '888512245', NULL, 1, NULL, '2025-12-02 11:36:36', '2025-12-08 06:31:06'),
(3, 3, 'Test Committee', 'test_comm@yopmail.com', 'New Delhi', 'Scientist C', 'DHR', '9852142150', NULL, 1, NULL, '2025-12-04 08:21:35', '2025-12-08 06:31:08');

-- --------------------------------------------------------

--
-- Table structure for table `user_logins`
--

CREATE TABLE `user_logins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `role_id` bigint(20) UNSIGNED DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `auth_token` text DEFAULT NULL,
  `validity_status` varchar(155) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `ip_address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_logins`
--

INSERT INTO `user_logins` (`id`, `user_id`, `role_id`, `email`, `password`, `remember_token`, `auth_token`, `validity_status`, `status`, `ip_address`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'test_admin@yopmail.com', 'e3e1511325e2a33bc3bde999c521927213111c5b4f2c0d61aa7de54ab9ae3a95', 'TuV12ih4ntBekHJaNPKfMqCtxYiBlYKkrBPM4j1lWCqxdRdJJT2kEagur1P5F17va', NULL, 'true', 1, '127.0.0.1', '2025-07-16 08:34:29', '2025-07-16 08:34:29'),
(2, 2, 2, 'test_icmr@yopmail.com', 'e3e1511325e2a33bc3bde999c521927213111c5b4f2c0d61aa7de54ab9ae3a95', 'XuV12ih4ntBekHJaNPKfMqCtxYiBlYKkrBPM4j1lWCqxdRdJJT2kEagur1P5F17va', NULL, 'true', 1, '127.0.0.1', '2025-12-02 11:36:36', '2025-12-02 11:36:36'),
(3, 3, 3, 'test_comm@yopmail.com', 'e3e1511325e2a33bc3bde999c521927213111c5b4f2c0d61aa7de54ab9ae3a95', '86d305b6b0e137f3fa085b8c62ada4397b1337a36558fa3195a72ebfbde952b2', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2dlbmVyYXRlLXBhc3N3b3JkLzMiLCJpYXQiOjE3NjQ4NDQ1NzgsImV4cCI6MTc2NDg0ODE3OCwibmJmIjoxNzY0ODQ0NTc4LCJqdGkiOiJkUzJNalk4bXBtMzlXM0FZIiwic3ViIjoiMyIsInBydiI6ImU0MzY0MDJkZjM1NzNiODA5NGYwOGUyYjlhZmFjMDMzMDRjMWJmYjEifQ.UE24qWhPsqbw_Nmirop2-tTZmhCah0PSrh3xvWsgaDk', 'true', 1, '127.0.0.1', '2025-12-04 08:21:35', '2025-12-04 10:36:18');

-- --------------------------------------------------------

--
-- Table structure for table `user_login_histories`
--

CREATE TABLE `user_login_histories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_login_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `impexp_user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `browser` varchar(255) DEFAULT NULL,
  `platform` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `login_datetime` timestamp NULL DEFAULT NULL,
  `logout_datetime` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `dgft_branches`
--
ALTER TABLE `dgft_branches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dgft_directors`
--
ALTER TABLE `dgft_directors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dgft_imp_exp_users`
--
ALTER TABLE `dgft_imp_exp_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `directors`
--
ALTER TABLE `directors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `home_sliders`
--
ALTER TABLE `home_sliders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `home_sliders_banner_slug_unique` (`banner_slug`);

--
-- Indexes for table `imp_exp_users`
--
ALTER TABLE `imp_exp_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `imp_exp_users_iec_code_unique` (`iec_code`),
  ADD UNIQUE KEY `imp_exp_users_email_unique` (`email`),
  ADD KEY `imp_exp_users_role_id_foreign` (`role_id`);

--
-- Indexes for table `imp_exp_user_logins`
--
ALTER TABLE `imp_exp_user_logins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `imp_exp_user_logins_iec_code_unique` (`iec_code`),
  ADD UNIQUE KEY `imp_exp_user_logins_email_unique` (`email`),
  ADD KEY `imp_exp_user_logins_impexp_user_id_foreign` (`impexp_user_id`),
  ADD KEY `imp_exp_user_logins_role_id_foreign` (`role_id`);

--
-- Indexes for table `imp_exp_user_profiles`
--
ALTER TABLE `imp_exp_user_profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_role_name_unique` (`role_name`),
  ADD UNIQUE KEY `roles_role_slug_unique` (`role_slug`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- Indexes for table `user_logins`
--
ALTER TABLE `user_logins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_logins_email_unique` (`email`),
  ADD KEY `user_logins_user_id_foreign` (`user_id`),
  ADD KEY `user_logins_role_id_foreign` (`role_id`);

--
-- Indexes for table `user_login_histories`
--
ALTER TABLE `user_login_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_login_histories_user_login_id_foreign` (`user_login_id`),
  ADD KEY `user_login_histories_user_id_foreign` (`user_id`),
  ADD KEY `user_login_histories_impexp_user_id_foreign` (`impexp_user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dgft_branches`
--
ALTER TABLE `dgft_branches`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `dgft_directors`
--
ALTER TABLE `dgft_directors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `dgft_imp_exp_users`
--
ALTER TABLE `dgft_imp_exp_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `directors`
--
ALTER TABLE `directors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `home_sliders`
--
ALTER TABLE `home_sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `imp_exp_users`
--
ALTER TABLE `imp_exp_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `imp_exp_user_logins`
--
ALTER TABLE `imp_exp_user_logins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `imp_exp_user_profiles`
--
ALTER TABLE `imp_exp_user_profiles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_logins`
--
ALTER TABLE `user_logins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_login_histories`
--
ALTER TABLE `user_login_histories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `imp_exp_users`
--
ALTER TABLE `imp_exp_users`
  ADD CONSTRAINT `imp_exp_users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `imp_exp_user_logins`
--
ALTER TABLE `imp_exp_user_logins`
  ADD CONSTRAINT `imp_exp_user_logins_impexp_user_id_foreign` FOREIGN KEY (`impexp_user_id`) REFERENCES `imp_exp_users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `imp_exp_user_logins_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
