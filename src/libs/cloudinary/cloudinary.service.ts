import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import Datauri from 'datauri';

cloudinary.config({
  cloud_name: 'datoerfte',
  api_key: '149266489869293',
  api_secret: 'H_u0WOubnzKnvftDl-W6jiw7xUA',
  secure: true,
});

@Injectable()
export class CloudinaryService {
  upload(file: Express.Multer.File, fileName: string) {
    const b64 = Buffer.from(file.buffer).toString('base64');
    let dataURI = 'data:' + file.mimetype + ';base64,' + b64;

    return cloudinary.uploader.upload(dataURI, {
      public_id: 'Expense Tracker' + '/' + 'Profile Pictures' + '/' + fileName,
    });
  }
}
