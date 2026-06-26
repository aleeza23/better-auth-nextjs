import CheckoutNew from "@/components/CheckoutNew";

const product = {
  id: "1",
  name: "Premium Notes App",
  description: "Unlock all premium features",
  price: 29.99,
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto p-10">
      <CheckoutNew product={product} />
    </div>
  );
}
