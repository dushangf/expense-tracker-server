import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (): any => {
    return v2.config({
      cloud_name: 'datoerfte',
      api_key: '149266489869293',
      api_secret: 'H_u0WOubnzKnvftDl-W6jiw7xUA',
      secure: true,
    });
  },
};
