import  "./index.css"
import { useCallback, useEffect, useState } from "react"

import words from "./wordList.json"
import { HangmanDrawing, HangmanWord, Keyboard } from "./components"

type Riddle = {
  name: string;
  description: string;
};

type ObjectHome = {
  item: string;  
  riddle: Riddle[];
};

const objectHome: ObjectHome = words;

function getWord() {
  const words = objectHome.riddle.map(item =>
    item.name.toLowerCase()
  );
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isWinner, isLoser]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  const adivinanzaActual = objectHome.riddle.find(
    item => item.name.toLowerCase() === wordToGuess
  );


  return (
    <section
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
      className="board-img"
    >
      <h2 style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Ganaste! - Preciona tecla enter para seguir jugando!"}
        {isLoser && "Perdiste! - Preciona tecla enter y vuelve a intentarlo!"}
      </h2>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <h3 style={{ fontSize: "1.5rem", textAlign: "center" }}>
        {adivinanzaActual?.description}
      </h3>
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <article style={{ alignSelf: "stretch", padding:"3rem" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </article>
    </section>
  )
}

export default App