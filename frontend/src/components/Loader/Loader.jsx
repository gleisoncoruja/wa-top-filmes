import React from 'react'
import styles from './Loader.module.scss' 

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = () => {
  return (
    <div className={styles.loader}>
        <AiOutlineLoading3Quarters />
        <p>Estamos carregando os dados, por favor aguarde...</p>
    </div>
  )
}

export default Loader