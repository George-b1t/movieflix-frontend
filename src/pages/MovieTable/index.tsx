import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { MovieForm } from "../../components/MovieForm";

function MovieTable(){

    const { setIsMovieFormOpen, isMovieFormOpen } = useContext(AppContext);
    const listaMovies = [
        {
            id: 1,
            nome: "Vingadores",
            nota: "10",
            dataLancamento: "12/12/12",
            diretor: "João",
            faixaEtaria: "12",
            sinopse: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            srcCapa: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.adorocinema.com%2Ffilmes%2Ffilme-130848%2F&psig=AOvVaw0Q4Z4X6Z3Z2Q4Q4Z4X6Z3Z2Q4Q4Z4X6Z3Z2Q4Q&ust=1629789858218000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjQ4Z3Q5vICFQAAAAAdAAAAABAD",
            dublado: true
        
       },
         {
            id: 2,
            nome: "Vingadores",
            nota: "10",
            dataLancamento: "12/12/12",
            diretor: "João",
            faixaEtaria: "12",
            sinopse: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            srcCapa: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.adorocinema.com%2Ffilmes%2Ffilme-130848%2F&psig=AOvVaw0Q4Z4X6Z3Z2Q4Q4Z4X6Z3Z2Q4Q4Z4X6Z3Z2Q4Q&ust=1629789858218000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjQ4Z3Q5vICFQAAAAAdAAAAABAD",
            dublado: true

        },
        {
            id: 3,
            nome: "Vingadores",
            nota: "10",
            dataLancamento: "12/12/12",
            diretor: "João",
            faixaEtaria: "12",
            sinopse: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            srcCapa: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.adorocinema.com%2Ffilmes%2Ffilme-130848%2F&psig=AOvVaw0Q4Z4X6Z3Z2Q4Q4Z4X6Z3Z2Q4Q4Z4X6Z3Z2Q4Q&ust=1629789858218000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjQ4Z3Q5vICFQAAAAAdAAAAABAD",
            dublado: false
        }
            
    ]


    return (
            <div className={styles.container} >
                <Header />
                {isMovieFormOpen && <MovieForm />}

                <div className={styles.content}>
                    
                    <div className={styles.pageHeader}>

                        <h1 className={styles.title}> Funcionários </h1> 

                        <button onClick={() => setIsMovieFormOpen(true)} className={styles.buttonCadastrar}>Cadastrar</button>


                    </div>

                    <div className={styles.employeeTable}>
                        
                        <div className={styles.employeeHeader}> 


                            <p>Nome</p>
                            <p>Nota</p>
                            <p>Data Lançamento</p>
                            <p>Diretor</p>
                            <p>Faixa Etária</p>
                            <p>Sinopse</p>
                            <p>Capa</p>
                            <p>Dublado</p>
                            <p>Editar</p>
                            


                        </div>
                        
                        {listaMovies.map((item, index) => {
                            return (
                                <div className={styles.employeeBody}> 
                                    
                                    <p>{item.nome}</p>
                                    <p>{item.nota}</p>
                                    <p>{item.dataLancamento}</p>
                                    <p>{item.diretor}</p>
                                    <p>{item.faixaEtaria}</p>
                                    <p>{item.sinopse}</p>
                                    <p>{item.srcCapa}</p>
                                    

                                    {item.dublado ? <p>Sim</p> : <p>Não</p>}
                                    
                                    <button>Editar</button>
                            
                                
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

export {MovieTable}