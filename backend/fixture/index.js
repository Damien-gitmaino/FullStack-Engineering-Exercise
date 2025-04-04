const PrismaClient = require('@prisma/client').PrismaClient;

const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.onboardingConfig.createMany({
            data: [{
                page: 2,
                components: ['aboutMe']
            },
            {
                page: 3,
                components: ['address']
            }]
        })
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
        // await testGenRef()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })