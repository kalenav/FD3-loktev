export function BR2JSX({ text }: { text: string }) {
  return (
    <div>
      {text
        .split(/<br ?\/?>/)
        .map((word, index, arr) => [word, (index < arr.length - 1) && <br />])
        .flat()
      }
    </div>
  )
}