// init
require('dotenv').config();								// reads vars from .env and makes them usable in process.env
var express = require("express");						// express, runs practically everything here
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// discord
const Discord = require("discord.js");
const bot = new Discord.Client();

// telephone globals
var all_server_members = [];
var all_active_vc_sessions = [];
var user_dicts = [];

// bot behavior
bot.on("ready", () => {
	console.log(`logged in as ${bot.user.tag}`);
});

bot.on("message", function(message) {
	let msg = message.content;

	// commands
	if (msg.substring(0,1) == "+") {	// cmd prefix | ex: !brushie
		// arguments
		let str = msg.substring(1,msg.length);	// rest of command
		let args = str.split(" ");				// split into words
		let cmd = args[0];	// main command = first word
		args.splice(0,1);	// removes the command from args array to free args[0]

		switch (cmd) {
			case "brushie":		// +brushie
				message.channel.send("*scrunch*");
				break;
			case "recordChat":	// +recordChat [filename arg]
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
			case "telephone":	// +telephone [start/stop]
			// TODO: "figure out storing these vars permanently. a global var with these CAN'T be best practice..."
			// TODO: test in context of live server
			if (args[0] == "start") {	// +telephone start
				telephone_start(message);
			} else if (args[0] == "stop") {	// +telephone stop
				telephone_stop(message);
			}
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

// use the 'public' directory // http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// // use index.html in views // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (request, response) {
// 	response.sendFile(__dirname + "/views/index.html");

function telephone_start(message) {
	let usr = message.member;
	let server = usr.guild;

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
		user_dicts = all_server_members.filter(function(e) {
			return target_users.includes(e.userid);
		});

		// randomize order
		knuth_shuffle(user_dicts);

		// create new nick strings and add to user object list
		// rename users during new nick creation
		// NOTE: found python's enumerate equivalent in js, nice
		// TODO: IDEA | give users choice of counter/order index wrap
		// (1) [1] <1>
		for (const [index, elem] of user_dicts.entries()) {
			var tmp = index_string(index, elem);
			user_dicts[index].newname = tmp;
			// message.guild.members.get(user_dicts[index].id).setNickname(tmp);
			server.members.get(user_dicts[index].id).setNickname(tmp);
		}

	} catch (e) {
		message.channel.send("error in +telephone start, yell at invert to fix it (and tell him exactly what happened)");
		console.error(e);
	}
}

function telephone_stop(message) {
	let server = message.member.guild;

	if (user_dicts != null) {
		user_dicts.forEach(function(e) {
			server.members.get(e.id).setNickname(e.nickname);
		});
	} else message.channel.send("Usage: while in a voice channel: +telephone [start/stop]");
	break;
}

function art_ideas() {
	// get the twitter bot assignment from har271 laptop repo
}

function index_string(index, elem) {
	var str = "";
	if (index < 9) {
		str = '[0' + (index+1) + ']' + elem.nickname;
	} else {
		str = '[' + (index+1) + ']' + elem.nickname;
	}
	return str;
}

function knuth_shuffle(array) {	// https://github.com/coolaj86/knuth-shuffle
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there rem	ain elements to shuffle...
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