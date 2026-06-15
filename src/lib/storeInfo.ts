import { useEffect, useState } from "react";

export interface StoreInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const STORAGE_KEY = "spielzeugtraum.storeInfo";

export const defaultStoreInfo: StoreInfo = {
  name: "SpielzeugTraum",
  email: "support@spielzeugtraum.de",
  phone: "+49 30 1234567",
  address: "Spielstraße 1, 10115 Berlin",
};

export function loadStoreInfo(): StoreInfo {
  if (typeof window === "undefined") return defaultStoreInfo;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStoreInfo;
    return { ...defaultStoreInfo, ...JSON.parse(raw) };
  } catch {
    return defaultStoreInfo;
  }
}

export function saveStoreInfo(info: StoreInfo) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
  window.dispatchEvent(new CustomEvent("storeInfo:updated"));
}

export function useStoreInfo(): StoreInfo {
  const [info, setInfo] = useState<StoreInfo>(() => loadStoreInfo());
  useEffect(() => {
    const handler = () => setInfo(loadStoreInfo());
    window.addEventListener("storeInfo:updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("storeInfo:updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return info;
}
