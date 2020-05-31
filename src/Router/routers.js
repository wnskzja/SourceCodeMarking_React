import Class from "../components/Class/Class";
import Profile from "../components/Profile/Profile";
import ListRegister from "../components/ListRegister/ListRegister";
import HomeWork from "../components/HomeWork/HomeWork";
import Detail from "../components/DetailHomeWork/DetaiHomeWork";
import Exercise from "../components/Exercise/Exercise";

const routers = [
  {
    path: "/classes",
    name: "Danh sách lớp",
    component: Class,
    layout: "/teacher",
    exact: true,
  },
  {
    path: "/profile",
    name: "Thông tin",
    component: Profile,
    layout: "/teacher",
    exact: true,
  },
  {
    path: "/homework",
    name: "Danh sách bài tập",
    component: HomeWork,
    layout: "/teacher",
    exact: true,
  },
  {
    path: "/homework/:id",
    name: "Bài tập",
    component: Exercise,
    layout: "/teacher",
    exact: true,
  },
  {
    path: "/list",
    name: "Danh sách đăng kí",
    component: ListRegister,
    layout: "/teacher",
    exact: true,
  },
  {
    path: "/myclass",
    name: "Các lớp học của tôi",
    component: Class,
    layout: "/student",
    exact: true,
  },
  {
    path: "/profile",
    name: "Thông tin",
    component: Profile,
    layout: "/student",
    exact: true,
  },
  {
    path: "/list",
    name: "Danh sách lớp",
    component: ListRegister,
    layout: "/student",
    exact: true,
  },
  {
    path: "/homework",
    name: "Danh sách bài tập",
    component: HomeWork,
    layout: "/student",
    exact: true,
  },
  {
    path: "/homework/:id",
    name: "Bài tập",
    component: Detail,
    layout: "/student",
    exact: true,
  },
];

export default routers;
