
const product = {
  id: "1",
  name: "Premium Notes App",
  description: "Unlock all premium features",
  price: 29.99,
};

export default function Page() {
  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <p className="mt-2 font-semibold">${product.price}</p>

    </div>
  );
}