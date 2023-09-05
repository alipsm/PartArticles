import Router, { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import UserEntryAnimation from "../../components/animation/userEntryAnimation/userEntryAnimation";
import GetMainDashboard from "../../components/dashboard/GetMainDashboard";
import SidebarMenu from "../../components/dashboard/SideBarMenu/SidebarMenu";
import useUserLogination from "../../hooks/useLogination";

export default function MainDashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!!token) {
      window != undefined && Router.replace("/accountOperation/login");
    }
  }, []);

  // handle showing section
  const router = useRouter();
  const { section } = router.query;

  const memoizedSidebarMenu=useMemo(() => <SidebarMenu />, [])
  const memoizedUserEntryAnimation=useMemo(() => <UserEntryAnimation />,[])
  return (
    <div id="Dashboard">
      {memoizedSidebarMenu}
      <div className="mainContent">
        <GetMainDashboard
          section={Array.isArray(section) ? section[0] : undefined}
        />
      </div>
      {memoizedUserEntryAnimation}
    </div>
  );
}
