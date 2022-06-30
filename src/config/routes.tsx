import { RouteRecordRaw } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    next?: string;
    from?: string;
  }
}
const _import = (path: string, suffix = "tsx") => () =>import(`../${path}.${suffix}`);

export const routes: RouteRecordRaw[] = [
  {
    path: "/welcome",
    component: _import("views/WelcomePage/inedx"),
    children: [
      {
        path: "/",
        redirect: "/welcome/1",
      },
      {
        path: "1",
        components: {
          main: _import("layout/Welcome/Frist"),
          footer: _import("layout/Welcome/welcomeActions"),
        },
        meta: { next: "/welcome/2", from: "" },
        props: {
          footer: {
            next: "/welcome/2",
          },
        },
      },
      {
        path: "2",
        components: {
          main: _import("layout/Welcome/Second"),
          footer: _import("layout/Welcome/welcomeActions"),
        },
        meta: { next: "/welcome/3", from: "/welcome/1" },
        props: {
          footer: {
            next: "/welcome/3",
          },
        },
      },
      {
        path: "3",
        components: {
          main: _import("layout/Welcome/Third"),
          footer: _import("layout/Welcome/welcomeActions"),
        },
        meta: { next: "/welcome/4", from: "/welcome/2" },
        props: {
          footer: {
            next: "/welcome/4",
          },
        },
      },
      {
        path: "4",
        components: {
          main: _import("layout/Welcome/Forth"),
          footer: _import("layout/Welcome/welcomeActions"),
        },
        meta: { next: "", from: "/welcome/3" },
        props: {
          footer: {
            next: "",
          },
        },
      },
    ],
  },
  {
    path: "/",
    redirect: "/welcome",
  },
  {
    path: "/start",
    component: _import("views/StartPage/index"),
  },
  {
    path: "/items",
    component: _import("views/ItemPage"),
    children: [
      { path: "/", component: _import("layout/Item/ItemList") },
      { path: "create", component: _import("layout/Item/ItemCreate") },
    ],
  },
];
