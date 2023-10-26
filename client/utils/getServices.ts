import { fetchy } from "./fetchy";

export async function getFullProfile(username: string){
    try{
        const response = await fetchy(`api/profile/${username}`,"GET");
        return {firstname: response.firstname, lastname: response.lastname, profilePic: response.profilePic}
    }
    catch{
        console.log(`Fail fetching full user profile for ${username}`)
    }
    return {firstname: 'Error', lastname: 'Error', profilePic: 'Error'}
}

export async function getProfile(username:string){
    try{
        const response = await fetchy(`api/profile/${username}`,"GET");
        return response.firstname
    }
    catch{
        console.log(`Fail fetching user profile for ${username}`)
    }
    return username
}

export async function getUsername(id:string){
    try{
        const response = await fetchy(`api/users/id/${id}`,"GET");
        return response.username
    }
    catch{
        console.log(`Fail fetching user id for ${id}`)
    }
    return id
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

/**
 * 
 * @returns List of Username
 */
export async function getFriend():Promise<string[]>{
    const friendList = []

    try{
        let friendResponse = await fetchy(`api/friend`,"GET")

    
        for(const id of friendResponse){
            const response = await fetchy(`api/users/id/${id}`,"GET")
            friendList.push(response.username)
        }
    }catch{
        console.log(`Failed getFriend`)
    }
   
    return friendList;
}