import { useEffect, useState } from "react";
import './App.css'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${fisrtWord}?size=50&color=white&json=true`;
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com';
export function App() {

    const [fact, setFact] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [factError, setFactError] = useState();

    // para recuperar la cita o frase al cargar la página
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(response => {
                if (!response.ok) {
                    setFactError('Error al recuperar la cita o frase');
                }
                return response.json();
            })
            .then(data => {
                const { fact } = data;
                setFact(fact)
            });
    }, []);

    // para recuperar la imagen cada vez que cambia la cita o frase
    useEffect(() => {
        if (!fact) return;

        // const firstWord = fact.split(' ')[0]; // solo la primera palabra
        // const firstWord = fact.split(' ').slice(0, 2).join(' '); // las primeras 3 palabras
        const threeFirstWords = fact.split(' ', 3).join(' '); // las primeras 3 palabras

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=white&json=true`)
            .then(response => response.json())
            .then(data => {
                const { url } = data;
                setImageUrl(url);
            });
    }, [fact]);

    // Using async/await
    // useEffect(() => {
    //     async function getCatFact() {
    //         const response = await fetch(CAT_ENDPOINT_RANDOM_FACT);
    //         const data = await response.json();
    //         setFact(data.fact);
    //     }
    //     getCatFact();
    // }, []);

    return (
        <main /* style={{ display: 'flex', flexDirection: 'column' }} */>
            <h1>My App de gatitos</h1>
            <section>
                {fact && <p>{fact}</p>}
                {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`} />}
            </section>
            {/* {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`} />} */}
        </main>
    );
}