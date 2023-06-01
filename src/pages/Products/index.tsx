import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useContext } from "react";
import { AppContext, Cart, ProductProps } from "../../context/AppContext";
import { toast } from "react-toastify";
import { SnackForm } from "../../components/SnackForm";

function Products() {
  const { user, setCart, isSnackFormOpen, setIsSnackFormOpen, products, setCurrentProduct } = useContext(AppContext);

  function addProduct(nProduct: ProductProps) {
    setCart(
      oldValue => {
        const productAlreadyInCart = oldValue.find(
          (item: Cart) => item.name === nProduct.nome
        )

        if (productAlreadyInCart) {
          return oldValue.map((item: Cart) =>
            item.name === nProduct.nome
              ? { ...productAlreadyInCart, quantity: item.quantity + 1 }
              : item
          )
        }

        return [...oldValue, { name: nProduct.nome, price: nProduct.preco, quantity: 1 }]
      }
    )

    toast.success("Produto adicionado ao carrinho");
  }

  function editProduct(product: ProductProps) {
    setCurrentProduct(product);
    setIsSnackFormOpen(true);
  }

  return (
    <div className={styles.container}>
      {isSnackFormOpen && <SnackForm />}

      <Header />
      <h1 className={styles.TitleSnack}>Snack Bar</h1>
      <div className={styles.rowPopUp}>
      {
        products.map((product, index) => (
          <div key={index} className={styles.comboPopUp}>
            {(user?.role === "manager" || user?.role === "employee") && (
              <button onClick={() => editProduct(product)} className={styles.buttonEditar}>Editar</button>
            )}
            <div className={styles.insidePopUp}>
              <div className={styles.insideHalfLeftPopUp}><img src={product.srcSnack} alt="" /></div>
              <div className={styles.insideHalfRightPopUp}>
                <h1 style={{color:"white"}}>{product.nome}</h1>
                <ul className={styles.ListaCombo}>
                  {product.descricao}
                </ul>
              </div>
            </div>
            <button className={styles.comboPopUpButton} onClick={() => addProduct(product)}>
              <h3 className={styles.TextAddToCart}>Adicionar ao Carrinho</h3>
            </button>
          </div>
        ))
      }

      {
        (user?.role === "manager" || user?.role === "employee") && (
          <div className={styles.comboPopUp}>
            <div className={styles.fieldImageAdd}>
              <img onClick={() => setIsSnackFormOpen(true)} className={styles.addImage} src="/add.png" alt="add" />
            </div>
          </div>
        )
      }

      </div>

      <Footer />
    </div>
  )
}

export { Products }
