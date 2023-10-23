import { fetchy } from "./fetchy.ts";


export async function getProfile(username:string){
    try{
        const response = await fetchy(`api/profile/${username}`,"GET");
        return response.firstname
        // console.log(`this is profile for ${username}: ${response.firstname}`)
    }
    catch{
        console.log(`Fail fetching user profile for ${username}`)
    }
    return username
}

export async function getUser(username:string){
    try{
        const response = await fetchy(`api/users/${username}`,"GET");
        return response._id
        // return response.firstname
        // console.log(`this is id for ${username}: ${response._id}`)
    }
    catch{
        console.log(`Fail fetching user id for ${username}`)
    }
    return username
}