export type DeadlineFlag = { tone: "bad" | "warn"; text: string };

export function deadlineFlags(input: {
  savedXi: { name: string; availability: number; blank: boolean }[];
  thin: string[];
}): DeadlineFlag[] {
  const flags: DeadlineFlag[] = [];
  for (const player of input.savedXi) {
    if (player.availability < 40) {
      flags.push({ tone: "bad", text: `${player.name} is in the saved XI on ${player.availability}.` });
    } else if (player.availability < 75) {
      flags.push({ tone: "warn", text: `${player.name} is a doubt in the saved XI on ${player.availability}.` });
    }
    if (player.blank) {
      flags.push({ tone: "warn", text: `${player.name} has a blank in the decision gameweek.` });
    }
  }
  if (input.thin.length > 0) {
    flags.push({ tone: "bad", text: `Short of fit cover at ${input.thin.join(", ")}.` });
  }
  return flags;
}
