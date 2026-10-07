import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, message } from "antd";
import {
  UsergroupAddOutlined,
  HomeOutlined,
  AuditOutlined,
  SettingOutlined,
  LoginOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { Children, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { icons } from "antd/es/image/PreviewGroup";
const Header = () => {
  const [current, setCurrent] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location && location.pathname) {
      const allRoutes = ["users", "books"];
      const currentRoute = allRoutes.find(
        (item) => `/${item}` === location.pathname,
      );

      if (currentRoute) {
        setCurrent(currentRoute);
      } else {
        setCurrent("home");
      }
    }
  }, [location]);
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");

    setUser({
      email: "",
      phone: "",
      fullName: "",
      role: "",
      avatar: "",
      id: "",
    });

    message.success("Đăng xuất thành công");
    navigate("/", { replace: true });
  };
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "books",
      icon: <AuditOutlined />,
    },

    ...(!user.id
      ? [
          {
            label: <Link to={"/register"}>Đăng nhập</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),

    ...(user.id
      ? [
          {
            label: `Welcome ${user.fullName}`,
            key: "setting",
            icon: <AliwangwangOutlined />,
            children: [
              {
                label: (
                  <span
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Đăng xuất
                  </span>
                ),
                key: "logout",
              },
            ],
          },
        ]
      : []),
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default Header;
