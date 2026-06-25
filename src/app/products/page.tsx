import { ProductCatalog } from "@/components/products/product-catalog";

export const metadata = {
  title: "INNERA · цифровые продукты",
  description: "Готовые принты: промпты, тетради, карточки и маршруты для самотерапии с ChatGPT.",
};

export default function ProductsPage() {
  return <ProductCatalog />;
}
