type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    reveal?: boolean
}

export function HangmanWord({ guessedLetters, wordToGuess, reveal= false}: HangmanWordProps) {

    return(
        <section style={{
                    display: "flex",
                    gap: ".25em",
                    fontSize: "6rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontFamily: "monospace"
                 }}
        >
            {wordToGuess.split("").map((letter, index) => (
                <span style={{borderBottom: ".1em solid white"}} key={index}>
                    <span style={{visibility: guessedLetters.includes(letter) || reveal
                                                ? "visible"
                                                : "hidden",
                                                color: !guessedLetters.includes(letter) && reveal ? "red" : "white"
                                }}>
                        {letter}
                    </span>
                </span>
            ))}
        </section>
    )
}