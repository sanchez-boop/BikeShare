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
                blackTabClicked : false
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
                role : role,
                repairClicked : false,
                blackTabClicked : false
            };

            state.blacklisted[_id]=customer;
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
               and toggle when id is found*/
            
            Object.keys(state).map(option=>{
                if(_id in state[option]){
                    state[option][_id]['repairClicked']=!state[option][_id]['repairClicked'];
                    return;
                }
            });
        },
        toggleBlackTab : (state,action)=>{
            const {_id} = action.payload;
            /* search through black/unblack and
               and toggle when id is found*/
            
            Object.keys(state).map(option=>{
                if(_id in state[option]){
                    state[option][_id]['blackTabClicked']=!state[option][_id]['blackTabClicked'];
                    return;
                }
            });
        }
    }
})

export default slice.reducer;
export const {addCustomerToUnblacklisted,addCustomerToBlacklisted,swapToBlacklisted,swapToUnblacklisted,toggleRepair,toggleBlackTab} = slice.actions;