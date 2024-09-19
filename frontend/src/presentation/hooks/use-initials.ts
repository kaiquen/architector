import { useMemo } from "react";

export const useInitials = (fullName: string): string => {
  return useMemo(() => {
    const nameParts = fullName.trim().split(" ");

    if (nameParts.length > 1) {
      const firstInitial = nameParts[0][0].toUpperCase();
      const secondInitial = nameParts[nameParts.length - 1][0].toUpperCase();
      return `${firstInitial}${secondInitial}`;
    }

    return nameParts[0].slice(0, 2).toUpperCase();
  }, [fullName]);
};
