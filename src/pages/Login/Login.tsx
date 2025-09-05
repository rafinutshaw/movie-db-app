import React from "react";
import { useTMDBAuth } from "../../hooks/useTMDBAuth";
import TMDBIcon from "../../icons/tmdb.icon";
import "./Login.scss";
import LoginSuccess from "../../components/LoginSuccess";
import PageContainer from "../../components/PageContainer";

const Login: React.FC = () => {
  const { error, success, initiateAuth, loading } = useTMDBAuth();

  return (
    <PageContainer title="Login" description="Movie database website">
      <div className="tmdb-auth-box">
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
    </PageContainer>
  );
};

export default Login;
