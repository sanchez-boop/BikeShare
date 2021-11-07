import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name : 'customers',
    initialState : [],
    reducers : {
        addCustomer : (state,action)=>{
            const {id,name,email,phone,role} = action.payload;
        },
        blacklistCustomer : (state,action)=>{
            
        }
    }
})

export default slice.reducer;
export const {addCustomer,blacklistCustomer} = slice.actions;