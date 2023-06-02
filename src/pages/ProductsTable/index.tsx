import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useContext, useEffect } from "react";
import { AppContext, ProductProps } from "../../context/AppContext";
import { SnackForm } from "../../components/SnackForm";

function ProductsTable(){
    const { user, setIsSnackFormOpen, isSnackFormOpen, setCurrentProduct, getProducts, allProducts } = useContext(AppContext);

    useEffect(() => {
        if (!user || (user.role !== "manager" && user.role !== "func")) {
            window.location.href = "/#/";
            return;
        }
        
        getProducts();
    }, [])

    function editProduct(product: ProductProps) {
        setCurrentProduct(product);
        setIsSnackFormOpen(true);
    }

    return (
            <div className={styles.container}>
                <Header />
                {isSnackFormOpen && <SnackForm />}

                <div className={styles.content}>
                    <div className={styles.pageHeader}>
                        <h1 className={styles.title}> Produtos </h1> 
                        <button  onClick={() => setIsSnackFormOpen(true)} className={styles.buttonCadastrar}>Cadastrar</button>
                    </div>

                    <div className={styles.productsTableTable}>
                        <div className={styles.productsTableHeader}> 
                            <p>Nome</p>
                            <p>Valor</p>
                            <p>Descrição</p>
                            <p>Produto</p>
                            <p className="text-edit">Editar</p>
                        </div>
                        
                        {allProducts.map((item, index) => {
                            return (
                                <div key={index} className={styles.productsTableBody} > 
                                    <p>{item.nome}</p>
                                    <p>{item.preco}</p>
                                    <p>{item.descricao}</p>
                                    <p>{item.srcSnack}</p>
                                    <button onClick={() => editProduct(item)} className="btn-edit">Editar</button>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
        
                <Footer />
            </div>
        )



}

export {ProductsTable}