import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

export const walletTable = sqliteTable("wallet", {
  id: int().primaryKey({ autoIncrement: true }),
  amount: real().default(0.00),
});

export const budget = sqliteTable("budgets", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  amount: real().default(0.00),
});

export const expense = sqliteTable("expense", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  amount: real().default(0.00),
  date: text().notNull(),
  budgetId: int("budget_id").references(() => budget.id)
});

export const income = sqliteTable("incomes", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  amount: real().default(0.00),
  date: text().notNull(),
});


