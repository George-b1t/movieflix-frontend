import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { MovieForm } from "../../components/MovieForm";
import { MovieProps } from "../Movie";

function MovieTable(){
    const { setIsMovieFormOpen, isMovieFormOpen, getMovies, allMovies, setCurrentMovie } = useContext(AppContext);

    useEffect(() => {
        getMovies()
    }, []);

    function editMovie(movie: MovieProps) {
        setCurrentMovie(movie);
        setIsMovieFormOpen(true);
    }

    return (
            <div className={styles.container} >
                <Header />
                {isMovieFormOpen && <MovieForm />}

                <div className={styles.content}>
                    
                    <div className={styles.pageHeader}>

                        <h1 className={styles.title}> Filmes </h1> 

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
                        
                        {allMovies.map((item, index) => {
                            return (
                                <div key={index} className={styles.employeeBody}> 
                                    
                                    <p>{item.nome}</p>
                                    <p>{item.nota}</p>
                                    <p>{item.dataLancamento}</p>
                                    <p>{item.diretor}</p>
                                    <p>{item.faixaEtaria}</p>
                                    <p>{item.sinopse}</p>
                                    <p>{item.srcCapa}</p>
                                    

                                    {item.dublado ? <p>Sim</p> : <p>Não</p>}
                                    
                                    <button onClick={() => editMovie(item)}>Editar</button>
                                
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