import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  orderBy,
  onSnapshot,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import React from "react";
import { db } from "./lib/firebase";
import { useEffect, useState } from "react";
import TopMenu from "./components/TopMenu";
import AddItem from "./components/AddItem";
import SnackMessage from "./components/SnackMessage";
import ItemList from "./components/ItemList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const getDatas = async () => {
  const q = query(collection(db, "todos"), where("done", "==", false));
  const querySnapshot = await getDocs(q);

  let result = [];
  querySnapshot.forEach((doc) => {
    result.push({ id: doc.id, data: doc.data() });
  });

  return result;
};

function App() {
  const [datas, setDatas] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const [filter, setFilter] = useState("");

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            light: "#11ac58",
            main: "#31ac58",
            dark: "#208f68",
            contrastText: "#fff",
          },
          secondary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
          },
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    document.title = "Todo App";

    const q = query(collection(db, "todos"), orderBy("CreatedAt", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setDatas(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    setInterval(() => {
      setFetchedData(true);
    }, 800);
  }, []);

  const handleSubmit = async () => {
    if (description === "" && title === "") {
      setMessage("Non puoi inserire un item vuoto");
      setSeverity("warning");
      setShow(true);
      return;
    }
    const obj = {
      CreatedAt: Date.now(),
      description,
      title,
      done: false,
    };

    try {
      await addDoc(collection(db, "todos"), obj);
      setMessage("Item aggiunto alla lista");
    } catch (error) {
      setMessage(error.message);
      setSeverity("error");
    } finally {
      setShow(true);
      setTitle("");
      setDescription("");
    }
  };

  const titleSetter = ({ target }) => {
    setTitle(target.value);
  };

  const descriptionSetter = ({ target }) => {
    setDescription(target.value);
  };

  const handleFilter = async ({ target }) => {
    setFilter(target.value);
    try {
      let array = await getDatas();
      array = array.filter((entry) => {
        return (
          entry.data.title.toLowerCase().includes(target.value.toLowerCase()) ||
          entry.data.description
            .toLowerCase()
            .includes(target.value.toLowerCase())
        );
      });
      setDatas(array);
    } catch (error) {
      setMessage(error.message);
      setSeverity("error");
      setShow(true);
    }
  };

  const setAsDone = async (id) => {
    const taskDocRef = doc(db, "todos", id);
    const docSnap = await getDoc(taskDocRef);

    try {
      if (docSnap.data().done) {
        await updateDoc(taskDocRef, {
          done: false,
        });
        setMessage("Task da fare");
        setSeverity("info");
      } else {
        await updateDoc(taskDocRef, {
          done: true,
        });
        setMessage("Task completato");
        setSeverity("success");
      }
      setShow(true);
    } catch (error) {
      setMessage(error.message);
      setSeverity("error");
      setShow(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setMessage("Item rimosso");
      setSeverity("success");
      setShow(true);
    } catch (error) {
      setMessage(error.message);
      setSeverity("error");
      setShow(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <TopMenu filterHandler={handleFilter} filter={filter} />
        <ItemList
          fetchedData={fetchedData}
          datas={datas}
          handleDelete={handleDelete}
          setAsDone={setAsDone}
        />
        <AddItem
          title={title}
          setTitle={titleSetter}
          description={description}
          setDescription={descriptionSetter}
          submitHandler={handleSubmit}
        />
        <SnackMessage
          show={show}
          handler={setShow}
          message={message}
          style={severity}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
