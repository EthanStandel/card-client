const environment = {
  name: process.env.REACT_APP_ENVIRONMENT_NAME!,
  bffDomain: {
    http: process.env.REACT_APP_BFF_DOMAIN_HTTP!,
    ws: process.env.REACT_APP_BFF_DOMAIN_WS!,
  },
};

export default environment;
