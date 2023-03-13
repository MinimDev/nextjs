import cookies from "next-cookies";


//middleware function untuk page yang tidak membutuhkan auth contoh: login/register 
export async function unAuthPage(ctx){
    return new Promise(resolve =>{
        const allCookies  = cookies(ctx)
        //console.log(allCookies.token)
        if(allCookies.token){
            ctx.res.writeHead(302, {
                location: "/posts"
            }).end()
        }
        return resolve('unAuthorized')
    })

}

export function authPage(ctx){
    return new Promise(resolve => {
        const allCookies = cookies(ctx)

        if(!allCookies.token){
            ctx.res.writeHead(302, {
                location: "/auth/login"
            }).end()
        }

        console.log(allCookies.token)

        return resolve({
            token: allCookies.token
        })
    })
}