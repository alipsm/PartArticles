import React, { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import ButtonUI from "../../elements/button/ButtonUI";
import styles from "./_style.module.scss";
import boxPicture from "./img/box.png";
import favoritesPicture from "./img/favorites.png";

const { Header } = require("./Header/Header.tsx");
const { Banner } = require("./baner/Banner.tsx");

export default function SidebarMenu() {
  const [userData, setUserData] = useState({ username: "", email: "" });

  useEffect(() => {
    getUserDataFromTheLocal();
  }, []);

  function getUserDataFromTheLocal() {
    const userLocalData = localStorage.getItem("UnimportantUserData");
    if (!!!userLocalData) {
      localStorage.removeItem("token");
      Router.replace("/accountOperation/login");
    }
    const splitedUserData = userLocalData?.split(",");
    setUserData({
      username: splitedUserData[0],
      email: splitedUserData[1],
    });
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("UnimportantUserData");
    Router.replace("/accountOperation/login");
  }
  return (
    <div id={styles.SidebarMenu}>
      <div>
        <Header />
        <br />
        <main>
          <Link href={"/dashboard/articles"}>
            <ButtonUI
              text="All Articles"
              fontSize={22}
              image={{ src: boxPicture, alt: "box" }}
              fullWidth
            />
          </Link>
          <ButtonUI
            text="Favorites"
            fontSize={22}
            image={{ src: favoritesPicture, alt: "favorites" }}
            fullWidth
            disable
          />
        </main>
      </div>
      <div>
        <main>
          <Banner username={userData.username} email={userData.email} />
          <ButtonUI
            text="Log Out"
            fontSize={22}
            type="Tertiary"
            onButtonClicked={logOut}
            fullWidth
          />
        </main>
      </div>
    </div>
  );
}
