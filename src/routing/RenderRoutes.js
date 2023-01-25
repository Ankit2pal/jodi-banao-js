import { useRoutes } from 'react-router-dom';
import RoutesConfig from './routingConfig';

function RenderRoutes() {
  return useRoutes(RoutesConfig);
}

export default RenderRoutes;
