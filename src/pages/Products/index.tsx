import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useContext, useEffect } from "react";
import { AppContext, Cart, ProductProps } from "../../context/AppContext";
import { toast } from "react-toastify";
import { SelectProductForm } from "../../components/SelectProductForm";

function Products() {
  const { user, setCart, isSelectProductFormOpen, setIsSelectProductFormOpen, products, removeEstoque, getProductsByFilial, currentFilial } = useContext(AppContext);

  useEffect(() => {
    getProductsByFilial();
  }, [currentFilial])

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
              ? { ...productAlreadyInCart, quantity: item.quantity + 1, productId: nProduct.id }
              : item
          )
        }

        return [...oldValue, { name: nProduct.nome, price: nProduct.preco, quantity: 1, type: "snack", productId: nProduct.id }]
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
                  <li>{product.descricao}</li>
                  <li>R$ {product.preco}</li>
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
