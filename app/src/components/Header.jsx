import "../images/galvanize-logo.svg";
// import { AdminMenu } from "../../../../back-again/unused_files/AdminMenu";
// import Image from "react-bootstrap/Image";
import React, { useState } from "react";
// import ProfilePhoto from "../../../../back-again/unused_files/ProfilePhoto";

const Header = (props) => {
  const { courses, isLoadingCourses, isLoggedIn, setIsLoggedIn } = props;

  return (
    <header id="header">
      {/* <ProfilePhoto /> */}
      {/* <AdminMenu
        courses={courses}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      /> */}
    </header>
  );
};

export default Header;