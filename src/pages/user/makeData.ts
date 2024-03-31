import { getUsers } from "../../api/user";

export type User = {
    id: string;
    username:string;
    firstName: string;
    lastName: string;
    email: string;
    state: string;
    role:string;
    password:string;
    display:string;
  };
  
  export const usStates = [
    'California',
    'Colorado',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Jersey',
    'New York'
  ];
  