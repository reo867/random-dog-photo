import react from 'react';
import { useRouter } from 'next/router';
import styles from '../pages/index.module.css';

const Header =(props) => {
    const router = useRouter();

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
                            {/* <a href="/">home</a> */}
                            <button type="button" onClick={() => router.push('/')}>
                                home
                            </button>
                        </li>
                        <li>
                            {/* <a href="/base">second</a> */}
                            <button type='button' onClick={() => router.push('/base')}>
                                Watch Dog!
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        </>
    )
}

export default Header;