import AuthProvider from "./providers/AuthProvider";
import QueryProvider from "./providers/QueryProvider";
import AppRoutes from "./routes/AppRoutes.tsx";

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryProvider>
  );
}