import styles from '../css/header.module.css';



export const Header = () => {
    return(
        <header className={styles.header}>
            <div className={styles.top}>
                <div className={styles.logo}></div>
            </div>
            <div className={styles.content}>
                Pixl' Up
            </div>
        </header>
    )
}