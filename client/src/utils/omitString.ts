import { useCallback } from "react";

export const omitString = (string: string, limit: number) => {
  if (string.length >= limit) {
    const cutOut = string.substring(0, limit);
    return `${cutOut}...`;
  }
};
