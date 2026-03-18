export function BR2JSX({ text }: { text: string }) {
  return (
    <div>
      {text
        .split(/<br ?\/?>/)
        .map((word, index) => [
          (index > 0) && <br key={index} />,
          <span key={`${index}${word}`}>{word}</span>,
        ])
        .flat()
      }
    </div>
  )
}