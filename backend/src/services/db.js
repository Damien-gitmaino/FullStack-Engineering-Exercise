/**
 * Database Service
 * Initializes and exports Prisma client for database operations
 * Provides single instance of PrismaClient across the application
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
