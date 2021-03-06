/**
 * @see {@url https://www.electronforge.io/configuration}
 */
module.exports = {
  /**
   * @see {@url https://electron.github.io/electron-packager/main/interfaces/electronpackager.options.html}
   */
  packagerConfig: {
    icon: './assets/icon.ico',
    appCopyright: 'Copyright (c) 2021 東京工業大学デジタル創作同好会traP',
    /**
     * @see {@url https://www.npmjs.com/package/electron-notarize#method-notarizeopts-promisevoid}
     */
    osxNotarize: {
      appleId: 'trapsysad@gmail.com',
      appleIdPassword: '@keychain:AC_PASSWORD',
    },
    /**
     * @see {@url https://www.npmjs.com/package/electron-osx-sign#opts---options}
     */
    osxSign: {
      identity: 'Developer ID Application: traP TokyoTech (3T86F866SY)',
      'hardened-runtime': true,
      'gatekeeper-assess': false,
    },
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'trap_collection',
        copyright: 'Copyright (c) 2021 東京工業大学デジタル創作同好会traP',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/renderer/index.html',
              js: './src/renderer/renderer.tsx',
              name: 'main_window',
              preload: {
                js: './src/preload/preload.ts',
              },
            },
          ],
        },
      },
    ],
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      platforms: ['win32', 'darwin'],
      config: {
        repository: {
          owner: 'traPtitech',
          name: 'trap-collection-launcher',
        },
        draft: false,
        prerelease: true,
      },
    },
  ],
};
