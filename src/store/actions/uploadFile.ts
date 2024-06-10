import Card from '@/typings/card';
import { API_MOCK } from '@/service/mock';
import { generateURLUpload } from '@/service/s3';
import axios from 'axios';

export const uploadFile = async function (this: any, card: Card, acceptFile: File) {
  const { id } = card;

  const uploadURL = await generateURLUpload(acceptFile.name);
  await axios.put(uploadURL, acceptFile, { headers: { 'Content-Type': 'image/png; image/jpeg;' } })

  await API_MOCK
    .put(`/api/cards/${id}`, { file: { name: acceptFile.name, url: uploadURL.split('?')[0] } })
    .then(({data}) => {
      this.showNotification('File was sucessfully uploaded', false);
      this.activeCard = data;
    })
    .catch(() => {
      this.showNotification('There was an error uploading file', true);
    });
};
