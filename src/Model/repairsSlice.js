import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name : 'repairs',
    initialState : {},
    reducers : {
        addRepair : (state,action)=>{
            const {id,name,email,phone,role} = action.payload;
        },
        deleteRepair : (state)=>{

        }
    }
})

export default slice.reducer;
export const {addRepair,deleteRepair} = slice.actions;