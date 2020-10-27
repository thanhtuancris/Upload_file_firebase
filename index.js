// const express = require('express')
// const bodyParser = require('body-parser')
// const multer = require('multer')
// const up = require('./helpers/helpers')
// require('dotenv').config();
// const app = express()

// const multerMid = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     // no larger than 5mb.
//     fileSize: 5 * 1024 * 1024,
//   },
// })

// app.disable('x-powered-by')
// app.use(multerMid.single('file'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))

// app.post('/uploads', async (req, res, next) => {
//   try {
//     const myFile = req.file
//     const imageUrl = await up.uploadImage(myFile)
//     res
//       .status(200)
//       .json({
//         message: "Upload was successful",
//         data: imageUrl
//       })
//   } catch (error) {
//     next(error)
//   }
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({
//     error: err,
//     message: 'Internal server error!',
//   })
//   next()
// })

// app.listen(9001, () => {
//   console.log('app now listening for requests!!!')
// })

//---------------------------------------------------------//


// var admin = require("firebase-admin");
// const uuid = require('uuid-v4');

// CHANGE: The path to your service account
// var serviceAccount = require("./config/keys.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: "lolserver-a0100.appspot.com"
// });

// var bucket = admin.storage().bucket();

// var filename = "./uploads"

// async function uploadFile() {

//   const metadata = {
//     metadata: {
//       // This line is very important. It's to create a download token.
//       firebaseStorageDownloadTokens: uuid()
//     },
//     contentType: 'image/png',
//     cacheControl: 'public, max-age=31536000',
//   };

//   // Uploads a local file to the bucket
//   await bucket.upload(filename, {
//     // Support for HTTP requests made with `Accept-Encoding: gzip`
//     gzip: true,
//     metadata: metadata,
//   });

// console.log(`${filename} uploaded.`);

// }

// uploadFile().catch(console.error);

//---------------------------------------------------------//

const {Storage} = require('@google-cloud/storage');
const express = require("express");
const path = require("path")
const app = new express();


const storage = new Storage({
    keyFilename: path.join(__dirname, './config/keys.json'),
 });

let bucketName = "lolserver-a0100.appspot.com"

let filename = './uploads/glacier-5120x2880-4k-5k-wallpaper-8k-ocean-ice-water-nature-sky-803.jpg';

// Testing out upload of file
const uploadFile = async() => {

    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
        },
});

console.log(`${filename} uploaded to ${bucketName}.`);
}

uploadFile();

app.listen(process.env.PORT || 8088, () => { console.log('node server running');})