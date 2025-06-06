import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";
import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import AddRestaurantPage from "../pages/addRestaurant/add-restaurant-page";
import NotFoundPage from "../pages/notFound/not-found-page";
import ListStoredPage from "../pages/listStored/list-stored-page";
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';

const routes = {
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/': () => checkAuthenticatedRoute(new HomePage()),
  '/about': () => checkAuthenticatedRoute(new AboutPage()),
  '/addrestaurant': () => checkAuthenticatedRoute(new AddRestaurantPage()),
  '/liststored': () => checkAuthenticatedRoute(new ListStoredPage()),
};

export function resolveRoute(path) {
  return routes[path] ? routes[path]() : new NotFoundPage();
}

export default routes;
