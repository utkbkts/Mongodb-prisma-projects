import Cart from "@/components/products/Cart";
import prisma from "@/libs/db/prismadb";

interface Props {
  searchParams: { query: string };
}

export default async function SearchPage({ searchParams: { query } }: Props) {
  const product = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (product.length === 0) {
    return (
      <div className="text-center font-bold text-4xl">No Product Found</div>
    );
  }

  return (
    <div>
      <Cart  products={product} />
    </div>
  );
}
