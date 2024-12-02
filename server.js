const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const moment = require('moment'); // For date handling
const cron = require('node-cron');

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = "mongodb+srv://stonerram488:114u181m@cluster0.fo9otxm.mongodb.net/bmsa?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Movie schema and model
const movieSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

const eventCategorySchema = new mongoose.Schema({
  name: String,
  eventCount: Number,
  imageUrl: String,
});

const EventCategory = mongoose.model('EventCategory', eventCategorySchema);

const premiereSchema = new mongoose.Schema({
  title: String,
  imageURL: String,
  year: Number,
  language: String,
  is4K: Boolean,
});

const Premiere = mongoose.model('Premiere', premiereSchema);

const musicStudio = new mongoose.Schema({
  title:String,
  image:String,
  venue:String,
  course:String,
  place:String,

});

const MusicStudio = mongoose.model('MusicStudio', musicStudio);

const outDoorEvents = new mongoose.Schema({
  title:String,
  image:String,
  place:String,
});

const OutDoorEvents = mongoose.model('OutDoorEvents', outDoorEvents);

const laughterTherapy = new mongoose.Schema({
  title:String,
  image:String,
  place:String,
});

const LaughterTherapy = mongoose.model('LaughterTherapy', laughterTherapy);

app.get("/api/laughter_therapy", async (req,res) =>{
  const laughTherapy = await LaughterTherapy.find();
  res.json(laughTherapy);
})

const papularEvents = new mongoose.Schema({
  title:String,
  image:String,
  place:String,
});

const PapularEvents = mongoose.model('PapularEvents', papularEvents);

const latestPlay = new mongoose.Schema({
  title:String,
  image:String,
  place:String,
});

const LatestPlay = mongoose.model('LatestPlay', latestPlay);

const sportsWay = new mongoose.Schema({
  title:String,
  image:String,
  place:String,
  date:String,
});

const SportsWay = mongoose.model('SportsWay', sportsWay);

app.get("/api/sports_way", async (req,res) =>{
  const sports = await SportsWay.find();
  res.json(sports);
})


app.get("/api/latest_play", async (req,res) =>{
  const latestPlays = await LatestPlay.find();
  res.json(latestPlays);
})

app.get("/api/papular_events", async (req,res) =>{
  const papularEvents = await PapularEvents.find();
  res.json(papularEvents);
})


app.get ('/api/out_door_events', async (req,res) =>{
  const outDoorEvent = await OutDoorEvents.find();
  res.json(outDoorEvent);
})

app.get('/api/music-studio', async (req,res) => {
  const musicStudios = await MusicStudio.find();
  res.json(musicStudios)
})

app.get('/api/premieres', async (req, res) => {
  const premieres = await Premiere.find();
  res.json(premieres);
});

app.get('/liveevents', async (req, res) => {
  const categories = await EventCategory.find();
  res.json(categories);
});

const Movie = mongoose.model("Movie", movieSchema);

// API route to get all movies (including ads)
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// API route to add a new movie with an advertisement poster
app.post("/api/movies", async (req, res) => {
  try {
    const { name, image, description } = req.body;

    const newMovie = new Movie({
      name,
      image,
      description,
    });

    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: "Failed to add movie" });
  }
});

// Advertisement schema and model
const adSchema = new mongoose.Schema({
  adsposter: String, // Store only the ad poster image URL
  createdAt: { type: Date, default: Date.now } // Automatically store the date when the ad is created
});

const Advertisement = mongoose.model('Advertisement', adSchema);

// API route to get all advertisements
app.get("/api/ads", async (req, res) => {
  try {
    const ads = await Advertisement.find(); // Get all advertisements
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch advertisements" });
  }
});

// API route to add a new advertisement
app.post("/api/ads", async (req, res) => {
  try {
    const { adsposter } = req.body;

    // Create new advertisement document
    const newAd = new Advertisement({
      adsposter, // Only add the adsposter field
    });

    await newAd.save();
    res.status(201).json(newAd);
  } catch (err) {
    res.status(500).json({ error: "Failed to add advertisement" });
  }
});

// Function to delete advertisements older than a specific date
const deleteAdData = async (dateToDelete) => {
  try {
    // Convert the date to IST using moment
    const istDate = moment(dateToDelete).tz('Asia/Kolkata').startOf('day'); // Start of the day in IST
    console.log(`Deleting ads created before: ${istDate.format('YYYY-MM-DD HH:mm:ss')}`);

    // Perform the deletion in the database
    const result = await Advertisement.deleteMany({ createdAt: { $lt: istDate.toDate() } });

    if (result.deletedCount > 0) {
      console.log(`${result.deletedCount} advertisements deleted successfully!`);
    } else {
      console.log('No advertisements found to delete.');
    }
  } catch (error) {
    console.error('Error deleting advertisement data:', error);
  }
};

// Define an API route to trigger the deletion manually
app.get('/delete-ads', async (req, res) => {
  const dateToDelete = '2024-12-01T00:00:00'; // Example date in UTC format
  await deleteAdData(dateToDelete); // Perform deletion based on the provided date
  res.send('Advertisement data deletion process completed.');
});

// Automatically trigger advertisement deletion every day at midnight IST using cron
cron.schedule('0 0 * * *', async () => {
  const dateToDelete = moment().tz('Asia/Kolkata').subtract(1, 'days').format('YYYY-MM-DDT00:00:00'); // Previous day midnight in IST
  await deleteAdData(dateToDelete); // Perform automatic deletion
  console.log('Scheduled advertisement data deletion completed.');
});




// Start the server
const PORT = 1141;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
