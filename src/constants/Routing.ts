const ROUTING = {
  LINES: {
    PATH: '/',
    NAME: 'BusLines',
  },
  STOPS: {
    PATH: '/stops',
    NAME: 'BusStops',
  },
} as const;

const ROUTING_NAVIGATION = [
  {
    name: 'BusLines',
    label: 'Bus Lines',
  },
  {
    name: 'BusStops',
    label: 'Stops',
  },
] as const;

export { ROUTING, ROUTING_NAVIGATION };
