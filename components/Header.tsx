import react from 'react';
import styles from '../pages/index.module.css';

const Header =(props) => {
    return (
        <>
        <header>
            <div >
                <h1 className={styles.title}>犬の画像をランダムに表示するアプリ</h1>
                <p className={styles.description}>犬の画像をランダムに表示するアプリです</p>
                <p className={styles.description}>{props.introduction}</p>
            </div>
            <div>
                <nav>
                    <ul>
                        <li>
                            <a href="/">one</a>
                        </li>
                        <li>
                            <a href="/base">second</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        </>
    )
}

export default Header;