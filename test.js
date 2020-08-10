function run() {
	var all_server_members = [
		{	userid: "1",
			nickname: "inv"		},
		{	userid: "2",
			nickname: "bot"		},
		{	userid: "3",
			nickname: "mike"	},
		{	userid: "4",
			nickname: "john trueman"	},
		{	userid: "5",
			nickname: "justin"	},
		{	userid: "6",
			nickname: "comm"	},
		{	userid: "7",
			nickname: "tac"	},
		{	userid: "1029",
			nickname: "achick"	}
	];
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
			voice_channel: "vc_A"	},
		{	userid: "6",
			voice_channel: "vc_A"	},
		{	userid: "7",
			voice_channel: "vc_A"	},
	];
	var old_nicks = [];
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
	console.log(target_users)
	// get list of objects { userids, orig_nicknames } using target_users list of ids
	old_nicks = all_server_members.filter(function(e) {
		return target_users.includes(e.userid);
	});
	console.log(old_nicks);
	knuth_shuffle(old_nicks);
	console.log(old_nicks);
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

run();