import { GetServerSideProps, NextPage } from "next"
import { SetStateAction, useEffect, useState } from "react";
import styles from "./index.module.css"

// 型定義
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

let DogPhoto:string = ""


// レンダリングされる関数
const IndexPage: NextPage<Props> = ({initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading ] = useState(false);
    const [menu, setMenu] = useState("")

    // const [imageUrl, setImageUrl] = useState()
// 犬種を選択出来るプルダウンメニュー
    const items = [
        {VarietyName: "affenpinscher"},
        {VarietyName: "african"},
        {VarietyName: "airedale"},
        {VarietyName: ""}
    ]

//     onDogSelectChange((selectedValue) => {
//         if (Ok == true) {
//         const fetchImageSelect = async (): Promise<Image> => {
//         const res = await fetch(`https://dog/ceo/api/breed/${DogPhoto}/images/random`);
//         const images:DogImageResponse = await res.json();
//         console.log(images);
//         return {url: images.message};
//         }
// }
// });
    // const handleChange = (e) => {
    //     const fetchImageSelect = async (): Promise<Image> => {
    //     const res = await fetch(`https://dog/ceo/api/breed/${DogPhoto}/images/random`);
    //     const images:DogImageResponse = await res.json();
    //     console.log(images);
    //     return {url: images.message};
    //     useEffect(() => {
    //     fetchImage().then((newImage) => {
    //         setImageUrl(newImage.url);
    //         setLoading(false);
    //     });
    // }, []);
    
// }
//     }

//     const fetchImageSelect = async (DogName): Promise<Image> => {
//     const res = await fetch(`https://dog/ceo/api/breed/${DogName}/images/random`);
//     const images:DogImageResponse = await res.json();
//     console.log(images);
//     return {url: images.message};
// }
    // API経由で受け取ったデータをuseState関数に渡している。一番最初に処理をする
    useEffect(() => {
        fetchImage().then((newImage) => {
            setImageUrl(newImage.url);
            setLoading(false);
        });
    }, []);
    
    // const handleChange = async () => {
    //     setLoading(true);
    //     const newChangeImage = await fetchImage();
    //     setImageUrl(newImage.url);
    //     setLoading(false)
    // }
    // クリックされた時にデータをuseState関数に渡している。　クリック時に処理をする
    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    }
    const handleChange = async (e: { target: { value: SetStateAction<string>; }; }) => {
        setLoading(true);
        const DogName = e.target.value
        const newChangeImage = await fetchImageSelect(DogName);
        setMenu(newChangeImage.url)
        setLoading(false);
    }
    // UIの領域
    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>他のいんぬも見る</button>
            <div className={styles.frame}>{loading || <img src={imageUrl}/> }</div>
            {/* <div><img src={}/></div> */}
            <form id="form">
            <select name="select" id="" onChange={handleChange}>
                {
                    items.map(item => (
                        <option value={item.VarietyName} key={item.VarietyName }>{item.VarietyName}</option>
                    ))
                    
                }
            </select>
            <button>Ok</button>
            <div className={styles.frame}>{loading || <img src={menu}/>}</div>
            </form>
        </div>
    );
};
export default IndexPage;


// サーバーサイドで最初の画像を処理する関数
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
    },
    }
}


// api経由で画像を受けといる関数
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://dog.ceo/api/breeds/image/random");
  const images:DogImageResponse = await res.json();
  console.log(images);
  return {url: images.message};
};


// document.getElementById('form').ariaSelected.onchange = function() {
//     location.href = document.getElementById("form").ariaSelected.valueOf;
// }

const fetchImageSelect = async (DogName): Promise<Image> => {
    const res = await fetch(`https://dog.ceo/api/breed/${DogName}/images/random`);
    const selectImages:DogImageResponse = await res.json();
    console.log(selectImages);
    return {url: selectImages.message};
}
// const fetchImageAffenpinscher = async (): Promise<Image> => {
//     const res = await fetch("https://dog.ceo/api/breed/affenpinscher/images/random")
//     const images:DogImageResponse = await res.json()
//     console.log(images);
//     return {url:images.message}
// }

// const fetchImageAfrican = async (): Promise<Image> => {
//     const res = await fetch("https://dog.ceo/api/breed/african/images/random")
//     const images:DogImageResponse = await res.json()
//     console.log(images);
//     return {url:images.message}
// }

// const fetchImage = async (): Promise<Image> => {
//     const res = await fetch("")
//     const images:DogImageResponse = await res.json()
//     console.log(images);
//     return {url:images.message}
// }
