import React, { useContext, useEffect, useRef, useState } from "react";
import { authApi } from "../../api";
import { studentsType } from "../../types/studentsType";
import { StudentContext } from "../studentsProvider/StudentsContext";

const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const websocket = useRef(null);
  const { dispatch } = useContext(StudentContext);

  const [auth, setAuth] = useState({
    access: "",
    refresh: "",
    isAuth: false,
    logged: false,
    connected: false,
  });

  let autoReconnectInterval = 250; // in ms

  const reconnectToWebSocket = (autoReconnectInterval) => {
    const maximumConnectionTimeout = 10000;
    setTimeout(
      initializeWebSocket,
      Math.min(maximumConnectionTimeout, autoReconnectInterval)
    );
  };

  const handleMessage = (message) => {
    console.debug("[WebSocket-IncomingMessage]", message);
    console.log("pre type");
    if (message.student.typeAction === "created") {
      console.log("created");
      dispatch({
        type: studentsType.SET_STUDENT,
        payload: message.student,
      });
    }

    if (message.student.typeAction === "deleted") {
      console.log("delete");
      dispatch({
        type: studentsType.DELETE_STUDENT,
        payload: message.student,
      });
    }

    if (message.student.typeAction === "updated") {
      console.log("updated");
      dispatch({
        type: studentsType.UPDATE_STUDENT,
        payload: message.student,
      });
    }
  };

  const initializeWebSocket = () => {
    websocket.current = new WebSocket("ws://localhost:8000/student/");

    websocket.current.onopen = (event) => {
      autoReconnectInterval = 250; //reset the interval for reconnecting
      console.log("socket connected");
    };

    websocket.current.onmessage = (message) => {
      const decodedMessage = JSON.parse(message.data);
      console.log("=>");
      handleMessage(decodedMessage);
    };

    websocket.current.onclose = (event) => {
      switch (event.code) {
        case 1000: //closed normally
          console.debug("WebSocket closed normally");
          break;
        default: //increment the interval for reconnecting
          autoReconnectInterval += autoReconnectInterval;
          reconnectToWebSocket(autoReconnectInterval);
          break;
      }
    };

    websocket.current.onerror = (error) => {
      switch (error.code) {
        case "ECONNREFUSED":
          //increment the interval for reconnecting
          autoReconnectInterval = autoReconnectInterval +=
            autoReconnectInterval;
          reconnectToWebSocket(autoReconnectInterval);
          break;
        default:
          console.error(`WebSocket encountered error: ${error}`);
          break;
      }
    };
  };

  const socketSendMessage = (message) => {
    if (websocket.current) {
      websocket.current.send(JSON.stringify(message));
    }
  };

  // const websocketMessage = () => {
  //   socket.onmessage = (message) => {
  //     const decodedMessage = JSON.parse(message.data);
  //     console.log("[WebSocket-IncomingMessage]", decodedMessage);
  //     handleMessage(decodedMessage);
  //   };
  // };

  useEffect(() => {
    authApi("carlos", "Aiorias13.")
      .then((resp) => {
        console.log("auth");
        localStorage.setItem("token", resp.access_token);
        setAuth({
          token: resp.access_token,
          isAuth: true,
          logged: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setAuth({
          access: "",
          refresh: "",
          isAuth: false,
          logged: false,
        });
      })
      .finally(() => {
        console.log(auth);
      });
  }, []);

  useEffect(() => {
    if (auth.isAuth && websocket.current === null) {
      initializeWebSocket();
    }
    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, [auth.isAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuth: auth.isAuth,
        logged: auth.logged,
        access: auth.access,
        refresh: auth.refresh,
        socket: websocket.current,
        socketSendMessage,
        initializeWebSocket,
        // websocketMessage,
        handleMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
