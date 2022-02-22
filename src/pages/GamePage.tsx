import { useParams } from "react-router-dom";

import useGame from "../hooks/useGame";
import useGameEvents from "../hooks/useGameEvents";
import { OutgoingEventType } from "../models/Game";

const GamePage = () => {
  const { username, gameId } = useParams();
  const { outgoing } = useGameEvents(gameId!, username!);
  const { game } = useGame();

  const fireAction = (action: OutgoingEventType) => {
    outgoing.next({ action, payload: { deckIndex: "0" } });
  };

  return (
    <div>
      <p>{username}</p>
      <p>{gameId}</p>
      <button onClick={() => fireAction("SHUFFLE_DECK")}>SHUFFLE_DECK</button>
      <button onClick={() => fireAction("DRAW_PRIVATE_CARD")}>
        DRAW_PRIVATE_CARD
      </button>
      <button onClick={() => fireAction("DRAW_PUBLIC_CARD")}>
        DRAW_PUBLIC_CARD
      </button>
      <p>{JSON.stringify(game.players[username!])}</p>
    </div>
  );
};

export default GamePage;
