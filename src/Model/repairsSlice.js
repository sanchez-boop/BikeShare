import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name : 'repairs',
    initialState : {},
    reducers : {
        addRepair : (state,action)=>{
            const {_id,name,email,phone,bikeModel,notes,status} = action.payload;
            //add customer to statehashmap
            const customer = {
                name : name,
                email : email,
                phone : phone,
                bikeModel : bikeModel,
                notes : notes,
                status : status,
                dropdown : false
            };

            state[_id]=customer;
        },
        deleteRepair : (state,action)=>{
            const {_id} = action.payload;
            delete state[_id];
        },
        editStatus : (state,action)=>{
            /*change status to desired status and
              toggle the dropdown. if prev dropdown 
              was false, there should be no status
              change */
            const{_id,status} = action.payload;
            
            if(state[_id].dropdown==true)
            {
                state[_id].status = status;
            }

            state[_id].dropdown = !state[_id].dropdown;
        }
    }
})

export default slice.reducer;
export const {addRepair,deleteRepair,editStatus} = slice.actions;