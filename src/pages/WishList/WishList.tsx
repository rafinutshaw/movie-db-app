import React from "react";
import { useWishList } from "../../hooks/useWishList";
import { Link } from "react-router-dom";
import "./WishList.scss";
import { WishListSkeleton } from "../../components/WishList/WishList.Skeletons";
import FilmBox from "../../components/FilmBox/FilmBox";
import { useAuthStore } from "../../store/useAuthStore";

const WishList: React.FC = () => {
  const { items, remove, error, loading } = useWishList();
  const { isLoggedIn } = useAuthStore();

  return (
    <main className="wishlist">
      <article>
        <title>Wishlist - TMDB</title>
        <meta name="description" content="Movie database website" />
      </article>
      <div className="container">
        <h2 className="page-title">My Wishlist</h2>
        {!isLoggedIn && (
          <span>
            {"You must login see watchlist."}{" "}
            <Link to="/login">Login here</Link>
          </span>
        )}
        {isLoggedIn && (
          <>
            {error && <p className="error">{error}</p>}
            {items.length === 0 && loading && <WishListSkeleton />}
            {items.length === 0 && isLoggedIn && (
              <p>No films in your wish list.</p>
            )}
            {isLoggedIn && items.length > 0 && (
              <div className="wishlist-items">
                {items.map((film) => (
                  <FilmBox
                    key={film.id}
                    film={film}
                    showRemove={true}
                    onRemove={remove}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default WishList;
