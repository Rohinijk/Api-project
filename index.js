
const startScreen = document.getElementById("start-screen");
const mainContent = document.getElementById("main-content");
const startButton = document.getElementById("start-btn");

startButton.addEventListener("click", () => {
  
  startScreen.style.display = "none";

  mainContent.style.display = "block";
});

const dogSelector = document.getElementById("dog-selector");
const generateButton = document.getElementById("btn");
const jokeContent = document.getElementById("jokecontent");
const joke = document.getElementById("joke");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userPic = document.getElementById("user-pic");
const dogImage = document.getElementById("image");



dogSelector.addEventListener("change", () => {
  generateButton.disabled = !dogSelector.value; 
});

generateButton.addEventListener("click", async () => {
  const selectedDog = dogSelector.value;
  if (!selectedDog) return alert("Please select a dog name!");

  try {
    const jokeResponse = await axios.get("https://official-joke-api.appspot.com/random_joke");
    jokeContent.textContent = `Setup: ${jokeResponse.data.setup}`;
    joke.textContent = `Punchline: ${jokeResponse.data.punchline}`;
  } catch (error) {
    jokeContent.textContent = "Failed to load joke.";
    joke.textContent = "";
  }

  try {
    const userResponse = await axios.get("https://randomuser.me/api/");
    const user = userResponse.data.results[0];
    userName.textContent = `Name: ${user.name.first} ${user.name.last}`;
    userEmail.textContent = `Email: ${user.email}`;
    userPic.src = user.picture.large;
  } catch (error) {
    userName.textContent = "Failed to load user details.";
    userEmail.textContent = "";
    userPic.src = "user.jpg";
  }

  try {
    const dogResponse = await axios.get("https://dog.ceo/api/breeds/image/random");
    dogImage.src = dogResponse.data.message;
  } catch (error) {
    dogImage.src = "dog.jpg"; 
  }
});
