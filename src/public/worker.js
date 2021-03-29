console.log("Services Worker");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log(data);
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: "https://carone.dealerprox.com/static/logo.svg",
  });
});
