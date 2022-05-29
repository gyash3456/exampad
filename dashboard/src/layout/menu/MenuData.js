const menu = [
  {
    icon: "dashlite",
    text: "Dashboard",
    link: "/",
  },
  {
    icon: "tile-thumb",
    text: "Blog",
    active: false,
    subMenu: [
      {
        text: "All Posts",
        link: "/posts",
      },
      {
        text: "Add New Post",
        link: "/new-post",
      },
      {
        text: "Categories",
        link: "/categories",
      },
    ],
  },
  {
    icon: "users",
    text: "Users",
    active: false,
    subMenu: [
      {
        text: "All Users",
        link: "/users",
      },
    ],
  },
];
export default menu;
