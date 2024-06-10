import S3 from 'aws-sdk/clients/s3'

const bucketName = 'upload-s3-aws-kickstart-board';

const s3 = new S3({
    region: 'us-east-2',
    accessKeyId: process.env.ACCESS_KEY_ID_AWS,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
    signatureVersion: 'v4'
})

export const generateURLUpload = async (fileName: string) => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Expires: 60
    }

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL;
}