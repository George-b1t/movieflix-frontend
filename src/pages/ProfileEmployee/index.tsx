import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

function ProfileEmployee(){
    return (
            <div className={styles.container}>
                <Header />
                
            
                <Footer />
            </div>
        )



}

export {ProfileEmployee}
