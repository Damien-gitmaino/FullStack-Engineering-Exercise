import prisma from "../../services/db";

export async function getConfig(req, res) {
    try {
        const config = await prisma.onboardingConfig.findMany();

        return res.status(200).json(config)
    } catch (err) {
        res.status(500).send('An error as occured')
    }
}

export async function updateConfig(req, res) {
    try {
        if (!req.body)
            return res.status(413).send('Missing body data')

        for (let page of req.body) {
            await prisma.onboardingConfig.update({
                where: {
                    id: page.id
                },
                data: {
                    components: page.components
                }
            })
        }

        return res.status(204).send('Update done')
    } catch (err) {
        res.status(500).send('An error as occured')
    }
}