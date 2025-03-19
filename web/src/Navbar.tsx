import { NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import {
  IconListLetters,
  IconCirclePlusFilled,
  IconPasswordUser,
} from "@tabler/icons-react";

const navItems = [
  {
    to: "create-collection",
    label: "Create Collection",
    icon: IconCirclePlusFilled,
  },
  {
    to: "collections",
    label: "Collections",
    icon: IconListLetters,
  },
  {
    to: "my-collections",
    label: "My Collections",
    icon: IconPasswordUser,
  },
];

export function Navbar(): React.ReactElement {
  const location = useLocation();

  return (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          active={location.pathname === `/${item.to}`}
          component={Link}
          to={item.to}
          label={item.label}
          leftSection={<item.icon />}
        ></NavLink>
      ))}
    </>
  );
}
