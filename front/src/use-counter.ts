import { useCallback, useEffect, useState } from "react";

const BACKEND_BASEURL = "http://localhost:4002";
const COUNTER_URL = `${BACKEND_BASEURL}/counter`;
const BACKEND_INC_METHOD = `${COUNTER_URL}/increment`;
const BACKEND_GET_METHOD = COUNTER_URL;

export const useCounter = () => {
  const [counter, setCounter] = useState<number | undefined>(undefined);

  const loading = counter === undefined;
  async function load() {
    try {
      const r = await fetch(BACKEND_GET_METHOD, { method: "GET" });
      const { value: counter } = await r.json();
      setCounter(counter);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (loading) {
      load();
    }
  }, [loading]);

  const increment = useCallback(async () => {
    const r = await fetch(BACKEND_INC_METHOD, { method: "POST" });
    const { value: counter } = await r.json();
    setCounter(counter);
  }, []);

  return { counter, increment, loading };
};
