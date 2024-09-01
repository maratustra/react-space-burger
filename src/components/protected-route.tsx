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

  // isAuthChecked показывает, что проверка токена произведена
  // Важно только, что сам факт проверки имел место
  // Здесь возвращается просто null для экономии времени
  if (!isAuthChecked) {
    return null;
  }

  // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  // Пользователь не авторизован, но роут предназначен для авторизованного пользователя
  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }: IComponent): JSX.Element | null => <ProtectedRouteElement onlyUnAuth={true} component={component} />;
