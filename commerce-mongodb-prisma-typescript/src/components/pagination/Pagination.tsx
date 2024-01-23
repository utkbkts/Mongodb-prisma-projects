import Link from "next/link";
import React from "react";

// Props tiplemesi
interface Props {
  currentPage: number; // Mevcut sayfa numarası
  totalPages: number; // Toplam sayfa sayısı
}

// Sayfalama bileşeni
const Pagination = ({ currentPage, totalPages }: Props) => {
  // Sayfa numaralarını düzenlemek için kullanılan değişkenler
  
  // Gösterilecek en yüksek sayfa numarasını belirle
  const maxpage = Math.min(totalPages, Math.max(currentPage + 4, 10));

  // Gösterilecek en düşük sayfa numarasını belirle
  const minPage = Math.max(1, Math.min(currentPage - 5, maxpage - 9));

  // Sayfa numaralarını içeren dizi
  const numberedPageItems = [];

  // Belirtilen aralıktaki sayfa numaralarını diziye eklemek için döngü
  for (let page = minPage; page <= maxpage; page++) {
    numberedPageItems.push(
      // Her sayfa numarasını temsil eden Link bileşeni
      <Link
        key={page}
        className={`join-item btn  ${
          currentPage === page ? "btn-active pointer-events-none" : ""
        }`}
        href={"?page=" + page}
      >
        {page}
      </Link>
    );
  }

  // Sayfalama bileşenini oluşturan JSX
  return (
    <>
      {/* Büyük ekranlar için sayfa numaralarını gösteren bölüm */}
      <div className="join w-full mb-4 mt-4 md:flex items-center justify-center hidden sm:block">
        {numberedPageItems}
      </div>

      {/* Küçük ekranlar için sayfa numaralarını ve ileri/geri gitme bağlantılarını gösteren bölüm */}
      <div className="join block sm:hidden mt-4 mb-4">
        {/* Önceki sayfaya gitme bağlantısı */}
        {currentPage > 1 && (
          <Link className="btn join-item" href={"?page=" + (currentPage - 1)}>
            &#60;&#60; {/* ASCII kodu ile sol ok işareti */}
          </Link>
        )}

        {/* Mevcut sayfa numarasını gösteren düğme */}
        <button className="join-item btn pointer-events-none">
          Page {currentPage}
        </button>

        {/* Sonraki sayfaya gitme bağlantısı */}
        {currentPage < totalPages && (
          <Link className="btn join-item" href={"?page=" + (currentPage + 1)}>
            &gt;&gt; {/* ASCII kodu ile sağ ok işareti */}
          </Link>
        )}
      </div>
    </>
  );
};

export default Pagination;
