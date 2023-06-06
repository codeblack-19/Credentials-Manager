import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = serverSupabaseClient(event)

    const { data } = await client.from('UserProfile').select('email').eq('email', body.email)

    if(data.length > 0) {
        throw createError({
            message: 'User already exists',
            statusCode: 400
        })
    }

    const {data: user, error} = await client.auth.signUp({
        email: body.email,
        password: body.password
    })

    if(error) {
        throw createError({
            message: error.message,
            statusCode: 400
        })
    }

    const { error: profileError  } = await client.from('UserProfile').insert({
        email: body.email,
    })

    if(profileError) {
        await client.auth.admin.deleteUser(user.uid).then(() => {
            throw createError({
                message: profileError.message,
                statusCode: 400
            })
        })
    }

    return user
})
