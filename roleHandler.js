const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const didNotReadFAQRoleName = 'did not read FAQ';
    const approvedRoleName = '.approved';

    const didNotReadFAQRole = newMember.roles.cache.find(role => role.name === didNotReadFAQRoleName);
    if (didNotReadFAQRole) {
        const approvedRole = newMember.roles.cache.find(role => role.name === approvedRoleName);
        if (approvedRole) {
            await newMember.roles.remove(approvedRole).catch(console.error);
            console.log(`Removed "${approvedRoleName}" from ${newMember.displayName} for receiving "${didNotReadFAQRoleName}"`);

            try {
                await newMember.send("Permissions to view and access the Adele Discord have been removed for not checking the FAQ before asking a question in it. Access to the FAQ will be left untouched. If you would like to access the server again, feel free to leave and rejoin to get reapproved.");
                console.log(`Message sent to ${newMember.displayName}`);
            } catch (error) {
                console.error(`Could not send DM to ${newMember.displayName}: ${error}`);
            }
        }
    }
});


// Login to Discord
client.login('MTIwODUwMjY1MDY2OTEwOTMxOA.GDnqXz.IlN_L9TomvWCjLBPLQFbmBtxsqdeM2JP4kHxGE');
