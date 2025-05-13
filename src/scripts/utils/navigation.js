export default function navigateTo(route) {
    window.location.hash = route;
    window.history.replaceState(null, "", window.location.pathname);
}