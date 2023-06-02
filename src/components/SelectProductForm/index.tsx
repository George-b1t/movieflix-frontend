import { useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../context/AppContext";

function SelectProductForm() {
  const { allProducts, setIsSelectProductFormOpen, addEstoque, getProducts, products, getProductsByFilial } = useContext(AppContext);

  useEffect(() => {
    getProducts();
    getProductsByFilial();
  }, []);

  const productsFiltered = allProducts.filter((item) => {
    return !products.some((product) => product.id === item.id);
  });

  function handleClick(id: string) {
    addEstoque(id);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Filme</h1>

        <div className={styles.fieldOptions}>
          {productsFiltered.map((item, index) => {
            return (
              <button onClick={() => handleClick(item.id)} key={index} className={styles.fieldOption}>
                {item.nome}
              </button>
            )
          })}

          <div className={styles.fieldButtons}>
            <input className={styles.closeButton} type="button" value="Fechar" onClick={() => setIsSelectProductFormOpen(false)} />
            {/* <input type="button" value="Enviar" onClick={() => } /> */}
          </div>
        </div>
      </div>

    </div>
  )
}

export { SelectProductForm }
