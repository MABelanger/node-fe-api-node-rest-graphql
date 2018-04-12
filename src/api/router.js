import express from 'express';
import { userRouter } from './resources/user';
import { songRouter } from './resources/song';
import { playlistRouter } from './resources/playlist';

export const router = express.Router();

router.use('/users', userRouter);
router.use('/songs', songRouter);
router.use('/playlists', playlistRouter);
