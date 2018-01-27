@echo off
color a
title NodeJS Modules Installer
cls
echo Welcome to the NodeJS Modules Installer!
echo This program installs the necesary modules that this discord bot needs!
pause
goto stageOne

:stageOne
echo Preparing to install discord.js...
npm install discord.js
pause
goto stageTwo

:stageTwo
echo Preparing to install ms
npm install ms
pause
goto end

:end
echo Packages successfully installed! You must now go to https://discordapp.com/developers/applications/me and create an app for your bot!
echo After you have created the app, authorize it to your server and insert the bot's token in the botconfig.json file.
pause
