const EventEmitter = require("events");

class NotificationSystem extends EventEmitter {}

const notifications = new NotificationSystem();




notifications.on("userLoggedIn", (user) => {
  console.log(`> User ${user} logged in`);
});


notifications.on("userLoggedIn", (user) => {
  console.log(`> Notification sent to ${user}`);
});


notifications.on("messageReceived", ({ from, to, message }) => {
  console.log(`> Message received for ${to} from ${from}: "${message}"`);
});


notifications.on("dataSyncStart", (user) => {
  console.log(`> Syncing data for ${user}...`);
});


notifications.on("dataSyncComplete", (user) => {
  console.log(`> Data sync complete for ${user}`);
});



function simulateWorkflow() {
  const user = "John";

  // 1. User Login
  setTimeout(() => {
    notifications.emit("userLoggedIn", user);

    // 2. Message Received
    setTimeout(() => {
      notifications.emit("messageReceived", {
        from: "Admin",
        to: user,
        message: "Welcome back!",
      });

      // 3. Start Data Sync
      setTimeout(() => {
        notifications.emit("dataSyncStart", user);

        // 4. Data Sync Complete
        setTimeout(() => {
          notifications.emit("dataSyncComplete", user);
        }, 1500);

      }, 1500);
    }, 1500);
  }, 1000);
}

// Run the simulation
simulateWorkflow();
