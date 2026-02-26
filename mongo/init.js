db.createCollection("health_check");

db.health_check.insertOne({
  status: "ok",
  createdAt: new Date()
});