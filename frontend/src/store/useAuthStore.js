import { create } from "zustand";
export const useAuthStore = create((set)=>({
    authUser : {name: "anirban",_id: 123, age: 23},
    isLoggedIn : false,
    isLoading : false,


    login : () =>{
        console.log("We Just Login in ")
        set({isLoggedIn : true , isLoading : true})
    }
}))