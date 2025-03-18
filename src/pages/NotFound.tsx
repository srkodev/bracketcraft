
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 text-tournament-blue">404</h1>
          <p className="text-xl text-gray-600 mb-6">La page que vous recherchez n'existe pas</p>
          <a href="/" className="bg-tournament-blue hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md">
            Retour à l'accueil
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
