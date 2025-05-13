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


    const items = [
        {VarietyName: "affenpinscher"},
        {VarietyName: "african"},
        {VarietyName: "airedale"},
    ]


    const handleChange = async (e: { target: { value: SetStateAction<string>; }; }) => {
        setLoading(true);
        const DogName = e.target.value
        const newChangeImage = await fetchImageSelect(DogName);
        setMenu(newChangeImage.url)
        setLoading(false);
    }

    return (
        <div>
            <form id="form" className={styles.changing}>
                <select name="select" id="" onChange={handleChange}>
                    <option value="" placeholder="品種を選択してください" selected>品種を選択してください</option>
                    {
                        items.map(item => (
                            <option value={item.VarietyName} key={item.VarietyName }>{item.VarietyName}</option>
                        ))

                    }
                </select>
                <button type="submit">Ok</button>
            </form>
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