-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2022 at 04:19 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tickitz_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `book_id` bigint(20) NOT NULL,
  `movies_id` bigint(20) NOT NULL,
  `cinema_id` int(11) NOT NULL,
  `book_date` date NOT NULL,
  `time` time NOT NULL,
  `ticket_of_number` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_id`, `movies_id`, `cinema_id`, `book_date`, `time`, `ticket_of_number`, `price`, `created_at`, `updated_at`) VALUES
(48, 22, 10, '2022-06-27', '14:00:00', 4, '10', '2022-06-27 12:52:41', '2022-06-27 12:52:41'),
(49, 24, 10, '2022-06-27', '14:00:00', 4, '10', '2022-06-27 12:52:49', '2022-06-27 12:52:49');

-- --------------------------------------------------------

--
-- Table structure for table `cinema`
--

CREATE TABLE `cinema` (
  `cinema_id` int(11) NOT NULL,
  `cinema_name` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cinema`
--

INSERT INTO `cinema` (`cinema_id`, `cinema_name`, `created_at`, `updated_at`) VALUES
(13, 'CineOne21, Hiflix, Ebv', '2022-06-27 12:40:26', '2022-06-27 13:03:06');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `genre_id` int(11) NOT NULL,
  `gen_name` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`genre_id`, `gen_name`, `created_at`, `updated_at`) VALUES
(1, '\n  {\n   \"Genre\":[ \"Adventure\",\n   \"Action\",\n   \"Horror\", \"Comedy\", \"Romantic\", \"Sci-Fi\", \"Drama\",\"Adult\"]\n  }\n\n', '2022-06-25 01:25:54', '2022-06-27 11:05:51');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` bigint(20) NOT NULL,
  `city` varchar(1000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `city`, `created_at`, `updated_at`) VALUES
(1, 'Purwokerto, Mataram, Jakarta, Surabaya, Malang, Semarang, Yogyakarta, Makassar, Medan, Jayapura,', '2022-06-25 04:04:49', '2022-06-25 04:04:49'),
(2, 'Purwokerto, Mataram, Jakarta, Surabaya, Malang, Semarang, Yogyakarta, Makassar, Medan, Jayapura,', '2022-06-27 01:54:39', '2022-06-27 01:54:39');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movies_id` bigint(20) NOT NULL,
  `title` varchar(500) NOT NULL,
  `cover` varchar(200) NOT NULL,
  `release_date` date NOT NULL,
  `director` varchar(150) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `casts` varchar(400) NOT NULL,
  `genre_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movies_id`, `title`, `cover`, `release_date`, `director`, `description`, `casts`, `genre_id`, `created_at`, `updated_at`) VALUES
(21, 'Doctor Strange in the Multiverse of Madness', 'https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg/220px-Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg', '2022-05-05', 'Justin Lin', 'Dr Stephen Strange casts a forbidden spell that opens a portal to the multiverse. However, a threat emerges that may be too big for his team to handle.', 'Benedict Cumberbatch', 1, '2022-06-25 01:45:54', '2022-06-25 01:45:54'),
(22, 'KKN DI DESA PENARI', 'https://upload.wikimedia.org/wikipedia/id/thumb/f/f9/Poster_KKN_di_Desa_Penari_%28versi_uncut%29.jpeg/220px-Poster_KKN_di_Desa_Penari_%28versi_uncut%29.jpeg', '2022-05-05', 'Awi Suryadi', 'KKN DI DESA PENARI QWERTASDFGH', 'Tissa Biani, Adinda Thomas, Achmad Megantara', 1, '2022-06-25 02:21:27', '2022-06-25 02:21:27'),
(24, 'Yowis Ben Finale', 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/Poster_film_Yowis_Ben_3.jpg/220px-Poster_film_Yowis_Ben_3.jpg', '2021-09-25', 'Bayu Skak, Fajar Nugros', 'Yowis Bena Ae Yo', 'Anya Geraldine, Bayu Skak, Joshua Suherman', 1, '2022-06-26 01:48:01', '2022-06-27 14:00:29'),
(26, 'Pirates of the Caribbean: Salazars Revenge', 'https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg', '2017-05-24', 'Joachim Ronning, Espen Sandberg', 'To break the curse of Flying Dutchman, Captain Jack Sparrow and Henry Turner embark on a mission to find the Trident of Poseidon. They also try to stop Captain Salazar who intends to rule the seas.', 'Johnny Depp, Orlando Bloom, Geoffrey Rush', 1, '2022-06-27 00:40:37', '2022-06-27 00:40:37');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` bigint(20) NOT NULL,
  `movies_id` bigint(20) NOT NULL,
  `cinema_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `time_id` int(11) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `movies_id`, `cinema_id`, `location_id`, `price`, `time_id`, `date_start`, `date_end`, `created_at`, `update_at`) VALUES
(42, 24, 13, 1, '10', 2, '2022-06-11', '2022-06-25', '2022-06-27 13:07:42', '2022-06-27 13:07:42');

-- --------------------------------------------------------

--
-- Table structure for table `showtime`
--

CREATE TABLE `showtime` (
  `time_id` bigint(20) NOT NULL,
  `prime_time` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `showtime`
--

INSERT INTO `showtime` (`time_id`, `prime_time`, `created_at`, `updated_at`) VALUES
(2, '08:00, 10:30, 12:00, 14:00, 16:30, 19:00, 20:00', '2022-06-26 01:49:57', '2022-06-26 01:49:57');

-- --------------------------------------------------------

--
-- Table structure for table `typeseat`
--

CREATE TABLE `typeseat` (
  `seat_id` int(11) NOT NULL,
  `seat_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `cinema`
--
ALTER TABLE `cinema`
  ADD PRIMARY KEY (`cinema_id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movies_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `movies_id` (`movies_id`),
  ADD KEY `time_id` (`time_id`),
  ADD KEY `cinema_id` (`cinema_id`);

--
-- Indexes for table `showtime`
--
ALTER TABLE `showtime`
  ADD PRIMARY KEY (`time_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `book_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `cinema`
--
ALTER TABLE `cinema`
  MODIFY `cinema_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movies_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `showtime`
--
ALTER TABLE `showtime`
  MODIFY `time_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`cinema_id`) REFERENCES `cinema` (`cinema_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
