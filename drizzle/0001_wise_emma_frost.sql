CREATE TABLE `budgets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`amount` real DEFAULT 0,
	`date` text NOT NULL,
	`budget_id` integer,
	FOREIGN KEY (`budget_id`) REFERENCES `budgets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `incomes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`amount` real DEFAULT 0,
	`date` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `wallet` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` real DEFAULT 0
);
