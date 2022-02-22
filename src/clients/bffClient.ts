import axios from "axios";

import environment from "../environment";
import { Game } from "../models/Game";

const client = axios.create({ baseURL: environment.bffDomain.http });

const bffClient = {
  fetchGame: async (gameId?: string): Promise<Game> => {
    const response = await client.get<Game>(
      `/game${gameId ? `/${gameId}` : ""}`
    );
    return response.data;
  },
  createWsClient: (gameId: string, username: string) =>
    new WebSocket(
      `${environment.bffDomain.ws}/game/${gameId}/events/${username}`
    ),
};

export default bffClient;
