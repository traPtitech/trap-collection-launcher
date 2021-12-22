# trap-collection-launcher

## Development

```bash
npm i
npm run start
```

## Production

```bash
npm i
npm run publish
```

## Make Installer

```bash
npm i
npm run make
```

## Publish to GitHub

Create a new _GitHub Personal Access Token_ in GitHub.
Select scopes: `repo` and `write:packages`.
URL: <https://github.com/settings/tokens/new>

```bash
npm i
cp .env.example .env
```

Edit `.env` file and add your _GitHub Personal Access Token_.
Set `KOUDAISAI` to `true` or `false` to enable or disable Koudaisai mode.

Update version number in `package.json` file if you need.

```bash
git add .
git commit -m "v1.x.x" # EDIT!
git push # or create PR
npm run publish
```
