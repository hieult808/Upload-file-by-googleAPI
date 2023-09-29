const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '230463840132-i1jv2tslt4die46te10j3dkfdom9349k.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//04J3xQwc812XmCgYIARAAGAQSNwF-L9IrA5XPNlXlQdNU2VwiiksMf9nVlhMs-_klwyoy9brwH3x1O1WjgQlDXGzembk42M8jcT8'

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials(
    {refresh_token : REFRESH_TOKEN}
)

const drive = google.drive({
    version : 'v3',
    auth: oauth2Client
})

const filePath = path.join(__dirname, 'z1794611983850_b2a6a19a040c91457438eeda499874f3_49eccbd397a3493a80c1ab2674068a9f_grande.webp')

async function uploadFile(){
    try{
        const respone = await drive.files.create({
            requestBody : {
                name : 'banhChuoi.webp',
                mimeType : 'image/webp'
            },
            media : {
                mimeType : 'image/webp',
                body : fs.createReadStream(filePath)
            }
        })
        console.log(respone.data)
    }catch(error){
        console.log(error.message)
    }
}

async function deleteFile(){
    try {
        const respone = await drive.files.delete({
            fileId : ''
        })
        console.log(respone.data, respone.status)
    } catch (error) {
        console.log(error.message)
    }
}

async function generatePublicUrl(){
    try {
        const fileId = '10LJjXvjUmD-3behpqFRmZAQ-so_9bByT'
        await drive.permissions.create({
            fileId : fileId,
            requestBody : {
                role : 'reader',
                type : 'anyone'
            }
        })
        const result = await drive.files.get({
            fileId : fileId,
            fields : 'webViewLink, webContentLink'
        }) 
        console.log(result.data)
    } catch (error) {
        console.log(error.message)
    }
}

//uploadFile();
// deleteFile();
generatePublicUrl();