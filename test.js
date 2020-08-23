var all_server_members = [
	{	userid: "1",
		nickname: "inv"		},
	{	userid: "2",
		nickname: "bot"		},
	{	userid: "3",
		nickname: "mike"	},
	{	userid: "4",
		nickname: "johntrueman"	},
	{	userid: "5",
		nickname: "justin"	},
	{	userid: "6",
		nickname: "comm"	},
	{	userid: "7",
		nickname: "tac"	},
	{	userid: "8",
		nickname: "hunson"	},
	{	userid: "9",
		nickname: "rocket"	},
	{	userid: "10",
		nickname: "bear"	},
	{	userid: "11",
		nickname: "nate"	},
	{	userid: "12",
		nickname: "apollo"	},
	{	userid: "13",
		nickname: "mantis"	},
	{	userid: "14",
		nickname: "weeb"	},
	{	userid: "15",
		nickname: "furry"	},
	{	userid: "1029",
		nickname: "yoako"	}];
var all_active_vc_sessions = [
	{	userid: "1",
		voice_channel: "vc_A"	},
	{	userid: "2",
		voice_channel: "vc_B"	},
	{	userid: "3",
		voice_channel: "vc_A"	},
	{	userid: "4",
		voice_channel: "vc_A"	},
	{	userid: "5",
		voice_channel: "vc_B"	},
	{	userid: "6",
		voice_channel: "vc_A"	},
	{	userid: "7",
		voice_channel: "vc_A"	},
	{	userid: "8",
		voice_channel: "vc_A"	},
	{	userid: "9",
		voice_channel: "vc_A"	},
	{	userid: "10",
		voice_channel: "vc_A"	},
	{	userid: "11",
		voice_channel: "vc_A"	},
	{	userid: "12",
		voice_channel: "vc_A"	},
	{	userid: "13",
		voice_channel: "vc_A"	},
	{	userid: "14",
		voice_channel: "vc_A"	}];

var fs = require('fs');
function telephone_tests() {
	var user_dicts = [];
	// get user's current vc
	const target_vc_id = "vc_A";
	// get all active vc sessions
	// make list/dictionary for every user in specified vc
	var target_vc_sessions = all_active_vc_sessions.filter(function (obj) {
		return obj.voice_channel === target_vc_id;
	});

	var target_users = [];
	target_vc_sessions.forEach(function(e) {
		target_users.push(e.userid);
	});

console.group("Target User IDs");
console.log(target_users)
console.groupEnd();

	// get list of objects { userids, orig_nicknames } using target_users list of ids
	user_dicts = all_server_members.filter(function(e) {
		return target_users.includes(e.userid);
	});

console.group("User Order Shuffle");
console.dir(user_dicts);
	knuth_shuffle(user_dicts);
console.groupEnd();

console.group("Python enumerate Test");
	// TODO: IDEA | give users option of how to wrap counter/order index
	for (const [index, elem] of user_dicts.entries()) {
		// user_dicts[index].newname = String("[" + (index+1) + "] " + elem.nickname);
		user_dicts[index].newname = index_string(index, elem);
	}
console.dir(user_dicts);
console.groupEnd();
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

function art_prompt_gen(message) {
	// KISS: character names and simple verbs
	var dict = JSON.parse(readFile('_myfile.json'));
	var nextdict = {};

	for (var key in dict) {
		randomIndex = Math.floor(Math.random() * dict[key].length);
		nextdict[key] = dict[key][randomIndex]
	}

	art_prompt_print(message, nextdict)
}

function readFile(filename) {
	return fs.readFileSync(filename).toString();
}

function art_prompt_print(message, prompt_dictionary) {
	var str = "Art Prompt: ";
	for (var prompt in prompt_dictionary) {
		str += prompt_dictionary[prompt] + " ";
	}
	// message.channel.send(str);
	console.log(str);
}

art_prompt_gen();
// telephone_tests();