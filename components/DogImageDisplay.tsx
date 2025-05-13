import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
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

const DogImageDisplay:React.FC<Props> = ({initialImageUrl}) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading ] = useState(false);


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
        <div>
            <button onClick={handleClick} className={styles.button}>他のいんぬも見る</button>
            <div className={styles.frame}>{loading || <img src={imageUrl}/> }</div>
        </div>
    );
};

export default DogImageDisplay;


export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
    },
    }
}

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://dog.ceo/api/breeds/image/random");
  const images:DogImageResponse = await res.json();
  console.log(images);
  return {url: images.message};
};