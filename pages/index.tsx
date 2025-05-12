import { GetServerSideProps, NextPage } from "next"
import { useEffect, useState } from "react";
import styles from "./index.module.css"

// 型定義
type Props = {
    initialImageUrl: string;
};
type Image = {
    url:string;
}

type DogImageResponse = {
    message:string;
    status: string;
    akita:string;
}


// レンダリングされる関数
const IndexPage: NextPage<Props> = ({initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading ] = useState(false);
    // API経由で受け取ったデータをuseState関数に渡している。
    useEffect(() => {
        fetchImage().then((newImage) => {
            setImageUrl(newImage.url);
            setLoading(false);
        });
    }, []);

    
    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    }
    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>他のいんぬも見る</button>
            <div className={styles.frame}>{loading || <img src={imageUrl}/> }</div>
            {/* <div><img src={imageUrl}/></div> */}
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

// fetchImage()