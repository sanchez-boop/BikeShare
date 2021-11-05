import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name : 'bikes',
    initialState : [],
    reducers : {
        addBike : (state,action)=>{
            const {id,name,email,phone,role} = action.payload;
        },
        deleteBike : (state)=>{

        }
    }
})

export default slice.reducer;
export const {addBike,deleteBike} = slice.actions;