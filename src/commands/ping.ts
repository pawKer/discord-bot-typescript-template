import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../../@types/bot";
import { getPongEmbed } from "../embeds/embeds";

const serverPingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong."),
  async execute(client, interaction) {
    await interaction.reply({
      embeds: [
        getPongEmbed(),
      ],
    });
  },
};
export default serverPingCommand;
