import React from "react";
import { Nav} from "react-bootstrap";
import { NavLink } from "react-router-dom";

const LeftNav = (props) => {
  const {handleLinkClicked} = props
  return (
    // <Navbar bg="light" expand="lg" style={{ height: "100vh", width: "10vw", position: "fixed", zIndex: "1"}}>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
      <Nav id='navbar' className="flex-column" style={{width: '15vw', minHeight: '100%', padding: '.25em', fontSize:'1.25em'}}>
        <NavLink id='nav-bar-link' onClick={() => handleLinkClicked("Cohorts")} to="#" className="nav-link" >
          Cohorts
        </NavLink>
        <NavLink id='nav-bar-link' onClick={() => handleLinkClicked("Students")} to="#" className="nav-link" >
          Students
        </NavLink>
        <NavLink id='nav-bar-link' onClick={() => handleLinkClicked("Group Creator")} to="#" className="nav-link" >
          Group Creator
        </NavLink>
        <NavLink id='nav-bar-link' onClick={() => handleLinkClicked("Averages")} to="#" className="nav-link" >
          Averages
        </NavLink>
        <NavLink id='nav-bar-link' onClick={() => handleLinkClicked("Assessments")} to="#" className="nav-link" >
          Assessments
        </NavLink>
        <NavLink id='nav-bar-link' onClick={() => handleLinkClicked("Projects")} to="#" className="nav-link" >
          Projects
        </NavLink>
      </Nav>
    //  </Navbar.Collapse>
    // </Navbar>
);
};

export default LeftNav;