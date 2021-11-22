import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import HomeTab from "./tabs/homeTab";
import RentOutTab from "./tabs/rentOutTab";
import RenewTab from "./tabs/renewTab";
import RepairTab from "./tabs/repairTab";
import BlacklistTab from "./tabs/blacklistTab";
import AssignRolesTab from "./tabs/assignRolesTab";
import BikesTab from "./tabs/bikesTab"
import "./tabNav.css";
import { addBikeToDue, deleteBike } from "../../Model/bikesSlice";

export default () => {
  const { acc,bikes } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(()=>{
    const bike = {
      _id : 10,
      serialNumber : 'serialNumber',
      model : 'model',
      dateRented : 'ateRented',
      notes : 'notes',
      name : 'name',
      email : 'email',
      phone : 1
    };

    dispatch(addBikeToDue(bike));
    const bike2 = {
      _id : 110,
      serialNumber : 'serialNumber',
      model : 'model',
      dateRented : 'ateRented',
      notes : 'notes',
      name : 'name',
      email : 'email',
      phone : 1
    };
    dispatch(addBikeToDue(bike2));
    dispatch(deleteBike({_id : 110}))

  },[]);

  return (
    <>
      <div className="tab-background">
        <Tabs defaultActiveKey="home" className="mb-4 tab-section">
          <Tab eventKey="home" title="Home" tabClassName="tab">
            <HomeTab />
          </Tab>
          <Tab eventKey="rent-out" title="Rent out" tabClassName="tab">
            <RentOutTab />
          </Tab>
          <Tab eventKey="renew/return" title="Renew/Return" tabClassName="tab">
            <RenewTab />
          </Tab>
          <Tab eventKey="repair" title="Repair" tabClassName="tab">
            <RepairTab />
          </Tab>
          <Tab eventKey="blacklist" title="Blacklist" tabClassName="tab">
            <BlacklistTab />
          </Tab>
          {acc.role == "Admin" && (
            <Tab
              eventKey="assign-roles"
              title="Users/Assign Roles"
              tabClassName="tab"
            >
              <AssignRolesTab />
            </Tab>
          )}
          {acc.role == "Admin" && (
            <Tab
              eventKey="bikes"
              title="Bikes"
              tabClassName="tab"
            >
              <BikesTab />
            </Tab>
          )}
        </Tabs>
      </div>
    </>
  );
};
