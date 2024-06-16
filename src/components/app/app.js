import styles from './app.module.css'
import data from '../utils/data.json'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Header from '../app-header/app-header'

function App() {
  return (
    <div className={styles.main}>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor ingredients={data} />
        </div>
      </main>
    </div>
  )
}

export default App
