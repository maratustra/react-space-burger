import './header.css'
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-links">
          <li className="nav-link">
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </li>
          <li className="nav-link">
            <ListIcon type="primary" />
            <p className="text text_type_main-default">Лента заказов</p>
          </li>
        </ul>
        <div className="logo-container">
          <Logo />
        </div>
        <div className="account">
          <ProfileIcon type="primary" />
          <p className="text text_type_main-default">Личный кабинет</p>
        </div>
      </nav>
    </header>
  )
}