import { PLAYER_AVATARS, PLAYER_COLOURS, type Player } from "./types";

export function isValidPlayerColour(colour: string): boolean {
  return (PLAYER_COLOURS as readonly string[]).includes(colour);
}

export function isValidPlayerAvatar(avatar: string): boolean {
  return (PLAYER_AVATARS as readonly string[]).includes(avatar);
}

export function getTakenColours(players: Player[]): Set<string> {
  return new Set(players.map((player) => player.colour).filter(Boolean));
}

export function getTakenAvatars(players: Player[]): Set<string> {
  return new Set(players.map((player) => player.avatar).filter(Boolean));
}

export function pickAvailableColour(players: Player[]): string {
  const taken = getTakenColours(players);

  return (
    PLAYER_COLOURS.find((colour) => !taken.has(colour)) ?? PLAYER_COLOURS[0]
  );
}

export function pickAvailableAvatar(players: Player[]): string {
  const taken = getTakenAvatars(players);

  return (
    PLAYER_AVATARS.find((avatar) => !taken.has(avatar)) ?? PLAYER_AVATARS[0]
  );
}

export function resolvePlayerIdentity(
  existingPlayers: Player[],
  requested?: { colour?: string; avatar?: string },
): { colour: string; avatar: string } | { error: string } {
  const takenColours = getTakenColours(existingPlayers);
  const takenAvatars = getTakenAvatars(existingPlayers);

  let colour: string;
  let avatar: string;

  if (requested?.colour) {
    if (!isValidPlayerColour(requested.colour)) {
      return { error: "Invalid colour selection" };
    }
    if (takenColours.has(requested.colour)) {
      return { error: "That colour is already taken" };
    }
    colour = requested.colour;
  } else {
    colour = pickAvailableColour(existingPlayers);
  }

  if (requested?.avatar) {
    if (!isValidPlayerAvatar(requested.avatar)) {
      return { error: "Invalid avatar selection" };
    }
    if (takenAvatars.has(requested.avatar)) {
      return { error: "That avatar is already taken" };
    }
    avatar = requested.avatar;
  } else {
    avatar = pickAvailableAvatar(existingPlayers);
  }

  return { colour, avatar };
}

function hashString(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index++) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function getPlayerColour(player: Player): string {
  if (player.colour && isValidPlayerColour(player.colour)) {
    return player.colour;
  }

  return PLAYER_COLOURS[hashString(player.id) % PLAYER_COLOURS.length];
}

export function getPlayerAvatar(player: Player): string {
  if (player.avatar && isValidPlayerAvatar(player.avatar)) {
    return player.avatar;
  }

  return PLAYER_AVATARS[hashString(player.id) % PLAYER_AVATARS.length];
}
