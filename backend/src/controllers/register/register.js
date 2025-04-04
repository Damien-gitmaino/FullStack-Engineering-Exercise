import prisma from "../../services/db";

export async function postUsers(req, res) {
    try {
        const {body} = req;

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                aboutMe: body.aboutMe,
                street: body.street,
                city: body.city,
                state: body.state,
                zip: body.zip,
                birthdate: body.birthdate ? new Date(body.birthdate) : null
            }
        });

        return res.status(200).json(user)
    } catch (err) {
        res.status(500).send('An error as occured')
    }
}