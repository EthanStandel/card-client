export interface Game {
  id?: string;
  players: Record<string, CardHolder>;
  table: CardHolder;
  decks: Array<Array<Card>>;
}

export interface CardHolder {
  id?: string;
  cards: CardCollection;
}

export interface CardCollection {
  private: Array<Card>;
  public: Array<Card>;
}

export interface Card {
  suit: string;
  value: string;
}

type IncomingEventType =
  | "DECK_SHUFFLED"
  | "PRIVATE_CARD_DRAWN"
  | "PUBLIC_CARD_DRAWN"
  | "PRIVATE_CARD_FETCH"
  | "MISSING_PARAMS"
  | "BAD_REQUEST"
  | "GAME_NOT_FOUND"
  | "NEW_PLAYER";

type IncomingEvent =
  | { event: "DECK_SHUFFLED"; payload: { user: string; deckIndex: string } }
  | { event: "PRIVATE_CARD_DRAWN"; payload: { user: string; card: string } }
  | { event: "PUBLIC_CARD_DRAWN"; payload: { user: string; card: string } }
  | { event: "PRIVATE_CARD_FETCH"; payload: { user: string; cards: string } }
  | { event: "MISSING_PARAMS"; payload: unknown }
  | { event: "BAD_REQUEST"; payload: unknown }
  | { event: "GAME_NOT_FOUND"; payload: unknown }
  | { event: "NEW_PLAYER"; payload: { user: string } };

type OutgoingEventType =
  | "SHUFFLE_DECK"
  | "DRAW_PRIVATE_CARD"
  | "DRAW_PUBLIC_CARD"
  | "FETCH_PRIVATE_CARDS";

type OutgoingEvent =
  | { action: "SHUFFLE_DECK"; payload: { deckIndex: string } }
  | { action: "DRAW_PRIVATE_CARD"; payload: { deckIndex: string } }
  | { action: "DRAW_PUBLIC_CARD"; payload: { deckIndex: string } }
  | { action: "FETCH_PRIVATE_CARDS"; payload: unknown };

SHUFFLE_DECK, DRAW_PRIVATE_CARD, DRAW_PUBLIC_CARD, FETCH_PRIVATE_CARDS;
