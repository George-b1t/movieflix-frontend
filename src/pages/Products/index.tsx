import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

interface Product {
  name: string;
  price: number;
  content: string[];
  image: string;
}

function Products() {
  const { setCart } = useContext(AppContext);

  function addProduct() {
    setCart(
      oldValue => [...oldValue, {
        name: "Combo Baldão",
        price: 20.00,
        quantity: 2
      }]
    )
  }

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.TitleSnack}>Snack Bar</h1>

      {/* Linha 1 de Produtos */}
      <div className={styles.rowPopUp}>

        {/* PopUp Esquerda */}
        <div className={styles.comboPopUp}>
          {/* PopUp Cima Esquerda */}
          <div className={styles.insidePopUp}>

          {/* Metade da Esquerda do PopUp Cima Esquerda */}
            <div className={styles.insideHalfLeftPopUp}><img src="/ProductsImages/combo_baldao.png" alt="" /></div>

          {/* Metade da Direita do PopUp Cima Esquerda */}    
            <div className={styles.insideHalfRightPopUp}>

              <h1 style={{color:"white"}}>Combo Baldão</h1>
              
              <ul className={styles.ListaCombo}>
                <li>1 Baldão de Pipoca</li>
                <li>2 Refrigerantes Grande</li>
              </ul>

            </div>

          </div>
          
          {/* Botão Laranja PopUp Esquerda */}
          <button onClick={addProduct} className={styles.comboPopUpButton}>

          <h3 className={styles.TextAddToCart}>Adicionar ao Carrinho</h3>

          </button>

        </div>

        {/* PopUp Direita */}
        <div className={styles.comboPopUp}>

          {/* PopUp Cima Direita */}
           <div className={styles.insidePopUp}>

           {/* Metade da Esquerda do PopUp Cima Direita */}
            <div className={styles.insideHalfLeftPopUp}><img src="/ProductsImages/combo_duplo.png" alt="" /></div>

           {/* Metade da Direita do PopUp Cima Direita */}    
            <div className={styles.insideHalfRightPopUp}>

            <h1 style={{color:"white"}}>Combo Duplo</h1>
              
              <ul className={styles.ListaCombo}>
                <li>1 Pipoca Grande</li>
                <li>2 Refrigerantes Grande</li>
              </ul>

            </div>
            
          </div>

          {/* Botão Laranja PopUp Esquerda */}
          <button className={styles.comboPopUpButton}>

          <h3 className={styles.TextAddToCart}>Adicionar ao Carrinho</h3>

          </button>

        </div>

      </div>

      {/* Linha 2 de Produtos */}
      <div className={styles.rowPopUp}>

        {/* PopUp Esquerda */}
        <div className={styles.comboPopUp}>

          {/* PopUp Meio Esquerda */}
          <div className={styles.insidePopUp}>

            {/* Metade da Esquerda do PopUp Meio Esquerda*/}
            <div className={styles.insideHalfLeftPopUp}><img src="/ProductsImages/combo_super.png" alt="" /></div>

            {/* Metade da Direita do PopUp Meio Esquerda*/}  
            <div className={styles.insideHalfRightPopUp}>

            <h1 style={{color:"white"}}>Combo Super</h1>
              
              <ul className={styles.ListaCombo}>
                <li>1 Pipoca Grande</li>
                <li>1 Refrigerantes Super</li>
              </ul>

            </div>

          </div>
          
          {/* Botão Laranja PopUp Esquerda */}
          <button className={styles.comboPopUpButton}>

          <h3 className={styles.TextAddToCart}>Adicionar ao Carrinho</h3>

          </button>

        </div>

        {/* PopUp Direita */}
        <div className={styles.comboPopUp}>

          {/* PopUp Meio Direita */}
           <div className={styles.insidePopUp}>
          
            {/* Metade da Esquerda do PopUp Meio Direita*/}
            <div className={styles.insideHalfLeftPopUp}><img src="/ProductsImages/combo_grande.png" alt="" /></div>

            {/* Metade da Direita do PopUp Meio Direita*/}  
            <div className={styles.insideHalfRightPopUp}>

            <h1 style={{color:"white"}}>Combo Grande</h1>
              
              <ul className={styles.ListaCombo}>
                <li>1 Pipoca Grande</li>
                <li>1 Refrigerantes Grande</li>
              </ul>


            </div>

          </div>

          {/* Botão Laranja PopUp Direita */}
          <button className={styles.comboPopUpButton}>

          <h3 className={styles.TextAddToCart}>Adicionar ao Carrinho</h3>

          </button>

        </div>

      </div>


      {/* Linha 3 de Produtos */}
      <div className={styles.rowPopUp}>

        {/* PopUp Esquerda */}
        <div className={styles.comboPopUp}>

          {/* PopUp Baixo Esquerda */}
          <div className={styles.insidePopUp}>

          {/* Metade da Esquerda do PopUp Baixo Esquerda*/}
            <div className={styles.insideHalfLeftPopUp}><img src="/ProductsImages/combo_medio.png" alt="" /></div>
            
          {/* Metade da Direita do PopUp Baixo Esquerda*/}      
            <div className={styles.insideHalfRightPopUp}>

            <h1 style={{color:"white"}}>Combo Medio</h1>
              
              <ul className={styles.ListaCombo}>
                <li>1 Pipoca Media</li>
                <li>1 Refrigerantes Medio</li>
              </ul>

            </div>

          </div>
          
          {/* Botão Laranja PopUp Esquerda */}
          <button className={styles.comboPopUpButton}>

            <h3 className={styles.TextAddToCart}>Adicionar ao Carrinho</h3>
          </button>

        </div>

        {/* PopUp Direita */}
        <div className={styles.comboPopUp}>

          {/* PopUp Baixo Direita */}
           <div className={styles.insidePopUp}>

            {/* Metade da Esquerda do PopUp Baixo Direita*/}
            <div className={styles.insideHalfLeftPopUp}><img src="/ProductsImages/combo_kids.png" alt="" /></div>

            {/* Metade da Direita do PopUp Baixo Direita*/}
            <div className={styles.insideHalfRightPopUp}>

              <h1 style={{color:"white"}}>Combo Kids</h1>
              
              <ul className={styles.ListaCombo}>
                <li>1 Pipoca Kids</li>
                <li>1 Suco Kapo</li>
              </ul>

            </div>

          </div>
          
          {/* Botão Laranja PopUp Direita */}
          <button className={styles.comboPopUpButton}>

          <h3 className={styles.TextAddToCart}>Adicionar ao Carrinho</h3>

          </button>

        
        </div>

      </div>

      <Footer />
    </div>
  )
}

export { Products }
