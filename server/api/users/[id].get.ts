import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()

    const user = await prisma.users.findFirst({
        where: {
            "id": event.context.params?.id
        }
    })

    return user
})