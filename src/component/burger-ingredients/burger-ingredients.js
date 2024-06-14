import './burger-ingredients.css'
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import bun1 from '../../images/bun-01.png'
import bun2 from '../../images/bun-02.png'
import sauce1 from '../../images/sauce-01.png'
import sauce2 from '../../images/sauce-02.png'
import sauce3 from '../../images/sauce-03.png'
import sauce4 from '../../images/sauce-04.png'

export default function BurgerIngredients() {
  return (
    <div className="burger-ingredients">
    <p className="text text_type_main-large pt-10 pb-5">
      Соберите бургер
    </p>
    <div className='tab-container pb-10'>
      <Tab value="one" active={'one'} className="tab">
        Булки
      </Tab>
      <Tab value="two" className="tab">
        Соусы
      </Tab>
      <Tab value="three" className="tab">
        Начинки
      </Tab>
    </div>
    <div className='ingredients'>
      <div>
        <p className="ingredient-header text text_type_main-medium">
          Булки
        </p>
        <ul className='ingredients-list mt-6 mb-10 pl-0'>
          <li className='ingredient-item ml-4'>
            <div class="header-сounter">
              <Counter count={1} size="default" extraClass="counter" />
            </div>
            <div className='pl-4 pr-4'>
              <img src={bun1} alt="Краторная булка N-200i"/>
            </div>
            <div className='price'>
              <Counter count={20} size="default" />
              <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small pb-15">
              Краторная булка N-200i
            </p>
          </li>
          <li className='ingredient-item'>
            <div className='pl-4 pr-4'>
              <img src={bun2} alt="Флюоресцентная булка R2-D3"/>
            </div>
            <div className='price'>
              <Counter count={20} size="default" extraClass="small-counter" />
              <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small pb-15">
              Флюоресцентная булка R2-D3
            </p>
          </li>
        </ul>
      </div>
      <div>
        <p className="text text_type_main-medium">
          Соусы
        </p>
        <ul className='ingredients-list mt-6 mb-8 pl-0'>
          <li className='ingredient-item ml-4'>
            <div className='pl-4 pr-4'>
              <img src={sauce1} alt="Соус Spicy-X"/>
            </div>
            <div className='price'>
              <Counter count={30} size="default" />
              <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small pb-15">
              Соус Spicy-X
            </p>
          </li>
          <li className='ingredient-item'>
            <div className='pl-4 pr-4'>
              <img src={sauce2} alt="Соус фирменный Space Sauce"/>
            </div>
            <div className='price'>
              <Counter count={30} size="default" extraClass="small-counter" />
              <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small pb-15">
              Соус фирменный Space Sauce
            </p>
          </li>
        </ul>
        <ul className='ingredients-list pl-0'>
          <li className='ingredient-item ml-4'>
            <div class="header-сounter">
              <Counter count={1} size="default" extraClass="counter" />
            </div>
            <div className='pl-4 pr-4'>
              <img src={sauce3} alt="Соус традиционный галактический"/>
            </div>
            <div className='price'>
              <Counter count={30} size="default" extraClass="small-counter" />
              <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small pb-15">
              Соус традиционный галактический
            </p>
          </li>
          <li className='ingredient-item'>
            <div className='pl-4 pr-4'>
              <img src={sauce4} alt="Соус фирменный Space Sauce"/>
            </div>
            <div className='price'>
              <Counter count={30} size="default" extraClass="small-counter" />
              <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small pb-15">
              Соус фирменный Space Sauce
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}