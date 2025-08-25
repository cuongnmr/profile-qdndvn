import CreatePage from "@/pages/create-page";
import UsersListPage from "@/pages/users/users-list-page";
import { createRoute } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";
import { RootRoute } from "./__root";
import UserDetailsPage from "@/pages/user-details/user-details-page";
import CLCTPage from "@/pages/clct/clct-page";

// TODO: Steps to add a new route:
// 1. Create a new page component in the '../pages/' directory (e.g., NewPage.tsx)
// 2. Import the new page component at the top of this file
// 3. Define a new route for the page using createRoute()
// 4. Add the new route to the routeTree in RootRoute.addChildren([...])
// 5. Add a new Link in the navigation section of RootRoute if needed

// Example of adding a new route:
// 1. Create '../pages/NewPage.tsx'
// 2. Import: import NewPage from '../pages/NewPage';
// 3. Define route:
//    const NewRoute = createRoute({
//      getParentRoute: () => RootRoute,
//      path: '/new',
//      component: NewPage,
//    });
// 4. Add to routeTree: RootRoute.addChildren([HomeRoute, NewRoute, ...])
// 5. Add Link: <Link to="/new">New Page</Link>

export const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: HomePage,
  beforeLoad() {
    return { title: "Tổng quan" };
  },
});

export const CreatePageRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/create",
  component: CreatePage,
  beforeLoad() {
    return { title: "Thêm trích ngang" };
  },
});

export const UserListRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/users",
  component: UsersListPage,
  beforeLoad() {
    return { title: "Danh sách quân nhân" };
  },
});

export const UserDetailsRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/user-detail/$userId",
  component: UserDetailsPage,
  beforeLoad() {
    return { title: "Thông tin quân nhân" };
  },
});

export const CLCTRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/clct",
  component: CLCTPage,
  beforeLoad() {
    return { title: "Chất lượng chính trị" };
  },
});

export const rootTree = RootRoute.addChildren([
  HomeRoute,
  CreatePageRoute,
  UserListRoute,
  UserDetailsRoute,
  CLCTRoute,
]);
