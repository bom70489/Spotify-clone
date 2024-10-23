import express from 'express'
import { addAlbum , listAlbum , removeAlbum } from '../controllers/albumController.js'
import upload from '../middleware/multer.js'

const AlbumRouter = express.Router() 

AlbumRouter.post('/add' , upload.single('image') , addAlbum)
AlbumRouter.get('/list' , listAlbum)
AlbumRouter.post('/remove' , removeAlbum)

export default AlbumRouter