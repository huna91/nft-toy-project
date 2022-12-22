import React, { useState } from "react";
import { Header_wrap, Header_wrap_left, Header_wrap_right } from "./styledCom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { Navigate, useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// dark모드 switch
const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

function LinkTab(props) {
  const navi = useNavigate();
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
        navi(`${props.href}`);
      }}
      {...props}
    />
  );
}

const Header = ({ isLogin, theme, setTheme, login }) => {
  const [backColor, setBackColor] = useState("dark");
  const [value, setValue] = useState(null);
  const handleChange = (_event, _newValue) => {
    setValue(_newValue);
  };

  const ThemeChange = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };
  console.log(isLogin);
  return (
    <Header_wrap>
      <Header_wrap_left>
        <div>
          <a href="/">
            <img src="./images/rwd_logo.png" style={{ width: "70px" }} />
          </a>
        </div>
        <Box sx={{ width: "100%", marginLeft: "50px;" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Mint" href="/minting" />
            <LinkTab label="Market Place" href="/shop" />
            <LinkTab label="Contact" />
          </Tabs>
        </Box>
      </Header_wrap_left>
      <Header_wrap_right>
        <form
          class="search-form-wrapper"
          action="#"
          style={{ display: "flex" }}
        >
          <input
            type="search"
            placeholder="Search Here"
            style={{ height: "30px" }}
          />
          <div>
            <button>
              찾기
              <i class="feather-search"></i>
            </button>
          </div>
        </form>

        {isLogin ? (
          <div>
            <div class="icon-box">
              <a>Wallet connected</a>
            </div>
          </div>
        ) : (
          <div>
            <div class="icon-box">
              <button onClick={login}>Wallet connect</button>
            </div>
          </div>
        )}

        <div class="notification_badge">
          <Switch {...label} defaultChecked onClick={ThemeChange} />
        </div>

        <div id="my_switcher" class="my_switcher setting-option">
          {backColor == "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
        </div>
      </Header_wrap_right>
    </Header_wrap>
  );
};

export default Header;
