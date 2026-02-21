import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { getLanguageFromPath, toLocalePath } from "@/lib/locale";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const location = useLocation();
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="platform-page flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    const language = getLanguageFromPath(location.pathname);
    const authPath = toLocalePath("/auth", language);
    const fromPath = `${location.pathname}${location.search}${location.hash}`;

    return <Navigate to={authPath} replace state={{ from: fromPath }} />;
  }

  return <>{children}</>;
};

export default AdminRoute;
