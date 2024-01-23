import React from "react";
import prisma from "@/libs/db/prismadb";
import Banner from "@/components/banner/Banner";
import Cart from "@/components/products/Cart";
import Pagination from "@/components/pagination/Pagination";

interface Props {
  searchParams: { page: string };
}

const Home = async ({ searchParams: { page = "1" } }: Props) => {
  const currentPage = parseInt(page);

  const pageSize = 6;
  const heroItemCount = 1;
  const totalItemCount = await prisma.product.count();

//   skip: Bu değer, belirli bir sayfa numarasındaki ürünleri çekerken, veritabanında kaç ürünün atlanacağını belirtir. (currentPage - 1) * pageSize ifadesi, önceki sayfalardaki ürünlerin toplam sayısını temsil eder. Eğer currentPage 1'e eşitse, heroItemCount (banner içinde gösterilen ürün sayısı) eklenmez, aksi takdirde eklenir. Bu, ilk sayfada banner içindeki ürünlerin eklenmesini sağlar.

// take: Bu değer, belirli bir sayfa numarasındaki ürünleri çekerken, toplam kaç ürünün alınacağını belirtir. pageSize ifadesi, her sayfada gösterilecek standart ürün sayısını temsil eder. Eğer currentPage 1'e eşitse, heroItemCount (banner içinde gösterilen ürün sayısı) eklenir, aksi takdirde eklenmez. Bu, ilk sayfada banner içindeki ürünlerin alınmasını sağlar.

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });
  return (
    <div className="flex flex-col items-center justify-center">
      {currentPage === 1 && <Banner products={products} />}
      <Cart currentPage={currentPage} products={products} />
      {totalPages && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default Home;
