import { useState } from "react"
import words from "./wordList.json"

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  console.log(wordToGuess);


  return (
    <section 
      style={{
        maxWidth:"800px",
        display:"flex",
        flexDirection:"column",
        gap:"2rem",
        margin:"0 auto",
        alignItems: "center"
      }}
    >
      
    </section>
  )
}

export default App
