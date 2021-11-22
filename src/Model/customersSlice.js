import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name : 'customers',
    /*limit customers added to 100 */
    initialState : {
        unblacklisted : {},
        blacklisted : {}
    },
    reducers : {
        addCustomerToUnblacklisted : (state,action)=>{
            const {_id,name,email,phone,waiver,role} = action.payload;
            //add customer to state.unblacklisted hashmap
            const customer = {
                name : name,
                email : email,
                phone : phone,
                waiver : waiver,
                role : role
            };

            state.unblacklisted[_id]=customer;
        },
        addCustomerToBlacklisted : (state,action)=>{
            const {_id,name,email,phone,waiver,role} = action.payload;
            //add customer to state.blacklisted hashmap
            const customer = {
                name : name,
                email : email,
                phone : phone,
                waiver : waiver,
                role : role
            };

            state.blacklisted[_id]=customer;
        },
        deleteFromUnblacklisted : (state,action)=>{
            const {_id} = action.payload;
            delete state.unblacklisted[_id];
        },
        deleteFromBlacklisted : (state,action)=>{
            const {_id} = action.payload;
            delete state.blacklisted[_id];
        }
    }
})

export default slice.reducer;
export const {addCustomerToUnblacklisted,addCustomerToBlacklisted,deleteFromUnblacklisted,deleteFromBlacklisted} = slice.actions;