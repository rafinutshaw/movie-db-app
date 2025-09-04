import React from "react";
import { useTMDBAuth } from "../../hooks/useTMDBAuth";
import TMDBIcon from "../../icons/tmdb.icon";
import "./Login.scss";
import LoginSuccess from "../../components/LoginSuccess";
const Login: React.FC = () => {
  const { error, success, initiateAuth, loading } = useTMDBAuth();

  return (
    <main className="tmdb-auth">
      <div className="container tmdb-auth-box">
        <h2 className="tmdb-title page-title">Login</h2>
        {error && <div className="tmdb-error">{error}</div>}
        {!success && !loading && (
          <button className="btn-tmdb" onClick={initiateAuth}>
            <span> Click here to login with</span>
            <div className="tmdb-logo">
              <TMDBIcon />
            </div>
          </button>
        )}
        {loading && <div className="loading">Please wait...</div>}
        {success && <LoginSuccess />}
      </div>
    </main>
  );
};

export default Login;
