import aws from 'aws-sdk'

const bucketName = 'upload-s3-aws-kickstart-board';

//In real application - use as environmnent variables
const s3 = new aws.S3({
    region: 'us-east-2',
    accessKeyId: 'AKIAVRUVRWCLGTUA74HK',
    secretAccessKey: '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',
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