import DogImageDisplay from "../components/DogImageDisplay"
import DogBreedSelector from "../components/DogBreedSelector"
import styles from "./index.module.css"

const Base = () => {

    return (
        <div className={styles.container}>
        <DogImageDisplay initialImageUrl={""} />
        <DogBreedSelector initialImageUrl={""} />
        </div>
    )
}

export default Base