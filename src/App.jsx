import styles from './style.module.css';
import Calculo from './componentes/calculo';

function App() {

  return (
    <main className={styles.main} >
      <h1>Calcular ICMS e ICMS ST</h1>
      <Calculo />
    </main>
  )
}

export default App;
