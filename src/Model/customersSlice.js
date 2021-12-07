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
                phone : phone,
                email : email,
                waiver : waiver,
                role : role,
                repairClicked : false,
                assignClicked : false,
                blackTabClicked : false,
                rentOutClicked : false
            };

            state.unblacklisted[_id]=customer;
        },
        addCustomerToBlacklisted : (state,action)=>{
            const {_id,name,email,phone,waiver,role} = action.payload;
            //add customer to state.blacklisted hashmap
            const customer = {
                name : name,
                phone : phone,
                email : email,
                waiver : waiver,
                role : role,
                repairClicked : false,
                assignClicked : false,
                blackTabClicked : false,
                rentOutClicked : false
            };

            state.blacklisted[_id]=customer;
        },
        editRole : (state,action)=>{
            const {_id,role} = action.payload;
            state.unblacklisted[_id].role = role;
        },
        swapToBlacklisted : (state,action)=>{
            const {_id} = action.payload;
            state.blacklisted[_id] = state.unblacklisted[_id];
            delete state.unblacklisted[_id];
        },
        swapToUnblacklisted : (state,action)=>{
            const {_id} = action.payload;
            state.unblacklisted[_id] = state.blacklisted[_id];
            delete state.blacklisted[_id];
        },
        toggleRepair : (state,action)=>{
            const {_id} = action.payload;
            /* search through black/unblack and
               and toggle when _id is found*/
            
            Object.keys(state).map(option=>{
                if(_id in state[option]){
                    state[option][_id]['repairClicked']=!state[option][_id]['repairClicked'];
                    return;
                }
            });
        },
        toggleAssign : (state,action)=>{
            const {_id} = action.payload;
            /* search through black/unblack and
               and toggle when _id is found*/
            
            Object.keys(state).map(option=>{
                if(_id in state[option]){
                    state[option][_id]['assignClicked']=!state[option][_id]['assignClicked'];
                    return;
                }
            });
        },
        toggleBlackTab : (state,action)=>{
            const {_id} = action.payload;
            /* search through black/unblack and
               and toggle when _id is found*/
            
            Object.keys(state).map(option=>{
                if(_id in state[option]){
                    state[option][_id]['blackTabClicked']=!state[option][_id]['blackTabClicked'];
                    return;
                }
            });
        },
        toggleRentOut : (state,action)=>{
            const {_id} = action.payload;
            state.unblacklisted[_id]['rentOutClicked']= !state.unblacklisted[_id]['rentOutClicked'];
        },
        setAllRentToFalse : (state,action)=>{
            Object.values(state.unblacklisted).map(customer=>{
                customer['rentOutClicked']=false;
                return;
            });
        }
    }
})

export default slice.reducer;
export const {addCustomerToUnblacklisted,addCustomerToBlacklisted,editRole,swapToBlacklisted,swapToUnblacklisted,toggleRepair,toggleAssign,toggleBlackTab,toggleRentOut,setAllRentToFalse} = slice.actions;