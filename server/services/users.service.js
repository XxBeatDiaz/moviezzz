import path from "path";
import { fileURLToPath } from "url";

import { readJSON, writeJSON } from "../DB/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, "../DB/users.json");

export async function getAllUsers() {
  const users = await readJSON(USERS_FILE)
  return users;
}

function getUserByIdInit(users, userId) {
  const user = users.find(u => u.id.toString() === userId.toString());
  return user;
}

export async function getUserById(userId) {
  const users = await getAllUsers();
  const user = users.find(u => u.id.toString() === userId.toString());
  return user;
}


export async function getUserByLogin(username, password) {
  const users = await getAllUsers();
  const user = users.find(
    u => u.username === username && u.password.toString() === password.toString()
  );
  return user;
}

export async function addToFavoriteList(userId, movieId) {
  console.log(userId, movieId);
  
  const users = await getAllUsers();
  const user = getUserByIdInit(users, userId);

  if (!user.moviesIds.includes(Number(movieId))) {
    user.moviesIds.push(Number(movieId));

    await writeJSON(USERS_FILE, users);
  }

  return user.moviesIds;
}

export async function removeFromFavoriteList(userId, movieId) {
  const users = await getAllUsers();
  const user = getUserByIdInit(users, userId);
  
  user.moviesIds = user.moviesIds.filter(
    mId => mId.toString() !== movieId.toString()
  );

  await writeJSON(USERS_FILE, users);

  return user.moviesIds;
}