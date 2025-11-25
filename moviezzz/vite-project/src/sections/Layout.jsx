import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import TopNav from "./TopNav";
import LoginDialog from "../components/userComps/LoginDialog";
import LogOut from "../components/userComps/LogOut";

import { selectUser } from "../redux/slices/user";
import { logo, links } from "../globals";

export default function Layout({ children }) {
  const user = useSelector(selectUser);

  const avatar = null; //לממש בהמשך

  const isLogedin = !!user;
  
  let loginSection = <LoginDialog />;

  if (isLogedin) {
    loginSection = <LogOut/>;
  }

  return (
    <>
      <TopNav
        logo={logo}
        links={links}
        avatar={avatar}
        loginSection={loginSection}
      />
      <Box sx={{ backgroundColor: "#222222ff" }}>{children}</Box>
    </>
  );
}
