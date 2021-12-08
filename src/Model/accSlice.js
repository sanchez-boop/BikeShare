import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "acc",
  initialState: {
    /*convert string to bool using equality*/
    loggedIn: (localStorage.getItem('loggedIn')=='true'),
    id: localStorage.getItem('id'),
    jwt: localStorage.getItem('jwt'),
    name: "",
    email: "",
    phone: "",
    role: localStorage.getItem('role'),
  },
  reducers: {
    signIn: (state, action) => {
      /*save the name and password from the state payload passed in. Pass in
            state, name, password into authenticator*/
      const { _id, jwt, name, email, phone, role } = action.payload;

      localStorage.setItem('loggedIn','true');
      localStorage.setItem('id',_id);
      localStorage.setItem('jwt',jwt);
      localStorage.setItem('role',role);
      state.loggedIn = true;
      state.id = localStorage.getItem('id');
      state.jwt = localStorage.getItem('jwt');
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.role = localStorage.getItem('role');
    },
    signOut: (state) => {
      //update local storage to false then convert LoggedIn and admin to bool
      localStorage.setItem('loggedIn','false');
      localStorage.setItem('id','');
      localStorage.setItem('jwt','');
      localStorage.setItem('role','');
      state.loggedIn = false;
      state.id = localStorage.getItem('id');
      state.jwt = localStorage.getItem('jwt');
      state.email = "";
      state.name = "";
      state.phone = "";
      state.role = localStorage.getItem('role');
    },
  },
});

export default slice.reducer;
export const { signIn, signOut } = slice.actions;
