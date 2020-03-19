import IndexRoutes from './pages/index';;

export default class Routes {
  // eslint-disable-next-line
  apply(routeHandler) {
    const routes = [
      ...IndexRoutes,
    ];

    routeHandler.hooks.initRoutes.tapPromise('AppRoutes', async () => {
      routeHandler.addRoutes(routes);
    });
  }
}
