
export type PostType = {
    type:'post',
    author:string,
    caption:string,
    photos:string,
    dateCreated:Date
}

//<Hangout v-else :activity="item.activity" :author="item.username" :location="item.location" :date="item.date" :acceptee = "item.acceptee" :id= "item._id" :showAcceptButton="true" />
export type ProposalType = {
    type:'hangout',
    author:string,
    activity:string,
    username:string,
    location:string,
    date:string,
    acceptee:Array<string>,
    _id:string,
    dateCreated:Date
}

export type FriendType = {
    firstname: string,
    lastname: string,
    username: string,
    profilePic: string
}

export type RequestType = {
    from: string,
    to: string,
    status:string
}

export type AlbumType = {
    type: "album",
    photos: Array<string>,
    from: string,
    title: string,
    _id:string,
    dateUpdated: string
}

export type MessageType = {
    type: "message",
    user: string,
    message: string,
    dateUpdated: string
}

export type BodyType = {
    to?: string;
    message?: string;
    title?:string;
    photos?:Array<string>;
  };
  