import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function ProductsTable(){
    const {user} = useContext(AppContext);

    const listafuncionarios = [
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
        {
            nome: "João",
            valor: "10,00",
            descricao: "João",
            produto: "João"
        },
    ]

    return (
            <div className={styles.container}>
                <Header />

                <div className={styles.content}>
                    <div className={styles.pageHeader}>
                        <h1 className={styles.title}> Produtos </h1> 
                        <button className={styles.buttonCadastrar}>Cadastrar</button>
                    </div>

                    <div className={styles.productsTableTable}>
                        <div className={styles.productsTableHeader}> 
                            <p>Nome</p>
                            <p>Valor</p>
                            <p>Descrição</p>
                            <p>Produto</p>
                            {user?.role != "manager" && <div><p className="text-edit">Editar</p></div>}
                        </div>
                        
                        {listafuncionarios.map((item, index) => {
                            return (
                                <div key={index} className={styles.productsTableBody} > 
                                    <p>{item.nome}</p>
                                    <p>{item.descricao}</p>
                                    <p>{item.valor}</p>
                                    <p>{item.produto}</p>
                                    {user?.role != "manager" && <button className="btn-edit">Editar</button>}
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