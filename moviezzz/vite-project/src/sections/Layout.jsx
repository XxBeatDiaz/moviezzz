import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import TopNav from "./TopNav";
import LoginDialog from "../components/userComps/LoginDialog";
import LogOut from "../components/userComps/LogOut";

import { selectUser } from "../redux/slices/user";
import { LOGO, LINKS } from "../globals";

export default function Layout({ children }) {
  const user = useSelector(selectUser);

  const avatar = user ? "/avatar.jpg" : null;

  const isLoggedIn = !!user;

  return (
    <>
      <TopNav
        logo={LOGO}
        links={LINKS}
        avatar={avatar}
        loginSection={isLoggedIn ? <LogOut /> : <LoginDialog />}
      />
      <Box sx={{ backgroundColor: "#222222ff" }}>{children}</Box>
    </>
  );
}
