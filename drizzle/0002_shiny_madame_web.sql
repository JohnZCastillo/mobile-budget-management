CREATE TABLE `expense` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`amount` real DEFAULT 0,
	`date` text NOT NULL,
	`budget_id` integer,
	FOREIGN KEY (`budget_id`) REFERENCES `budgets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_budgets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`amount` real DEFAULT 0
);
--> statement-breakpoint
INSERT INTO `__new_budgets`("id", "title", "amount") SELECT "id", "title", "amount" FROM `budgets`;--> statement-breakpoint
DROP TABLE `budgets`;--> statement-breakpoint
ALTER TABLE `__new_budgets` RENAME TO `budgets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;