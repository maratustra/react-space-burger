import "./burger-ingredients.css"
import PropTypes from "prop-types"
import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { ingredientType } from "../utils/types"

function BurgerIngredients({ ingredients }) {
  const buns = ingredients.filter(ingredient => ingredient.name.toLowerCase().includes("булка"))
  const sauces = ingredients.filter(ingredient => ingredient.name.toLowerCase().includes("соус"))
  const mains = ingredients.filter(
    ingredient => !ingredient.name.toLowerCase().includes("булка") && !ingredient.name.toLowerCase().includes("соус")
  )

  return (
    <section className="burger-ingredients">
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
        <section>
          <p className="ingredient-header text text_type_main-medium">Булки</p>
          <ul className="ingredients-list mt-6 mb-15 pl-0">
            {buns.map((ingredient, index) => (
              <li key={ingredient._id} className={`ingredient-item ${index % 2 === 0 ? "ml-4" : ""}`}>
                {index === 0 && (
                  <div className="header-counter">
                    <Counter count={1} size="default" extraClass="counter" />
                  </div>
                )}
                <div className="pl-4 pr-4">
                  <img src={ingredient.image} alt="Булка" />
                </div>
                <div className="price">
                  <Counter count={ingredient.price} size="default" />
                  <CurrencyIcon type="primary" />
                </div>
                <p className="ingredient-description text text_type_main-small">
                  {ingredient.name}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="ingredient-header text text_type_main-medium">Соусы</p>
          <ul className="ingredients-list mt-6 mb-15 pl-0">
            {sauces.map((ingredient, index) => (
              <li key={ingredient._id} className={`ingredient-item ${index % 2 === 0 ? "ml-4" : ""}`}>
                {index === 2 && (
                  <div className="header-counter">
                    <Counter count={1} size="default" extraClass="counter" />
                  </div>
                )}
                <div className="pl-4 pr-4">
                  <img src={ingredient.image} alt="Соус"/>
                </div>
                <div className="price">
                  <Counter count={ingredient.price} size="default" />
                  <CurrencyIcon type="primary" />
                </div>
                <p className="ingredient-description text text_type_main-small">
                  {ingredient.name}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="ingredient-header text text_type_main-medium">Начинки</p>
          <ul className="ingredients-list mt-6 mb-15 pl-0">
            {mains.map(ingredient => (
              <li key={ingredient._id} className="ingredient-item">
                <div className="pl-4 pr-4">
                  <img src={ingredient.image} alt="Начинка" />
                </div>
                <div className="price">
                  <Counter count={ingredient.price} size="default" />
                  <CurrencyIcon type="primary" />
                </div>
                <p className="ingredient-description text text_type_main-small">
                  {ingredient.name}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
}

export default BurgerIngredients
