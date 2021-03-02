export enum Path {
  Login = '/login',
  Layout = '/',
  Error = '/404',
  Messages = '/messages',
  NoData = '/no-data'
}

export enum RouterName {
  Login = 'Login',
  Layout = 'Layout',
  Error = 'Error',
  Messages = 'Messages',
  NoData = 'NoData'
}

export const RouterPrefix = (routerName: string) => {
  return `Router.${routerName}`;
};
