import DogImageDisplay from "../components/DogImageDisplay"
import DogBreedSelector from "../components/DogBreedSelector"
import styles from "./index.module.css"
import Header from "../components/Header"

const introduction:string = "品種ごとにも犬の画像表示ができるよ！"
const Base = () => {

    return (
        <div className={styles.container}>
        <Header introduction={introduction}/>
        <DogImageDisplay initialImageUrl={""} />
        <DogBreedSelector initialImageUrl={""} />
        </div>
    )
}

export default Base