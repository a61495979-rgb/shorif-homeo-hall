import React, { useState } from 'react';
import { Star, ShoppingCart, Check, Eye, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onEditProduct?: (product: Product) => void;
  lang: 'en' | 'bn';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onEditProduct,
  lang,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEditProduct) {
      onEditProduct(product);
    }
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group flex flex-col justify-between bg-white rounded-2xl p-3 md:p-3.5 border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 cursor-pointer relative"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {product.originType === 'germany' && (
          <span className="bg-slate-900 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide shadow-2xs">
            🇩🇪 {lang === 'en' ? 'Germany' : 'জার্মান আসল'}
          </span>
        )}
        {product.originType === 'deshi' && (
          <span className="bg-emerald-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide shadow-2xs">
            🇧🇩 {lang === 'en' ? 'Deshi BD' : 'খাঁটি দেশীয়'}
          </span>
        )}
        {product.isDarazMall && product.originType !== 'deshi' && (
          <span className="bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide flex items-center gap-1 shadow-2xs">
            <ShieldCheck className="w-2.5 h-2.5" />
            MALL
          </span>
        )}
        {product.discountPercent > 0 && (
          <span className="bg-amber-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-2xs">
            -{product.discountPercent}%
          </span>
        )}
      </div>

      {/* Free shipping pill */}
      {product.freeShipping && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-teal-50 text-teal-800 border border-teal-200 text-[9px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <Truck className="w-2.5 h-2.5" /> {lang === 'en' ? 'Free Delivery' : 'ফ্রি ডেলিভারি'}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#fafafa] mb-3 flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Hover Quick View overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> {lang === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'}
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Origin */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="text-emerald-800 font-semibold truncate max-w-[150px]">
              {product.brand}
            </span>
            <span className="truncate">{product.origin.split(',')[1] || product.origin}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-xs md:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-1">
            {product.name}
          </h3>

          {/* Bengali Subtitle */}
          <p className="text-[11px] text-slate-500 line-clamp-1 mb-2">
            {product.bengaliName}
          </p>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-800 ml-1 tabular-nums">{product.rating}</span>
            </div>
            <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base md:text-lg font-extrabold text-slate-900 tabular-nums">
                ৳{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 block -mt-0.5">
              {product.selectedSize || 'Sealed Bottle'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onEditProduct && (
              <button
                onClick={handleEdit}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-2xs"
                title={lang === 'en' ? 'Edit medicine details' : 'ঔষধের তথ্য এডিট করুন'}
              >
                <span className="text-xs">✏️</span>
              </button>
            )}

            <button
              onClick={handleAddToCart}
              className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 ${
                isAdded
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-200 hover:border-emerald-600 shadow-2xs'
              }`}
              title="Add to cart"
            >
              {isAdded ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
