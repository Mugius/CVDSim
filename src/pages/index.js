

export default [
  {
    path: '/',
    exact: true,
    component: () => import('../components/home'),
    seo: {
      title: 'Home',
      description: 'CVD Simulator'
    },
  },
];
