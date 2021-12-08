import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "acc",
  initialState: {
    /*convert string to bool using equality*/
    loggedIn: false,
    id: -1,
    name: "",
    email: "",
    phone: "",
    role: "",
  },
  reducers: {
    signIn: (state, action) => {
      /*save the name and password from the state payload passed in. Pass in
            state, name, password into authenticator*/
      const { _id, name, email, phone, role, password, waiver } =
        action.payload;
      state.loggedIn = true;
      state.id = _id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.role = role;
      state.password = password;
      state.waiver = waiver;
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
    },
    editEmail: (state, action) => {
      /* change name to desired name */
      const { email } = action.payload;
      state.email = email;
    },
    editPassword: (state, action) => {
      /* change name to desired name */
      const { password } = action.payload;
      state.password = password;
    },
    editWaiver: (state, action) => {
      console.log("state.waiver after is " + state.waiver);

      /* change name to desired name */
      const { waiver } = action.payload;
      state.waiver = waiver;
      console.log("state.waiver after is " + state.waiver);
    },
  },
});

export default slice.reducer;
export const {
  signIn,
  signOut,
  editName,
  editEmail,
  editPassword,
  editWaiver,
} = slice.actions;
