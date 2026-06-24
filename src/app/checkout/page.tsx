import StripeEmbeddedCheckout from "@/components/Checkout";

const product = {
  id: "1",
  name: "Premium Notes App",
  description: "Unlock all premium features",
  price: 29.99,
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>{product.description}</p>

      <div className="mt-8 w-full">
        <StripeEmbeddedCheckout product={product} />
      </div>
    </div>
  );
}