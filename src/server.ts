import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { filter } from 'bluebird';

(async () => {
  const app = express();
  const port = process.env.PORT || 8082;
  
  app.use(bodyParser.json());
 
  app.get( "/filteredimage", async ( req:Request, res:Response ) => {
    let imageUrl: string = req.query.image_url;

    if(!imageUrl) {
      return res.status(400).send("Please provide an image URL");
    }
    let filteredImage: string = await filterImageFromURL(imageUrl);

    res.status(200).sendFile(filteredImage, {}, async (err) => {
      if (err) {
        throw new Error('The file transfer failed'); 
      }
      await deleteLocalFiles([filteredImage]);
    });
  });

  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();