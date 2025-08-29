import fs from 'fs';
import path from 'path';

const LOG_DIR = path.resolve('logs');
const LOG_FILE = path.join(LOG_DIR, 'logs.txt');

// Ensure logs directory and file exist
function ensureLogFile() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, '', { flag: 'a' });
  }
}

// Write a log message to logs/logs.txt
export function logToFile(message) {
  ensureLogFile();
  const now = new Date();
  const logLine = `[${now.toISOString()}] ${message}\n`;

  // Prune old logs (older than 7 days)
  let logs = fs.readFileSync(LOG_FILE, 'utf8').split('\n').filter(Boolean);
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  logs = logs.filter(line => {
    const match = line.match(/^\[(.*?)\]/);
    if (!match) return false;
    const date = new Date(match[1]);
    return !isNaN(date) && date >= oneWeekAgo;
  });
  logs.push(logLine.trim());
  fs.writeFileSync(LOG_FILE, logs.join('\n') + '\n', 'utf8');
}

// Log connections
export let logConnection = (email, name, url, data) => {
  logToFile(`LogConnection: email=${email}, name=${name}, url=${url}, data=${JSON.stringify(data)}`);
};

export default logConnection;
