export default function Shop({ name, address }: { name: string, address: string }) {
    return <>
        <h2>name: {name}</h2>
        <h4>address: {address}</h4>
    </>
}