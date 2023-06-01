import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

function ProfileEmployee(){
    return (
            <div className={styles.container}>
                <Header />
                
                    <section>

                        <div className={styles.guga}>
                            <h2>GUGA</h2>
                        </div>

                        <article>
                            <a href="">Funcionários</a>
                            <a href="">Produtos</a>
                            <a href="">Filmes</a>
                        </article>

                        <button>Logout</button>

                    </section>
            
                <Footer />
            </div>
        )



}

export {ProfileEmployee}
