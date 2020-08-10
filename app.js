// init
require('dotenv').config();								// reads vars from .env and makes them usable in process.env
var express = require("express");						// express, runs practically everything here
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// discord
const Discord = require("discord.js");
const bot = new Discord.Client();

// bot behavior
bot.on("ready", () => {
	console.log(`logged in as ${bot.user.tag}`);
});

bot.on("message", message => {
	let msg = message.content;
	let usr = message.member;
	let server = usr.guild;

	// commands
	if (msg.substring(0,1) == "+") {					// cmd prefix | ex: !brushie
		// arguments
		let str = msg.substring(1,msg.length);			// rest of command
		let args = str.split(" ");						// split into words
		let cmd = args[0];								// main command = first word
		args.splice(0,1);								// removes the command from args array to free args[0]

		switch (cmd) {
			case "brushie":								// +brushie
				message.channel.send("*scrunch*");
				break;
			case "recordChat":							// +recordChat [filename arg]
				// file management (file-system module?)
					// if file exists: warn and abort
					// else create filename.txt
				TODO: "start recordChat here"

				// while(1):
					// iterate through chat history
					// iterate through audit log
					// figure out which iter came first
					// write into filename.txt
					// loop until complete
				break;
			case "telephone":							// +telephone [start/stop]
			TODO: "figure out storing these vars"
				var all_server_members = [];
				var all_active_vc_sessions = [];
				var old_nicks = [];
				if (args[0] == "start") {				// +telephone start
					try {
						// get user's current vc
						const target_vc_id = usr.voice.channel.id;
						// get all users in server and all active vc states
						server.members.cache.map(function (usr) {
							let id = usr.id;
							let nick = usr.nickname;
							all_server_members.push({
								userid: id,
								nickname: nick
							});
						});
						server.voiceStates.cache.map(function (state) {
							let id = state.member.user.id;
							let chan = state.channel.id;
							all_active_vc_sessions.push({
								userid: id,
								voice_channel: chan
							});
						});
						// filter vc states to only include those from user's current vc
						var target_vc_sessions = all_active_vc_sessions.filter(function (obj) {return obj.voice_channel === target_vc_id;});
						// extract list of userids from target vc states
						var target_users = [];
						target_vc_sessions.forEach( function(e) {
							target_users.push(e.userid);
						});
						// get list of objects { userids, orig_nicknames } using target_users list of ids
						old_nicks = all_server_members.filter(function(e) {
							return target_users.includes(e.userid);
						});
						// randomize order and create new nick strings
						console.log(old_nicks);
						knuth_shuffle(old_nicks);
						console.log(old_nicks);
						// rename: https://discord.com/developers/docs/resources/user#modify-current-user
						// dictionary for every user id and original nickname?
					} catch (e) {
						message.channel.send("error in +telephone start, yell at invert to fix it (and tell him exactly what happened)");
						console.error(e);
					}
				} else if (args[0] == "stop") {			// +telephone stop
					for (var key in vcUsers) {
						// rename each user with nickname from dictionary
					}
				} else message.channel.send("Usage: while in a voice channel: +telephone [start/stop]");
				break;
		}
	}

	// // reply to ANY MESSAGE from EVERY USER
	// else if (message.author.id != "739970709857763441") {
	// 	//Replace this number with your bot's user ID
	// 	let channel = message.channel.name; //Channel name

	// 	if (msg == "hello bot") {
	// 		//If someone says "hello bot",
	// 		message.channel.send("hello hooman"); //say "hello hooman"
	// 	}
	// }
});

bot.login(process.env.TOKEN);

	// // use the 'public' directory // http://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"));

	// // use index.html in views // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (request, response) {
// 	response.sendFile(__dirname + "/views/index.html");
// });

function knuth_shuffle(array) {	// https://github.com/coolaj86/knuth-shuffle
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function test() {
	var arr = [];
	arr["asdf"] = "1234";
	arr["jkl"] = "6456";
	console.log(arr);
	arr.filter(b => arr[b] != "1234")
	console.log(arr);
}