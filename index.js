const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    dialog,
} = require('electron')
const fs = require('fs')
const url = require('url')
const path = require('path')



function createWindow() {
    win = new BrowserWindow({
        width: 800, height: 600,
    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
    }))
}



app.on('ready', function () {
    createWindow()
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Window',
                    click: function () {
                        console.log('click new window')

                    },
                },
                {
                    label: 'Open File',
                    click: function () {
                        console.log('cilck open file')

                        console.log(dialog.showOpenDialog({
                            properties: ['openFile', 'multiSelections'],
                            filters: [
                                { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
                                { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
                                { name: 'Custom File Type', extensions: ['as'] },
                                { name: 'All Files', extensions: ['*'] }
                            ]
                        },
                        ))
                    },
                    
                },
                {
                    label: 'Open Folder',
                    click: function () {
                        console.log('click open folder')
                        console.log(dialog.showOpenDialog({
                            properties: ['openDirectory', 'multiSelections']
                        }))
                    },
                }
            ]
        },
        {
            label: 'User',
            submenu: [
                {
                    label: 'User Password',
                    click: function () {
                        console.log('Admin')
                    }
                }
            ],
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Learn More',
                    click() { require('electron').shell.openExternal('https://www.facebook.com/NeungWei') }
                }
            ],
        }
    ]
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
})