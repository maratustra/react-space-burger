import './App.css'
import BurgerIngredients from './burger-ingredients/burger-ingredients'
import BurgerConstructor from './burger-constructor/burger-constructor'
import Header  from './header/header'

function App() {
  return (
    <div className="main">
      <Header />
      <section className="container">
        <div className="content">
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </section>
    </div>
  );
}

export default App;
