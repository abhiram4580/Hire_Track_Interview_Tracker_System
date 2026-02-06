import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CombinedGraphQLErrors } from "@apollo/client/errors";

export function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  const handleAuthError = (error: unknown) => {
    let isAuthError = false;

    if (CombinedGraphQLErrors.is(error)) {
      isAuthError = error.errors.some(
        (e) => e.extensions?.code === "UNAUTHENTICATED"
      );
    } else if (
      (error as any)?.graphQLErrors &&
      Array.isArray((error as any).graphQLErrors)
    ) {
      isAuthError = (error as any).graphQLErrors.some(
        (e: any) => e.extensions?.code === "UNAUTHENTICATED"
      );
    }

    if (isAuthError) {
      localStorage.removeItem("token");
      router.push("/login");
      return true;
    }

    return false;
  };

  return { handleAuthError };
}
