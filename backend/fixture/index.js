const PrismaClient = require('@prisma/client').PrismaClient;

const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.onboardingConfig.createMany({
            data: [{
                page: 2,
                component: ['aboutMe']
            },
            {
                page: 3,
                component: ['address']
            }]
        })
    } catch (err) {
        throw new Error(err)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
        // await testGenRef()
    })
    .catch(async (e) => {
        await prisma.$disconnect()
        process.exit(1)
    })