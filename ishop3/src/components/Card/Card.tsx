export default function Card({ name, price }: { name: string, price: number }) {
  return (
    <div>
      <h2>Product: {name}</h2>
      <p>Price: {price}</p>
    </div>
  );
}