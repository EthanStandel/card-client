const environment = {
  name: import.meta.env.VITE_ENVIRONMENT_NAME!,
  bffDomain: {
    http: import.meta.env.VITE_BFF_DOMAIN_HTTP!,
    ws: import.meta.env.VITE_BFF_DOMAIN_WS!,
  },
};

export default environment;
