import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GetMainDashboard from "../../components/dashboard/GetMainDashboard";
import SidebarMenu from "../../components/dashboard/SideBarMenu/SidebarMenu";

export default function MainDashboard() {
  // handle showing section
  const router = useRouter();
  const { section } = router.query;

  console.log("section", Array.isArray(section) && section[0]);

  return (
    <div id="Dashboard">
      <SidebarMenu />
      <div className="mainContent">
        <GetMainDashboard
          section={Array.isArray(section) ? section[0] : undefined}
        />
      </div>
    </div>
  );
}
