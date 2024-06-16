import './burger-constructor.css'
import PropTypes from 'prop-types'
import {
  Button,
  Counter,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientType } from '../utils/types'

function BurgerConstructor({ ingredients }) {
  const burgerBun = ingredients[0]

  return (
    <section className="burger-components">
      <div className="main-block-components">
      <div className="constructor-fixed-top mt-25">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${burgerBun.name} (верх)`}
          price={burgerBun.price}
          thumbnail={burgerBun.image}
        />
      </div>
      <div className="constructor-wrapper">
        <div
          className="main-constructor"
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {ingredients
            .slice(1)
            .filter(ingredient => !ingredient.name.toLowerCase().includes('булка'))
            .map(ingredient => (
            <div key={ingredient._id} className="constructor-item">
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="constructor-fixed-bottom">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${burgerBun.name} (низ)`}
          price={burgerBun.price}
          thumbnail={burgerBun.image}
        />
      </div>
      </div>
      <div className="total pt-10">
        <div className="total-price">
          <Counter count={610} size="default" />
          <CurrencyIcon type="primary" size="36" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired
}

export default BurgerConstructor
