
const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const Form = require('../models/Form');
const auth = require('../middleware/auth'); // assuming you have auth middleware

// Get all submissions for a specific form (protected route - only form owner)
router.get('/form/:formId', auth, async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Check if user is the owner
    if (form.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const submissions = await Submission.find({ form: req.params.formId })
      .sort({ submittedAt: -1 });
    
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific submission by ID (protected route)
router.get('/:id', auth, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id).populate('form');
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Check if user is the form owner
    if (submission.form.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a submission (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id).populate('form');
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Check if user is the form owner
    if (submission.form.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Submission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;