import { DiscordClient } from "../../@types/bot";

const readyEvent = {
  name: "ready",
  once: true,
  async execute(client: DiscordClient) {
    console.log(`Online as ${client?.user?.tag}`);
    client?.user?.setActivity("Candy Crush");
    console.log(`Loaded ${client.commands.size} commands.`);
  },
};
export default readyEvent;
