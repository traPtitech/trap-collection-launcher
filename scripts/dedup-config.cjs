const fs = require('fs');
const path = require('path');

// config.json のパス
const configPath = path.join(
  process.env.APPDATA || '',
  'trap-collection',
  'config.json'
);

console.log(`Reading config from: ${configPath}`);

// config.json を読み込む
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

console.log(`Total games before deduplication: ${config.gameInfo.length}`);

// 同じIDを持つゲームのうち、最も後にあるものだけを残す
const seenIds = new Set();
const deduplicatedGames = [];

// 配列を逆順で処理して、IDが初めて出現するものだけを保持
for (let i = config.gameInfo.length - 1; i >= 0; i--) {
  const game = config.gameInfo[i];
  if (!seenIds.has(game.id)) {
    seenIds.add(game.id);
    deduplicatedGames.unshift(game); // 元の順序を保つため先頭に追加
  } else {
    console.log(`Removing duplicate: ${game.name} (id: ${game.id}, version: ${game.version.name})`);
  }
}

config.gameInfo = deduplicatedGames;

console.log(`Total games after deduplication: ${config.gameInfo.length}`);

// バックアップを作成
const backupPath = configPath + '.backup';
fs.copyFileSync(configPath, backupPath);
console.log(`Backup created at: ${backupPath}`);

// 結果を書き戻す
fs.writeFileSync(configPath, JSON.stringify(config, null, '\t'), 'utf-8');
console.log(`Config updated successfully!`);
