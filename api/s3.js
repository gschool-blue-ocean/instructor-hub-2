require('dotenv').config()
const fs = require('fs')

const S3= require('aws-sdk/clients/s3')
const bucketName= process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})
// uploads a files to s3
 function uploadFile(file) {
// creates a file stream using the fs.createReadStream method with the file path as an argument
    const fileStream= fs.createReadStream(file.path)
//sets up the parameters for uploading the file to S3 using the uploadParams object, which includes the bucket name, file stream as the body and file name as the key.
    const uploadParams = {
        Bucket : bucketName,
        Body : fileStream,
        Key : file.filename
    }
    //returns a promise returned by the s3.upload method, which uploads the file with the specified parameters to the S3 bucket.
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile
 // download image from s3

 function getFileStream(fileKey) {
    //The function takes a single argument, "fileKey", which represents the key of a file in an Amazon S3 bucket.
    const downloadParams ={
        Key: fileKey,
        Bucket : bucketName
    }
    //the "s3.getObject" method from the AWS SDK to retrieve the file with the specified key from the specified bucket. 
    //The "createReadStream" method is then called on the returned object to get a readable stream of the file contents.
    return s3.getObject(downloadParams).createReadStream()
 }
 exports.getFileStream = getFileStream