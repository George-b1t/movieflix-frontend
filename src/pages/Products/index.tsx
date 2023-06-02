import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useContext } from "react";
import { AppContext, Cart, ProductProps } from "../../context/AppContext";
import { toast } from "react-toastify";
import { SelectProductForm } from "../../components/SelectProductForm";

function Products() {
  const { user, setCart, isSelectProductFormOpen, setIsSelectProductFormOpen, products, removeEstoque } = useContext(AppContext);

  function addProduct(nProduct: ProductProps) {
    if (user?.role === "manager" || user?.role === "func") {
      toast.error("Funcionários não podem adicionar produtos ao carrinho");
      return;
    }

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

        return [...oldValue, { name: nProduct.nome, price: nProduct.preco, quantity: 1, type: "snack" }]
      }
    )

    toast.success("Produto adicionado ao carrinho");
  }

  return (
    <div className={styles.container}>
      {isSelectProductFormOpen && <SelectProductForm />}

      <Header />
      <h1 className={styles.TitleSnack}>Snack Bar</h1>
      <div className={styles.rowPopUp}>
      {
        products.map((product, index) => (
          <div key={index} className={styles.comboPopUp}>
            {
              (user?.role === "manager" || user?.role === "func") && (
                <div className={styles.fieldImage}>
                  <button onClick={() => {removeEstoque(product.estoqueId || null)}}>Remover</button>
                </div>
              )
            }

            <div className={styles.insidePopUp}>
              <div className={styles.insideHalfLeftPopUp}><img style={{ maxHeight: 215 }} src={product.srcSnack} alt="" /></div>
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
        (user?.role === "manager" || user?.role === "func") && (
          <div className={styles.comboPopUp}>
            <div className={styles.fieldImageAdd}>
              <img onClick={() => setIsSelectProductFormOpen(true)} className={styles.addImage} src="/add.png" alt="add" />
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
