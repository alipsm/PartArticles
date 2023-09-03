import React from "react";
import ButtonUI from "../../elements/button/ButtonUI";
import styles from "./_style.module.scss";
import BoxPicture from "./img/favoritesFont.png";
import FavoritesPicture from "./img/favorites.png";
import Link from "next/link";
import Router from "next/router";

const { Header } = require("./Header/Header.tsx");
const { Banner } = require("./baner/Banner.tsx");

export default function SidebarMenu() {
  function logOut() {
    localStorage.removeItem("token")
    Router.replace("/accountOperation/login")

  }
  return (
    <div id={styles.SidebarMenu}>
      <div>
        <Header />
        <br />
        <main>
          <Link href={"articles"}>
            <ButtonUI
              text="All Articles"
              fontSize={22}
              image={{ src: BoxPicture, alt: "box" }}
              fullWidth
            />
          </Link>
          <ButtonUI
            text="Favorites"
            fontSize={22}
            image={{ src: FavoritesPicture, alt: "favorites" }}
            fullWidth
            disable
          />
        </main>
      </div>
      <div>
        <main>
          <Banner />
          <ButtonUI text="Log Out" fontSize={22} type="Tertiary" onButtonClicked={logOut} fullWidth/>
        </main>
      </div>
    </div>
  );
}
