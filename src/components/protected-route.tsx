import { useAppSelector } from "../services/store";
import { Navigate, useLocation } from "react-router-dom";

interface IProtectedRouteElement {
  onlyUnAuth?: boolean;
  component: JSX.Element;
}

interface IComponent {
  component: JSX.Element;
}

export const ProtectedRouteElement = ({ onlyUnAuth = false, component }: IProtectedRouteElement): JSX.Element | null => {
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
  const user = useAppSelector((store) => store.user.user);
  const location = useLocation();

  // isAuthChecked indicates that the token check has run; we only care that it happened.
  // Returning null here avoids a flash before the check completes.
  if (!isAuthChecked) {
    return null;
  }

  // Authenticated user hitting an "unauth-only" route → bounce to where they came from (or home).
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  // Unauthenticated user hitting a protected route → send to login, remember origin.
  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }: IComponent): JSX.Element | null => <ProtectedRouteElement onlyUnAuth={true} component={component} />;
