import { produce } from "immer";
import create from "zustand";

import { Card, Game, IncomingEvent } from "../models/Game";

type GameStore = {
  username?: string;
  setUsername: (username: string) => void;
  gameSocket?: WebSocket;
  setGameSocket: (socket?: WebSocket) => void;
  game: Game;
  setGame: (game: Game) => void;
  onIncomingEvent: (event: IncomingEvent) => void;
};

const useGame = create<GameStore>(set => {
  const onPrivateCardDrawn = (payload: { user: string; card: string }) => {
    const card = JSON.parse(payload.card) as Card;
    set(
      produce((state: GameStore) => {
        state.game.players[payload.user].cards.private = [
          ...state.game.players[payload.user].cards.private,
          card,
        ];
      })
    );
  };

  const onPublicCardDrawn = (payload: { user: string; card: string }) => {
    const card = JSON.parse(payload.card) as Card;
    set(
      produce((state: GameStore) => {
        state.game.players[payload.user].cards.public = [
          ...state.game.players[payload.user].cards.public,
          card,
        ];
      })
    );
  };

  const onPrivateCardFetch = (payload: { user: string; cards: string }) => {
    const cards = JSON.parse(payload.cards) as Array<Card>;
    set(
      produce((state: GameStore) => {
        state.game.players[payload.user].cards.private = cards;
      })
    );
  };

  return {
    username: undefined,
    setUsername: username => set({ username }),
    gameSocket: undefined,
    setGameSocket: gameSocket => set({ gameSocket }),
    game: {
      id: undefined,
      players: {},
      table: {
        id: undefined,
        cards: {
          public: [],
          private: [],
        },
      },
      decks: [],
    } as Game,
    setGame: (game: Game) => set({ game }),
    onIncomingEvent: (event: IncomingEvent) => {
      switch (event.event) {
        case "PRIVATE_CARD_DRAWN":
          onPrivateCardDrawn(event.payload);
          break;
        case "PRIVATE_CARD_FETCH":
          onPrivateCardFetch(event.payload);
          break;
        case "PUBLIC_CARD_DRAWN":
          onPublicCardDrawn(event.payload);
          break;
      }
    },
  };
});

export default useGame;
