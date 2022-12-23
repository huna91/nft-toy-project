import React, { useState } from "react";
import { Header_wrap, Header_wrap_left, Header_wrap_right } from "./styledCom";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { Navigate, useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Avatar,
  alpha,
  styled,
  Box,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";

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
  const navi = useNavigate();

  function move_page(page) {
    navi(page);
  }

  const handleChange = (_event, _newValue) => {
    setValue(_newValue);
  };

  const ThemeChange = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };
  console.log(isLogin);

  // 개인 아바타 컨트롤
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    navi(e);
  };

  return (
    <Header_wrap>
      <Header_wrap_left>
        <div>
          <a
            onClick={() => {
              move_page("/");
            }}
            style={{ cursor: "pointer" }}
          >
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
              <Avatar />
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Dashboard
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem
                  onClick={() => {
                    handleClose("/mypage");
                  }}
                >
                  My Pages
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose("2");
                  }}
                >
                  My account
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose("3");
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
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
