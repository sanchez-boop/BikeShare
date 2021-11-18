import React, { useState } from "react";
import { useSelector } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import HomeTab from "./tabs/homeTab";
import RentOutTab from "./tabs/rentOutTab";
import RenewTab from "./tabs/renewTab";
import BlacklistTab from "./tabs/blacklistTab";
import AssignRolesTab from "./tabs/assignRolesTab";
import "./tabNav.css";

export default () => {
  //const [currTab, setCurrTab] = useState(<HomeTab />);
  const { acc } = useSelector((state) => state);

  return (
    <>
      <div className="tab-background">
        <Tabs defaultActiveKey="home" className="mb-3 tab-section">
          <Tab eventKey="home" title="Home" tabClassName="tab">
            <HomeTab />
          </Tab>
          <Tab eventKey="rent-out" title="Rent out" tabClassName="tab">
            <RentOutTab />
          </Tab>
          <Tab eventKey="renew/return" title="Renew/Return" tabClassName="tab">
            <RenewTab />
          </Tab>
          <Tab eventKey="blacklist" title="Blacklist" tabClassName="tab">
            <BlacklistTab />
          </Tab>
          {acc.role == "admin" && (
            <Tab
              eventKey="assign-roles"
              title="Assign Roles"
              tabClassName="tab"
            >
              <AssignRolesTab />
            </Tab>
          )}
        </Tabs>
      </div>
    </>
  );
};
