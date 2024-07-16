import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const Protected = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
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

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => <Protected onlyUnAuth={true} component={component} />;
