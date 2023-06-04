import { useContext } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../context/AppContext";

function ViewOrderForm() {
  const { setIsViewOrderFormOpen, currentOrder } = useContext(AppContext);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Minha Compra</h1>

        <div className={styles.fieldInputs}>
          
          <div className={styles.fieldToScroll}>

            <p>ID da Compra: <span>{currentOrder?.id}</span></p>
            <p>Data: <span>{currentOrder?.data}</span></p>
            <p>Total: <span>R$ {currentOrder?.value}</span></p>
            {currentOrder?.produtos.map((item: any) => {
              return (
                <div className={styles.profileBody}>
                  <p>Snack: {item.nome}</p>
                  <p>R$ {item.preco}</p>
                </div>
              )
            })}
            {currentOrder?.ingressos.map((item: any) => {
              return (
                <div className={styles.profileBody}>
                  <p>Ingresso: {item.nome}</p>
                  <p>Cadeira: {item.cadeira}</p>
                  <p>R$ {item.preco}</p>
                </div>
              )
            })}
          </div>

          <input className={styles.closeButton} type="button" value="Fechar" onClick={() => setIsViewOrderFormOpen(false)} />
        </div>
      </div>

    </div>
  )
}

export { ViewOrderForm }
