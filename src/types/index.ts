export type registerUserType = {
  username: string;
  email: string;
  fullName: string;
  avatar?: any;
  coverImage?: any;
  password: string;
};
export type loginUserType = {
  // username:string,
  email: string;
  password: string;
};

export type userType = {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  watchHistory: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  description:string;
};

export type UserContextType = {
  user: userType;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<userType>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export type videoType = {
  createdAt: string;
  description:  string;
  duration: number;
  isPublished:boolean;
  owner:string;
  owner_details:any,
  thumbnail:  string;
  title:  string;
  updatedAt:  string;
  videoFile:  string;
  views:  number;
  __v:  number;
  _id:  string;
};

export type uploadVideoFormType={
      videoFile:any,
      thumbnail:any,
      title:string,
      description:string
}

export type updateUserType={
      username:undefined|string,
      email:undefined|string,
      fullName:undefined|string,
      description:undefined|string
}