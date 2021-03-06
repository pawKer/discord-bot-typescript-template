import { Command, DiscordEvent } from "../../@types/bot";
import glob from "glob";

const readCommands = async (): Promise<Command[]> => {
  const commands: Command[] = [];
  let res: string[];
  if (process.env.NODE_ENV === "prod") {
    res = glob.sync(`**/*.js`, {
      cwd: `${process.cwd()}/commands/`,
    });
  } else {
    res = res = glob.sync(`**/*.ts`, {
      cwd: `${process.cwd()}/src/commands/`,
    });
  }

  for (const file of res) {
    const fileNoExt = file.substring(0, file.length - 3);

    const command: Command = (await import(`../commands/${fileNoExt}`))
      .default as Command;
    // Set a new item in the Collection
    commands.push(command);
  }
  return commands;
};

const readEvents = async (): Promise<DiscordEvent[]> => {
  const events: DiscordEvent[] = [];
  let res: string[];
  if (process.env.NODE_ENV === "prod") {
    res = glob.sync(`**/*.js`, {
      cwd: `${process.cwd()}/events/`,
    });
  } else {
    res = res = glob.sync(`**/*.ts`, {
      cwd: `${process.cwd()}/src/events/`,
    });
  }
  for (const file of res) {
    const fileNoExt = file.substring(0, file.length - 3);
    const event: DiscordEvent = (await import(`../events/${fileNoExt}`))
      .default as DiscordEvent;
    // Set a new item in the Collection
    events.push(event);
  }
  return events;
};

export { readCommands, readEvents };
