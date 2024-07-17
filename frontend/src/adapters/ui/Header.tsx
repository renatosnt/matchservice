import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { convertFieldResponseIntoMuiTextFieldProps } from "@mui/x-date-pickers/internals";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    handleClose();
    navigate("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("Raw user from localStorage:", user);
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log("Parsed user object:", parsedUser);

        if (parsedUser && parsedUser.type) {
          setUserType(parsedUser.type);
          console.log("User type set to:", parsedUser.type);
        } else {
          console.warn("Parsed user does not have a type property.");
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    } else {
      console.warn("No user found in localStorage.");
    }
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Configurações da Conta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            data-testid="profile-icon"
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        data-testid="account-menu"
      >
        <MenuItem
          onClick={handleClose}
          component={Link}
          to={userType === "Customer" ? "/profile" : "/account"}
          data-testid="my-profile-option"
        >
          <Avatar /> Meu Perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} data-testid="logout-option">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
