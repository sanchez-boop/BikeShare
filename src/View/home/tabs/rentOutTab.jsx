import { React, useState } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { AiOutlineSearch } from "react-icons/ai";
import "./rentOutTab.css";

export default () => {
  const arr = [
    ["mark", "111-111-1111", "mark@yahoo.com", "No"],
    ["mdrk", "111-111-1111", "mdrk@gmail.com", "Yes"],
    ["madd", "111-111-1111", "youmadd@mail.com", "No"],
  ];
  const ar = [
    [1, "Single-Speed", "1111111111"],
    [2, "Cruiser", "8641311791"],
    [45, "Cruiser", "6478731351"],
  ];

  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);
  const [isActive4, setActive4] = useState(false);

  /* Toggle the outline for the first search bar */
  const toggleClass1 = () => {
    if (!isActive1) {
      setActive1(!isActive1);
    }
  };
  /* Untoggle the outline for the first search bar */
  const unToggleClass1 = () => {
    setActive1(!isActive1);
  };
  /* Toggle the outline for the second search bar */
  const toggleClass2 = () => {
    if (!isActive2) {
      setActive2(!isActive2);
    }
  };
  /* Untoggle the outline for the second search bar */
  const unToggleClass2 = () => {
    setActive2(!isActive2);
  };
  /* Toggle the outline for the second search bar */
  const toggleClass4 = () => {
    if (!isActive4) {
      setActive4(!isActive4);
    }
  };
  /* Untoggle the outline for the second search bar */
  const unToggleClass4 = () => {
    setActive4(!isActive4);
  };
  return (
    <>
      <div className="content">
        <div className="table-content">
          <div className="title-search-container">
            <div className="table-title">RENT TO</div>
            <div className="search-bar-container">
              <div
                className={isActive1 ? "search-field-active" : "search-field"}
                onFocus={toggleClass1}
                onBlur={unToggleClass1}
              >
                <input
                  type="text"
                  placeholder="Search customers"
                  className="search-bar"
                />
                <div className="search-button" tabindex="0">
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
<<<<<<< HEAD
            <input type="text" placeholder="Search.."/>
          {/*this table searches users */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
                        <th>WAIVER</th>
                    </tr>
                </thead>
                <tbody>
                {
                    arr.map((user,key)=>{
                        return(
                            <tr>
                                <td>{user[0]}</td>
                                <td>{user[1]}</td>
                                <td>{user[2]}</td>
                                <td>{user[3]}</td>
                                <td>{user[4]}</td>
                            </tr>
                    )})
                }
                </tbody>
            </Table>
            <div>
                BIKES AVAILABLE
            </div>
            <input type="text" placeholder="Search.."/>
            {/*this table searches bikes */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>BIKE NUMBER</th>
                        <th>STYLE OF BIKE</th>
                        <th>SERIAL NUMBER</th>
                    </tr>
                </thead>
                <tbody>
                {
                    ar.map((user,key)=>{
                        return(
                            <tr>
                                <td>{user[0]}</td>
                                <td>{user[1]}</td>
                                <td>{user[2]}</td>
                            </tr>
                    )})
                }
                </tbody>
            </Table> 
            <Button variant="success">Rent out bike</Button>
        </>
    )
}
=======
          </div>
          <Table borderless className="table">
            <thead className="table-header">
              <tr>
                <th>NAME</th>
                <th>PHONE</th>
                <th>EMAIL</th>
                <th>WAIVER</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((user, key) => {
                return (
                  <tr className=" table-body gray-highlight">
                    <td>{user[0]}</td>
                    <td>{user[1]}</td>
                    <td>{user[2]}</td>
                    <td>{user[3]}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="table-content">
          <div className="title-search-container">
            <div className="table-title">BIKES AVAILABLE</div>
            <div className="search-bar-container-adjust">
              <div
                className={isActive2 ? "search-field-active" : "search-field"}
                onFocus={toggleClass2}
                onBlur={unToggleClass2}
              >
                <input
                  type="text"
                  placeholder="Search available bikes"
                  className="search-bar"
                />
                <div className="search-button" tabindex="0">
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
          </div>
          <Table borderless className="table">
            <thead className="table-header">
              <tr>
                <th>BIKE NUMBER</th>
                <th>STYLE OF BIKE</th>
                <th>SERIAL NUMBER</th>
              </tr>
            </thead>
            <tbody>
              {ar.map((user, key) => {
                return (
                  <tr
                    className={
                      isActive4
                        ? "table-body yellow-highlight-active"
                        : "table-body gray-highlight yellow-highlight"
                    }
                    onClick={toggleClass4}
                    onClick={unToggleClass4}
                  >
                    <td>{user[0]}</td>
                    <td>{user[1]}</td>
                    <td>{user[2]}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <Button variant="success">Rent out bike</Button>
      </div>
    </>
  );
};
>>>>>>> d73e8326cb7ae9fc9eb0d5946e7512d441fddea4
