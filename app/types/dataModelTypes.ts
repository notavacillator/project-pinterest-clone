export interface User {
    email: string;
    userImage: string;
    userName: string;
  }


 export interface PostData {
    postId: string;
    desc: string;
    destinationLink: string;
    email: string;
    image: string;
    title: string;
    userImage: string;
    username: string;
}

export interface PinterestPost {
    postData: PostData;
}


  
  