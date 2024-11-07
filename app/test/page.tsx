"use client"
import { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';

export default function Test() {
    const [result, setResult] = useState<string>("Načítám text...");

    const extractText = async (imagePath: string) => {
        try {
            const result = await Tesseract.recognize(imagePath, 'eng');
            setResult(result.data.text);
        } catch (error) {
            setResult("Chyba při extrakci textu.");
            console.error(error);
        }
    };

    useEffect(() => {
        const imagePath = "https://img.freepik.com/free-vector/pen-white-sheet-paper-with-penscript-text_1284-49813.jpg";
        extractText(imagePath);
    }, []);

    return (
        <div>
            <p>{result}</p>
        </div>
    );
}
