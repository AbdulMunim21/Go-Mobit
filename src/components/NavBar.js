import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navigator(props) {
  const { ...other } = props;
  const [AllUserActive, setAllUserActive] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    {
      id: "Navigation Side Bar",
      children: [
        {
          id: "All Users",
          icon: <PeopleIcon />,
          active: AllUserActive,
        },

        { id: "Add Users", icon: <AddIcon />, active: !AllUserActive },
      ],
    },
  ];

  const item = {
    py: "2px",
    px: 3,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover, &:focus": {
      bgcolor: "rgba(255, 255, 255, 0.08)",
    },
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem
                disablePadding
                key={childId}
                onClick={() => {
                  setAllUserActive(!AllUserActive);
                  console.log(location.pathname);
                  if (location.pathname === "/" && childId === "All Users") {
                  } else if (
                    location.pathname === "/" &&
                    childId === "Add Users"
                  ) {
                    navigate("/AddUser");
                  } else {
                    navigate("/");
                  }
                }}
              >
                <ListItemButton selected={active} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
