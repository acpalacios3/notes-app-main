import express from 'express'

const router = express.Router()

import Note from '../models/Notes.js'
import { authMiddleware } from '../utils/auth.js'

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// Filter “Get All Notes”: Modify the GET / route. Instead of returning all notes in the database, it should now only return the notes where the user field matches the _id of the currently authenticated user (req.user._id).
// GET /api/notes - Get all notes for the logged-in user
// THIS IS THE ROUTE THAT CURRENTLY HAS THE FLAW
router.get('/:id', async (req, res) => {

  try {

    // const notes = await Note.find({}); This currently finds all notes in the database.  
    //===========================================================
    // GET /:id route note, apply the same ownership check there as well
    //===========================================================
    const notes = await Note.findById(req.params.id);

    if (!notes) {
      return res.status(404).json({ message: 'No note found with this id!' });

    }

    if (notes.user != req.user._id) {
      return res.status(403).json({ message: 'User is not authorized to access this note.' });
    }

    res.json(notes);
  } catch (err) {
    console.error(err);
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


// 2. Secure “Update Note”: Modify the PUT /:id route. Before updating a note, you must first find the note by its ID. Then, check if the user field on that note matches the authenticated user’s _id.
// If they match, proceed with the update.
// If they do not match, return a 403 Forbidden status with an error message like "User is not authorized to update this note."

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



// 3. Secure “Delete Note”: Modify the DELETE /:id route. Similar to the update route, you must check for ownership before deleting a note.
// Find the note by its ID.
// If the user is the owner, delete the note.
// If the user is not the owner, return a 403 Forbidden status with an appropriate error message.

// DELETE /api/notes/:id - Delete a note
router.delete('/:id', async (req, res) => {
  try {
    // 
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }

    //  This needs an authorization check
    if (note.user != req.user._id) {
      return res.status(403).json({ message: 'User is not authorized to delete this note.' });
    }

    // If the user is the owner, delete the note
    await Note.findByIdAndDelete(req.params.id);

    res.json({ message: 'Note deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router