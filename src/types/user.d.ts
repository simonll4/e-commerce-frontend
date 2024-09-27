export interface User{
  id?:number;
  email:string;
  password:string;
  name:string;
  role:string;
  avatar:string;
  createdAt:string;

}

export interface FilterUser{
  limit:number;
}

export interface CreateUser{
  email:string;
  password:string;
  name:string;
  role:string;
  avatar:string;
}

export interface UpdateUser{
  email?:string;
  password?:string;
  name?:string;
  role?:string;
  avatar?:string;
}