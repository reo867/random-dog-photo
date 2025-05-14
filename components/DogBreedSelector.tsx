import { SetStateAction, useState } from "react";
import styles from '../pages/index.module.css';

type Props = {
    initialImageUrl: string;
};

type Image = {
    url:string;
};

type DogImageResponse = {
    message:string;
    status: string;
};

const DogBreedSelector:React.FC<Props> = ({}) => {
    const [loading, setLoading ] = useState(false);
    const [menu, setMenu] = useState("")
    const [buttonText, setButtonText] =useState("ボタン");


    const items = [
        {VarietyName: "affenpinscher"},
        {VarietyName: "african"},
        {VarietyName: "airedale"},
    ]
const handleSelectChange = (e) => {
    setButtonText(e.target.value)
}

    const handleChange = async (e: { target: { value: SetStateAction<string>; }; }) => {
        setLoading(true);
        const DogName = buttonText
        const newChangeImage = await fetchImageSelect(DogName);
        setMenu(newChangeImage.url)
        setLoading(false);
    }

    return (
        <div>
            {/* <form action="#"> */}
                <select name="select" id="" onChange={handleSelectChange}>
                    <option placeholder="品種を選択してください" className={styles.optional}>品種を選択してください</option>
                    {
                        items.map(item => (
                            <option value={item.VarietyName} key={item.VarietyName }>{item.VarietyName}</option>
                        ))

                    }
                </select>
            <button className={styles.button} formTarget="button" onClick={() => (handleChange)}>ok</button>
            {/* </form> */}
            <div className={styles.frame}>{loading || <img src={menu}/>}</div>
        </div>
    );
};

export default DogBreedSelector;

const fetchImageSelect = async (DogName): Promise<Image> => {
    const res = await fetch(`https://dog.ceo/api/breed/${DogName}/images/random`);
    const selectImages:DogImageResponse = await res.json();
    console.log(selectImages);
    return {url: selectImages.message};
}