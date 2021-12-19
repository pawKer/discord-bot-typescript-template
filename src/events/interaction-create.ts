import { Guild, Interaction } from "discord.js";
import { DiscordClient } from "../../@types/bot";

const interactionCreateEvent = {
  name: "interactionCreate",
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;
    const client = interaction.client as DiscordClient;
    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    
    const guild: Guild | null = interaction.guild;
    if(!guild) return;

    try {
      await command.execute(client, interaction);
    } catch (error) {
      console.error(`[${guild.id}]`, error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
export default interactionCreateEvent;
