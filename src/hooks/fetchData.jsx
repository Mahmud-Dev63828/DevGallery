import { ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../Database/firebase.config";

const useFetch = (dbName = "friends/") => {
  const [state, setState] = useState({
    data: [],
    error: null,
    loading: false,
  });

  // Generate key name like "friendKey" from "friends/"
  const generateKeyName = (name) => {
    const clean = name.replace("/", "").trim().toLowerCase();
    const singular = clean.endsWith("s") ? clean.slice(0, -1) : clean;
    return `${singular}Key`;
  };

  const keyName = generateKeyName(dbName);

  useEffect(() => {
    const fetchData = async () => {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const snapshot = await get(ref(db, dbName));

        if (snapshot.exists()) {
          const result = [];
          snapshot.forEach((item) => {
            result.push({
              ...item.val(),
              [keyName]: item.key,
            });
          });

          setState({
            data: result,
            error: null,
            loading: false,
          });
        } else {
          setState({
            data: [],
            error: new Error("No data available"),
            loading: false,
          });
        }
      } catch (error) {
        console.error("Firebase get() error:", error);
        setState({
          data: [],
          error,
          loading: false,
        });
      }
    };

    fetchData();
  }, [dbName]);

  return state;
};

export { useFetch };
