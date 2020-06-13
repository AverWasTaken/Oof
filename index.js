const config = require("./config.json");
const colors = require("./color.json");
const Discord = require("discord.js");
const superagent = require("superagent");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async() =>{
    console.log(`${bot.user.username} is online` );
    bot.user.setActivity("With commands!", {type: "STREAMING"});
})

bot.on("message", async message => {
    if(message.author.bot || message.channel.type == "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split("  ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}info`){
        let sEmbed = new Discord.MessageEmbed()
        .setColor(colors.pink)
        .setTitle("***Info***")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**",`${message.guild.name}`, true)
        .addField("**Guild Owner:**",`${message.guild.owner}`, true)
        .addField("**Members:**", `${message.guild.memberCount}`, true)
        .addField("**Roles**", `${message.guild.roles.name}`, true)
        .setFooter(`TestBot:tm:z | Created by Aver#001`, message.guild.iconURL);
        message.channel.send({embed: sEmbed});
    }




    if(cmd === `${prefix}count`){
        message.channel.send(`There are, **${message.guild.memberCount}** member's in **${message.guild.name}**!`);
    }



    if(cmd === `${prefix}cat`){
        let msg = await message.channel.send("Generating...")

        let {body} = await superagent
        .get(`http://aws.random.cat/meow`)
        //console.log(body.file)
        if(!{body}) return message.channel.send("Im DB, and im a crashaholic. Please try again!")

            let cEmbed = new Discord.MessageEmbed()
            .setColor(colors.pink)
            .setAuthor(`DB CATS`, message.guild.iconURL)
            .setImage(body.file)
            .setTimestamp()
            .setFooter(`Cats are cool!`, bot.user.displayAvatarURL)

            message.channel.send({embed: cEmbed})

            msg.delete();
    }
    
    if(cmd === `${prefix}dog`){
        let msg = await message.channel.send("Generating...")

        let {body} = await superagent
        .get(`https://dog.ceo/api/breeds/image/random`)
        //console.log(body.file)
        if(!{body}) return message.channel.send("Im DB, and im a crashaholic. Please try again!")

            let dEmbed = new Discord.MessageEmbed()
            .setColor(colors.pink)
            .setAuthor(`DB DOGGOS`, message.guild.iconURL)
            .setImage(body.message)
            .setTimestamp()
            .setFooter(`Dogs are also cool!`, bot.user.displayAvatarURL)

            message.channel.send({embed: dEmbed})

            msg.delete();
    }

    if(cmd === `${prefix}help`){
        message.channel.send("```!dog | !cat | !count | !info | !proof, for all you h8ers out there |```")
    }

    if(cmd === `${prefix}proof`){
        message.channel.send(`${bot.user.username}, was coded by ***Aver#0001***. get reked, ${message.author}, omegalul`)
    }

    if(cmd === `${prefix}omegalul`){
        message.channel.send("indeed")
    }
         


})

bot.login(config.token);
