import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "bikes",
  initialState: {
    due: {},
    rented: {},
    available: {},
  },
  reducers: {
    addBikeToDue: (state, action) => {
      const {
        _id,
        id,
        serialNumber,
        model,
        dateRented,
        notes,
        name,
        email,
        phone,
      } = action.payload;
      //add bike to state.due hashmap
      const bike = {
        id: id,
        serialNumber: serialNumber,
        model: model,
        dateRented: dateRented,
        notes: notes,
        name: name,
        email: email,
        phone: phone,
        renewClicked: false,
        deleteClicked: false,
      };

      state.due[_id] = bike;
    },
    addBikeToRented: (state, action) => {
      const {
        _id,
        id,
        serialNumber,
        model,
        dateRented,
        notes,
        name,
        email,
        phone,
      } = action.payload;
      //add bike to state.rented hashmap
      const bike = {
        id: id,
        serialNumber: serialNumber,
        model: model,
        dateRented: dateRented,
        notes: notes,
        name: name,
        email: email,
        phone: phone,
        renewClicked: false,
        deleteClicked: false,
      };

      state.rented[_id] = bike;
    },
    addBikeToAvailable: (state, action) => {
      const {
        _id,
        id,
        serialNumber,
        model,
        dateRented,
        notes,
        name,
        email,
        phone,
      } = action.payload;
      //add bike to state.available hashmap
      const bike = {
        id: id,
        serialNumber: serialNumber,
        model: model,
        dateRented: dateRented,
        notes: notes,
        name: name,
        email: email,
        phone: phone,
        renewClicked: false,
        deleteClicked: false,
      };

      state.available[_id] = bike;
    },
    editBikeToRented: (state,action) =>{
      const { _id, name, email, phone } = action.payload;
      state.available[_id].name = name;
      state.available[_id].email = email;
      state.available[_id].phone = phone;

      //now add bike to rented and delete from available
      state.rented[_id] = state.available[_id];
      delete state.available[_id];
    },
    deleteFromDue: (state, action) => {
      const { _id } = action.payload;
      delete state.due[_id];
    },
    deleteFromRented: (state, action) => {
      const { _id } = action.payload;
      delete state.rented[_id];
    },
    deleteFromAvailable: (state, action) => {
      const { _id } = action.payload;
      delete state.available[_id];
    },
    deleteBike: (state, action) => {
      const { _id } = action.payload;
      /* search through the three bike states 
               and delete when id is found*/

      Object.keys(state).map((bikeState) => {
        if (_id in state[bikeState]) {
          delete state[bikeState][_id];
          return;
        }
      });
    },
    toggleRenew: (state, action) => {
      const { _id } = action.payload;
      /* search through the three bike states 
               and toggle when id is found*/

      Object.keys(state).map((bikeState) => {
        if (_id in state[bikeState]) {
          state[bikeState][_id].renewClicked =
            !state[bikeState][_id].renewClicked;
          return;
        }
      });
    },
    toggleDelete: (state, action) => {
      const { _id } = action.payload;
      /* search through the three bike states 
               and toggle when id is found*/

      Object.keys(state).map((bikeState) => {
        if (_id in state[bikeState]) {
          state[bikeState][_id].deleteClicked =
            !state[bikeState][_id].deleteClicked;
          return;
        }
      });
    },
  },
});

export default slice.reducer;
export const {
  addBikeToDue,
  addBikeToRented,
  addBikeToAvailable,
  editBikeToRented,
  deleteFromDue,
  deleteFromAvailable,
  deleteFromRented,
  deleteBike,
  toggleRenew,
  toggleDelete,
} = slice.actions;
