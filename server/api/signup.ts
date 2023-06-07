import { serverSupabaseClient } from '#supabase/server';
import { PrismaClient } from '@prisma/client'


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = serverSupabaseClient(event)
    const prisma = new PrismaClient()

    const user = await prisma.users.findFirst({
        where: {
            email: body.email
        }
    })

    if (user) {
        throw createError({
            message: 'User already exists',
            statusCode: 400
        })
    }

    const { data, error } = await client.auth.signUp({
        email: body.email,
        password: body.password
    }) 

    if(error){
        throw createError({
            message: error.message,
            statusCode: 400
        })
    }

    const userProfile = await prisma.userProfile.create({
        data: {
            email: body.email,
        }
    })

    if(!userProfile){
        await prisma.users.delete({
            where: {
                id: data.user.id
            }
        })
        throw createError({
            message: 'User profile could not be created',
            statusCode: 400
        })
    }

    return data.user
})
