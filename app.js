var tmi = require('tmi.js');

var options = {
  options: {
  debug: true
 },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    username: "twitchexpandbot",
    password: "oauth:6893d71oq7soev0i3rxtw9p1jip3z4"
  },
  channels: ["DoggeXL"]
};

var client = new tmi.client(options);
client.connect();

client.on('connected', function(address, port){
  client.action("DoggeXL", "I'm all setup and ready to be used")
  console.log('[twitchexpandbot] is in use!')
});

client.on('disconnected', function(reason) {
  client.action("....Disconnected")
});

client.on('chat', function(channel, user, message, self){
  if (message === "!roll") {
    client.action("DoggeXL", "You rolled a " + dice() + "!");
  }
  if (message === "!spam") {
    client.action("DoggeXL", spam());
  }
  if (message === "!mod" && user.mod) {
    client.say("DoggeXL", "Your a mod!")
  }
  if (message === "!mod" && !user.mod) {
    client.say("DoggeXL", "Your not a mod!")
  }
  if (message === "!mods") {
    client.on("mods", function (channel, mods) {
     client.action("DoggeXL", "Current mods " + mods);
   });
  }
});

client.on("mod", function (channel, username) {
    client.action("DoggeXL", username + " Added as mod");
});

client.on("mods", function (channel, mods) {
 client.action("DoggeXL", "Current mods " + mods);
});


function dice() {
  return Math.floor((Math.random() * 6) + 1);
}

function spam() {
  var spam = "Kappa "
  return spam.repeat(5);
}
