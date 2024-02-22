const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages, // This allows the bot to send direct messages to users.
    ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const didNotReadFAQRoleName = 'did not read FAQ';
    const approvedRoleName = '.approved';

    // Check if the new member state has the "did not read FAQ" role.
    const didNotReadFAQRole = newMember.roles.cache.find(role => role.name === didNotReadFAQRoleName);
    if (didNotReadFAQRole) {
        // Check if the user already has the ".approved" role.
        const approvedRole = newMember.roles.cache.find(role => role.name === approvedRoleName);
        if (approvedRole) {
            // Remove the ".approved" role.
            await newMember.roles.remove(approvedRole).catch(console.error);
            console.log(`Removed "${approvedRoleName}" from ${newMember.displayName} for receiving "${didNotReadFAQRoleName}"`);

            // Send a direct message to the user.
            try {
                await newMember.send("Permissions to view and access the Adele Discord have been removed for not checking the FAQ before asking a question in it. Access to the FAQ will be left untouched. If you would like to access the server again, feel free to leave and rejoin to get reapproved.");
                console.log(`Message sent to ${newMember.displayName}`);
            } catch (error) {
                console.error(`Could not send DM to ${newMember.displayName}: ${error}`);
            }
        }
    }
});
