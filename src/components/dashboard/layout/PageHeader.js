import useRoutes from "../../../hooks/useRoutes";
import RoutePath from "./RoutePath";

const PageHeader = ({ name, hint, currentName }) => {
  const { capitalizedRoutes } = useRoutes();
  const currentRoute = capitalizedRoutes[capitalizedRoutes.length - 1];
  return (
    <div className="page_header">
      <h1 className="">{name || currentRoute}</h1>
      <RoutePath currentName={currentName} hint={hint || ""} />
    </div>
  );
};

export default PageHeader;
