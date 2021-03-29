const PUBLIC_VAPID_KEY =
  "BAix4W0vdTra0DdZo8XbuyX6KkxuNDyJzALJrcb3Svmoju2Oyc8T1lZRkQUYsPeQBD6x0kU4KXaAQRVfPxO1i58";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const subscription = async () => {
  //Services worker
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });
  console.log("New Services Worker");

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });

  await fetch("/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("subscribed");
};

const form = document.querySelector("#myForm");
const message = document.querySelector("#message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("/newMessage", {
    method: "POST",
    body: JSON.stringify({
      message: message.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  form.reset();
});

subscription();
