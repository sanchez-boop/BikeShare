import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "acc",
  initialState: {
    /*convert string to bool using equality*/
    loggedIn: true, //for testing
    id: -1,
    name: "",
    email: "",
    phone: "",
    role: "admin", //for testing
  },
  reducers: {
    signIn: (state, action) => {
      /*save the name and password from the state payload passed in. Pass in
            state, name, password into authenticator*/
      const { _id, name, email, phone, role } = action.payload;
      console.log("User's name that logged in: " + name);
      state.loggedIn = true;
      state.id = _id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.role = role;
    },
    signOut: (state) => {
      //update local storage to false then convert LoggedIn and admin to bool
      state.loggedIn = false;
      state.id = -1;
      state.email = "";
      state.name = "";
      state.phone = "";
      state.role = "";
    },
    editName: (state, action) => {
      /* change name to desired name */
      const { name } = action.payload;
      state.name = name;
      console.log("state.name: " + state.name);
    },
  },
});

export default slice.reducer;
export const { signIn, signOut, editName } = slice.actions;
