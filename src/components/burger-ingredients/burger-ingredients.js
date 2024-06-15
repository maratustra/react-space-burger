import './burger-ingredients.css'
import PropTypes from 'prop-types'
import {
  Counter,
  CurrencyIcon,
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientType } from '../utils/types'

const typeNames = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки'
}

export default function BurgerIngredients({ ingredients }) {
  return (
    <div className="burger-ingredients">
      <p className="text text_type_main-large pt-10 pb-5">Соберите бургер</p>
      <div className="tab-container pb-10">
        <Tab value="one" active={"one"} className="tab">
          Булки
        </Tab>
        <Tab value="two" className="tab">
          Соусы
        </Tab>
        <Tab value="three" className="tab">
          Начинки
        </Tab>
      </div>
      <div className="ingredients">
        {Object.keys(typeNames).map((type) => (
          <section key={type}>
            <p className="ingredient-header text text_type_main-medium">
              {typeNames[type]}
            </p>
            <ul className="ingredients-list mt-6 mb-10 pl-0">
              {ingredients
                .filter((ingredient) => ingredient.type === type)
                .map((ingredient, index) => (
                  <li key={ingredient._id} className="ingredient-item ml-4">
                    {(type === 'bun' && index === 0) || (type === 'sauce' && index === 2) ? (
                      <div className="header-counter">
                        <Counter count={1} size="default" extraClass="counter" />
                      </div>
                    ) : null}
                    <div className="pl-4 pr-4">
                      <img src={ingredient.image} alt={ingredient.name} />
                    </div>
                    <div className="price">
                      <Counter count={20} size="default" />
                      <CurrencyIcon type="primary" />
                    </div>
                    <p className="ingredient-description text text_type_main-small pb-15">
                      {ingredient.name}
                    </p>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired
}

