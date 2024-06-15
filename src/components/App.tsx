import './App.css'
import data from './utils/data.json'
import BurgerIngredients from './burger-ingredients/burger-ingredients'
import BurgerConstructor from './burger-constructor/burger-constructor'
import Header from './app-header/app-header'

function App() {
  return (
    <div className="main">
      <Header />
      <section className="container">
        <div className="content">
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor ingredients={data} />
        </div>
      </section>
    </div>
  )
}

export default App
