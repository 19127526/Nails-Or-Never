USE `sho62786_nails`;
CREATE TABLE IF NOT EXISTS `employees`(
                                          `id` integer PRIMARY KEY AUTO_INCREMENT,
                                          `full_name` varchar(50),
                                          `email` varchar(50),
                                          `address` varchar(50),
                                          `phone_number` varchar(20),
                                          `image` varchar(255),
                                          `status` int
);

CREATE TABLE IF NOT EXISTS `users` (
                                       `id` integer PRIMARY KEY AUTO_INCREMENT,
                                       `username` varchar(50) unique,
                                       `password` varchar(100),
                                       `email` varchar(50),
                                       `token` varchar(255),
                                       `role` varchar(50),
                                       `employee_id` int
);

CREATE TABLE IF NOT EXISTS `services_parents` (
                                                  `id` integer PRIMARY KEY AUTO_INCREMENT,
                                                  `name` varchar(50),
                                                  `image` varchar(255),
                                                    `description` varchar(255)
);

CREATE TABLE IF NOT EXISTS `services` (
                                          `id` integer PRIMARY KEY AUTO_INCREMENT,
                                          `name` varchar(50),
                                          `price` float,
                                          `services_parents` integer,
                                          `image` varchar(255),
                                          `description` varchar(255)

    );

CREATE TABLE IF NOT EXISTS `gallery_parents` (
                                                 `id` integer PRIMARY KEY AUTO_INCREMENT,
                                                 `image` varchar(255),
                                                 `theme` varchar(50),
                                                 `description` varchar(255)
    );

CREATE TABLE IF NOT EXISTS `gallery` (
                                         `id` integer PRIMARY KEY AUTO_INCREMENT,
                                         `image` varchar(255),
                                         `gallery_parents` integer,
                                         `description` varchar(255)

    );

CREATE TABLE IF NOT EXISTS `gift_cards` (
                                            `id` integer PRIMARY KEY AUTO_INCREMENT,
                                            `image` varchar(255),
                                            `theme` varchar(50),
    `description` varchar(255)
);

CREATE TABLE IF NOT EXISTS `gift_cards_checkout` (
                                                     `gift_cards` integer,
                                                     `checkout_id` integer,
                                                     `quantity` integer,
                                                     `price` integer,
                                                     PRIMARY KEY (`gift_cards`, `checkout_id`)
);

CREATE TABLE IF NOT EXISTS `checkout` (
                                          `id` integer PRIMARY KEY AUTO_INCREMENT,
                                          `method` varchar(50),
                                          `full_name` varchar(50),
                                          `email` varchar(50),
                                          `phone` varchar(20),
                                          `address` varchar(50),
                                          `paypalID` integer unique,
                                          `subtotal` integer,
                                          `discount` integer,
                                          `tax` integer,
                                          `total` integer
);

CREATE TABLE IF NOT EXISTS `paypal` (
                                        `id` integer PRIMARY KEY AUTO_INCREMENT,
                                        `paymentID` integer,
                                        `email` integer,
                                        `price` integer,
                                        `status` integer,
                                        `accountID` integer
);

CREATE TABLE IF NOT EXISTS `booking` (
                                         `id` integer PRIMARY KEY AUTO_INCREMENT,
                                         `services` integer,
                                         `datetime` datetime,
                                         `full_name` varchar(50),
                                         `cellphone_number` varchar(20),
                                         `email` varchar(50),
                                         `appointment_note` varchar(255)
);

CREATE TABLE IF NOT EXISTS `contact` (
                                         `id` integer PRIMARY KEY AUTO_INCREMENT,
                                         `name` varchar(50),
                                         `email` varchar(50),
                                         `subject` varchar(255),
                                         `message` varchar(255)
);

CREATE TABLE IF NOT EXISTS `about_us` (
                                          `id` integer PRIMARY KEY AUTO_INCREMENT,
                                          `name` integer,
                                          `description` varchar(255),
                                          `working_hour` datetime,
                                          `tel` varchar(20),
                                          `email` varchar(50),
                                          `address` varchar(50),
                                          `footage` varchar(100)
);

ALTER TABLE `users` ADD FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);
ALTER TABLE `services` ADD FOREIGN KEY (`services_parents`) REFERENCES `services_parents` (`id`);
ALTER TABLE `gallery` ADD FOREIGN KEY (`gallery_parents`) REFERENCES `gallery_parents` (`id`);
ALTER TABLE `booking` ADD FOREIGN KEY (`services`) REFERENCES `services` (`id`);
ALTER TABLE `paypal` ADD FOREIGN KEY (`paymentID`) REFERENCES `checkout` (`id`);
ALTER TABLE `gift_cards_checkout` ADD FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`id`);
ALTER TABLE `gift_cards_checkout` ADD FOREIGN KEY (`gift_cards`) REFERENCES `gift_cards` (`id`);
