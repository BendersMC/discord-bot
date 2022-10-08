const { Client, GatewayIntentBits, EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

client.once('ready', c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', (message) => {
	if (message.author.bot) return;
	if (message.channel.name === 'general' || message.channel.name === 'media' || message.channel.name === 'commands' || message.channel.name === 'minecraft-link' || message.channel.name === 'survival-realm' || message.channel.name === 'factions-realm' || message.channel.name === 'ozais-realm' || message.channel.name === 'market' || message.channel.name === 'looking・for・group' || message.channel.name === 'public-help' || message.channel.name === 'suggestions') {
		if (message.content.includes('ip') || message.content.includes('port')) {
			message.channel.send({
				embeds: [new EmbedBuilder().setColor(0xF34213)
					.setTitle('`play.bendersmc.co` | `19132`')],
			});
		}
		else if (message.content.includes('how') || message.content.includes('join')) {
			message.channel.send({
				embeds: [new EmbedBuilder().setColor(0xF34213).setTitle('Head Over To #how-to-join')],
			});
		}
		else if (message.content.includes('store') || message.content.includes('rank')) {
			message.channel.send({
				embeds: [new EmbedBuilder().setColor(0xF34213).setTimestamp('`https://store.bendersmc.co`')],
			});
		}
		else if (message.content.includes('bend') || message.content.includes('bending')) {
			message.channel.send({
				embeds: [new EmbedBuilder().setColor(0xF34213).setTitle('After joining the server, **choose** the **realm** you want to play on by **clicking the NPC** at /server lobby')],
			});
		}
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'embed') {


		const modal = new ModalBuilder()
			.setCustomId('embedModal')
			.setTitle('Embed');
		const titleInput = new TextInputBuilder()
			.setCustomId('titleInput')
			.setLabel('What Do U Want The Tittle To Be?')
			.setStyle(TextInputStyle.Short)
			.setRequired(true);

		const channelInput = new TextInputBuilder()
			.setCustomId('channelInput')
			.setLabel('In What Channel Do u Want to send it')
			.setStyle(TextInputStyle.Short)
			.setRequired(true);

		const descriptionInput = new TextInputBuilder()
			.setCustomId('descriptionInput')
			.setLabel('What do u want the description to be?')
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true);

		const colorInput = new TextInputBuilder()
			.setCustomId('colorInput')
			.setLabel('What color?')
			.setStyle(TextInputStyle.Short)
			.setPlaceholder('ffffff');

		const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
		const secondActionRow = new ActionRowBuilder().addComponents(channelInput);
		const thirdActionRow = new ActionRowBuilder().addComponents(descriptionInput);
		const someActionRow = new ActionRowBuilder().addComponents(colorInput);

		modal.addComponents(firstActionRow, someActionRow, secondActionRow, thirdActionRow);

		await interaction.showModal(modal);
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isModalSubmit) return;

	if (interaction.customId === 'embedModal') {
		await interaction.reply({ content: 'thank you, it should be posted shortly ', ephemeral: true });
	}
});

client.on('interactionCreate', interaction => {
	if (!interaction.isModalSubmit) return;

	if (interaction.customId === 'embedModal') {
		const titleInput = interaction.fields.getTextInputValue('titleInput');
		const colorInput = interaction.fields.getTextInputValue('colorInput');
		const channelInput = interaction.fields.getTextInputValue('channelInput');
		const descriptionInput = interaction.fields.getTextInputValue('descriptionInput');

		console.log(`${titleInput, colorInput, channelInput, descriptionInput} and the user is ${interaction.user.tag}`);

		const channalEmbed = client.channels.cache.get(channelInput);
		channalEmbed.send({
			embeds: [new EmbedBuilder()
				.setColor(`0x${colorInput}`)
				.setTitle(titleInput)
				.setDescription(descriptionInput)],
		});
	}
});

client.on('messageCreate', (message) => {
	if (message.content.includes('why is ur name lego?')) {
		message.channel.send({
			embeds: [ new EmbedBuilder().setColor(0xF34213).setTitle('Well Long Story Short').setDescription('i was young and didnt have money so me and my brother created a new minecraft acount together for him to use as an alt. but i didnt know a name and my brothers ign was LEGO2you (cos he likes legos (a lot)) so then the nme became LEGO4you. and i just didnt thought when i was creating a discord that it should be another name so it also became LEGO4you. so now its just LEGO4you everywhere cus changing it is way to much effort! ') ],
		});
	}
});

client.login(token);