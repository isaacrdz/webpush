const { Router } = require("express");
const router = Router();

const webpush = require("../webpush");

let pushSubscription;

router.post("/subscription", async (req, res) => {
  pushSubscription = req.body;
  res.status(200).json();
});

router.post("/newMessage", async (req, res) => {
  const { message } = req.body;

  const payload = JSON.stringify({
    title: "DealerProX",
    message: message,
  });

  try {
    await webpush.sendNotification(pushSubscription, payload);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
