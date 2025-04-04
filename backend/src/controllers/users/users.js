/**
 * Users Controller
 * Handles user-related operations and queries
 */
import prisma from "../../services/db";

/**
 * Retrieves all registered users from the database
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Returns list of users or error response
 */
export async function getAllUsers(req, res) {
    try {
        const users = await prisma.user.findMany();
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send("An error occurded")
    }
}