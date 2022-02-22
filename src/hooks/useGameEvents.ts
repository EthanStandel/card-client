import { useEffect, useState } from "react";

import { useUnmountEffect } from "@react-hookz/web";
import { useNavigate } from "react-router";
import { Subject, tap } from "rxjs";

import bffClient from "../clients/bffClient";
import environment from "../environment";
import { IncomingEvent, OutgoingEvent } from "../models/Game";

import useGame from "./useGame";

const useGameEvents = (gameId: string, username: string) => {
  const [outgoing] = useState(() => new Subject<OutgoingEvent>());
  const [incoming] = useState(() => new Subject<IncomingEvent>());
  // TODO - Make these separate selectors once this hook is finalized
  const { setGame, gameSocket, setGameSocket, onIncomingEvent } = useGame();

  const navigate = useNavigate();
  useUnmountEffect(() => {
    gameSocket?.close();
    setGameSocket(undefined);
  });

  useEffect(() => {
    const gameSocket = bffClient.createWsClient(gameId, username);
    setGameSocket(gameSocket);
    (async () => {
      try {
        await new Promise(resolve =>
          gameSocket.addEventListener("open", resolve, { once: true })
        );
        const game = await bffClient.fetchGame(gameId);
        setGame(game);
        outgoing.next({ action: "FETCH_PRIVATE_CARDS", payload: null });
      } catch {
        navigate("/");
      }
    })();
  }, []);

  useEffect(() => {
    const incomingHandler = incoming
      .pipe(
        tap(event => {
          if (environment.name === "local") {
            console.log(event);
          }
        })
      )
      .subscribe(onIncomingEvent);
    return () => incomingHandler.unsubscribe();
  }, [incoming]);

  useEffect(() => {
    if (gameSocket) {
      const listener = () => {
        gameSocket.addEventListener("message", ({ data }) => {
          incoming.next(JSON.parse(data));
        });
        outgoing.subscribe(async action => {
          while (gameSocket.readyState !== gameSocket.OPEN) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          gameSocket.send(JSON.stringify(action));
        });
      };
      gameSocket.addEventListener("open", listener);
      return () => gameSocket.removeEventListener("open", listener);
    }
  }, [gameSocket]);

  return { incoming: incoming.asObservable(), outgoing };
};

export default useGameEvents;
