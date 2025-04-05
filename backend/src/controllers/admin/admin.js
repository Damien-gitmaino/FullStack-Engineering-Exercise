/**
 * Admin Controller
 * Handles administrative operations for onboarding configuration
 */

import prisma from "../../services/db";

/**
 * Retrieves current onboarding configuration
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function getConfig(req, res) {
    try {
        const config = await prisma.onboardingConfig.findMany();

        return res.status(200).json(config)
    } catch (err) {
        res.status(500).send('An error as occured')
    }
}

/**
 * Updates onboarding configuration
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
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

            /* SQL Statement

                UPDATE onboarding_config
                SET components = '<valeurs_components_page_1>'
                WHERE id = '<id_page_1>';
            */
        }

        return res.status(204).send('Update done')
    } catch (err) {
        res.status(500).send('An error as occured')
    }
}