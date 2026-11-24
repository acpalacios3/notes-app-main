import express from 'express'

const router = express.Router()

import Note from '../models/Notes.js'
import { authMiddleware } from '../utils/auth.js'

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /api/notes - Get all notes for the logged-in user
// THIS IS THE ROUTE THAT CURRENTLY HAS THE FLAW
router.get('/', async (req, res) => {

  try {

    // const notes = await Note.find({}); This currently finds all notes in the database.  
    //===========================================================
    // It should only find notes owned by the logged in user.
    //===========================================================
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/notes - Create a new note
router.post('/', async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      //===================================================
      // The user ID needs to be added here
      //===================================================
      user: req.user._id, // add the authenticated owner


    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT /api/notes/:id - Update a note
router.put('/:id', async (req, res) => {
  try {

    // This needs an authorization check
    // findByIdAndUpdate(): finds the product and updates it.
    // returnDocument: 'after' : returns the document after updating it.
    // { returnDocument: 'after' } is similar to { new: true }. It returns the updated document.
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }

    // ==========================================================================
    // return the notes where the user field matches the _id of the currently authenticated user (req.user._id)
    // =============================================================================
    if (note.user != req.user._id) {
      return res.status(403).json({ message: 'User is not authorized to update this note.' });
    }

    console.log('successfully updated a note');

    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/notes/:id - Delete a note
router.delete('/:id', async (req, res) => {
  try {
    // This needs an authorization check
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }
    res.json({ message: 'Note deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router