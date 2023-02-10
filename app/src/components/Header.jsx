import "../images/galvanize-logo.svg";
// import { AdminMenu } from "../../../../back-again/unused_files/AdminMenu";
// import Image from "react-bootstrap/Image";
import React, { useState } from "react";
// import ProfilePhoto from "../../../../back-again/unused_files/ProfilePhoto";

export const Header = (props) => {
  const { cohortName, isLoadingCourses, isLoggedIn, setIsLoggedIn } = props;

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