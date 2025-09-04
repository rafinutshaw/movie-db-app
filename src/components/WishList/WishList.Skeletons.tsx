import React from "react";
import "./WishList.Skeletons.style.scss";
export const WishListSkeleton: React.FC<{ count?: number }> = ({
  count = 4,
}) => (
  <div className="wishlist-items">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="wishlist-item">
        <div className="skeleton skeleton-img" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-btn" />
      </div>
    ))}
  </div>
);
