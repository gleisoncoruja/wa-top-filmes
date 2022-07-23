import React, { useEffect, useMemo, useState } from 'react'
import styles from './Home.module.scss'

// Componet 
import Loader from '../../components/Loader/Loader'
import { toast } from "react-toastify";

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getAllMovies,updateDataBase,reset } from '../../slices/moviesSlice'


const Home = () => {
  const [listMovie, setListMovie] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [director, setDirector] = useState('')
  const [producers, setProducers] = useState([])
  const [image, setImage] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);


  const { movies,loading,error,message } = useSelector((state) => state.movies)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies(page))
    return () =>{
      dispatch(reset())
    }
  },[dispatch,page])

  useMemo(() => {     
     try {
      if(movies.movies){
        setListMovie(movies.movies)
        setTitle(movies.movies[0].title)
        setDescription(movies.movies[0].description)
        setDirector(movies.movies[0].director[0].name)
        setProducers(movies.movies[0].producer.filter((res) =>  res.known_for_department === "Production" && res.name))
        setImage(movies.movies[0].image)
        setPages(movies.pages)
      }      
     } catch (error) {        
      
     }     
  },[movies])  

  

  useEffect(() => {
    if(error){
      toast.error(error)
    }
    if(message){
      toast.success(message)
    }

    return () =>{
      dispatch(reset())
    }
    
  },[error,message,dispatch])

  const handleUpdateDataBase = async() => {
    await dispatch(updateDataBase())
  }

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'      
    });
  };

  if(loading){
    return (
      <Loader />
    )
  }
  
  return (    
    <main className={styles.main}>
      <div className={styles.buttonUpdate}>
        <button onClick={handleUpdateDataBase}>Atualizar Base de Dados</button> 
      </div>
      {listMovie.length > 0 ? (
        <>          
          <section className={styles.movie}>
            <div className={styles.movieImg}> 
              <img src={image && image} alt={title && title} />        
            </div>
            <div className={styles.movieInfo}>
              <div className={styles.movieTitle}>
                <h1>{title && title}</h1>
              </div>
              <div className={styles.movieDescription}>
                <h2>Sinopse</h2>
                <p>{description || 'Sinopse não disponível'}</p>
              </div>
              <div className={styles.moviePeoples}>
                <div className={styles.movieDirector}>
                  <h2>Direção</h2>
                  <p>{director || 'Informação não disponível'}</p>
                </div>
                <div className={styles.movieProducers}>
                  <h2>Produção</h2>              
                  <p>
                  {producers.length > 0 ? producers.map((producer,index) => {
                    if(producers.length -1 !== index){
                      return(
                        `${producer.name}, `
                      )
                    } else{
                      return(
                        producer.name
                      )
                    }
                  }) : 'Informação não disponível' } 
                  </p>             
                </div>
              </div>
            </div>
          </section>  
          <section className={styles.movies}>
            <div className={styles.listMovies}>
              {listMovie && listMovie.map((movie) => (
                <div className={styles.movieCard} key={movie._id} onClick={() => {
                  setTitle(movie.title)
                  setDescription(movie.description)
                  setDirector(movie.director[0].name)
                  setProducers(movie.producer.filter((res) =>  res.known_for_department === "Production" && res.name))
                  setImage(movie.image)
                  scrollToTop()

                }}>
                  <img src={movie.movie_banner} alt={title && title} />
                  <h3>{movie.title}</h3>                
              </div>
              ))}  
            </div>
            <div className={styles.pagination}>
                {page <= 1 ? (
                  <button disabled>Voltar</button>
                ):(
                  <button onClick={() => setPage( page-1)}>Voltar</button>
                )} 
                <span>
                  Exibindo {page} de {pages}
                </span> 
                {page >= pages ? (
                  <button disabled>Avançar</button>
                ):(
                  <button onClick={() => setPage(page+1)}>Avançar</button>
                )} 
            </div>
                  
          </section>
        </>
      ):(
        <div className={styles.empty}>
          <h2>Poxa, parece que não temos nada por aqui :(</h2>
          <p>Vamos tentar atualizar nosso banco de dados?</p>
          <p>É muito simples, basta clicar no botão roxinho ali em cima e aguardar...</p>
        </div>
      )}
    </main>
    
  )
}

export default Home