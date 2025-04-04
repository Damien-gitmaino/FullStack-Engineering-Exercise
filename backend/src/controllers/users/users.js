import prisma from "../../services/db";

export async function getAllUsers(req, res) {
    try {
        const users = await prisma.user.findAll();

        res.status(200).send(users)
    } catch (err) {
        res.status(500).send("An error occurded")
    }
}