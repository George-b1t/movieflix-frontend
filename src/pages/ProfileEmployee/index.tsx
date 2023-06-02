import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function ProfileEmployee(){
    const { user, setUser } = useContext(AppContext);

    return (
            <div className={styles.container}>
                <Header />
                
                    <section>

                        <div className={styles.guga}>
                            <h2>GUGA</h2>
                        </div>

                        <article>
                            {user?.role === "manager" && <a href="">Funcionários</a>}
                            <a href="/#/productsTable">Produtos</a>
                            <a href="/#/movieTable">Filmes</a>
                        </article>

                        <a href="/#/" className={styles.logout} onClick={() => setUser(null)}>Logout</a>

                    </section>
            
                <Footer />
            </div>
        )



}

export {ProfileEmployee}
