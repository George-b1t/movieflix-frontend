import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

interface Product {
  name: string;
  price: number;
  content: string[];
  image: string;
}

function Products() {
  const products = [
    {
      name: "Combo Baldão",
      price: 20.00,
      content: [
        "1 Baldão de Pipoca",
        "2 Refrigerantes Grande"
      ],
      image: "/ProductsImages/combo_baldao.png"
    },
    {
      name: "Combo Duplo",
      price: 20.00,
      content: [
        "1 Pipoca Grande",
        "2 Refrigerantes Grande"
      ],
      image: "/ProductsImages/combo_duplo.png"
    },
    {
      name: "Combo Super",
      price: 20.00,
      content: [
        "1 Pipoca Grande",
        "1 Refrigerantes Super"
      ],
      image: "/ProductsImages/combo_super.png"
    },
    {
      name: "Combo Grande",
      price: 20.00,
      content: [
        "1 Pipoca Grande",
        "1 Refrigerantes Grande"
      ],
      image: "/ProductsImages/combo_grande.png"
    },
  ]

  const { setCart } = useContext(AppContext);

  function addProduct(nProduct: Product) {
    setCart(
      oldValue => {
        const productAlreadyInCart = oldValue.find(
          (item: any) => item.name === nProduct.name
        )

        if (productAlreadyInCart) {
          return oldValue.map((item: any) =>
            item.name === nProduct.name
              ? { ...productAlreadyInCart, quantity: item.quantity + 1 }
              : item
          )
        }

        return [...oldValue, { name: nProduct.name, price: nProduct.price, quantity: 1 }]
      }
    )

    toast.success("Produto adicionado ao carrinho");
  }

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.TitleSnack}>Snack Bar</h1>
      <div className={styles.rowPopUp}>
      {
        products.map((product, index) => (
          <div key={index} className={styles.comboPopUp}>
            <div className={styles.insidePopUp}>
              <div className={styles.insideHalfLeftPopUp}><img src={product.image} alt="" /></div>
              <div className={styles.insideHalfRightPopUp}>
                <h1 style={{color:"white"}}>{product.name}</h1>
                <ul className={styles.ListaCombo}>
                  {
                    product.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <button className={styles.comboPopUpButton} onClick={() => addProduct(product)}>
              <h3 className={styles.TextAddToCart}>Adicionar ao Carrinho</h3>
            </button>
          </div>
        ))
      }
      <div className={styles.comboPopUp}>
        <div className={styles.fieldImageAdd}>
          <img className={styles.addImage} src="/add.png" alt="add" />
        </div>
      </div>

      </div>

      <Footer />
    </div>
  )
}

export { Products }
