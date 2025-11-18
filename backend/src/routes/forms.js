
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Form = require('../models/Form');
const Submission = require('../models/Submission');

// submit — supports file fields via multipart
router.post('/:id/submit', upload.any(), async (req, res) => {
  const form = await Form.findById(req.params.id);
  if (!form) return res.status(404).json({ error: 'Form not found' });

  // parse incoming data
  let data = {};
  if (req.is('multipart/form-data')) {
    if (req.body.data) {
      try { data = JSON.parse(req.body.data); } catch (e) { data = req.body; }
    } else {
      data = req.body;
    }
  } else {
    data = req.body;
  }

  // attach files into data keyed by field id if any uploaded with that field name
  (req.files || []).forEach(file => {
    // multer gives originalname and fieldname - prefer fieldname
    const key = file.fieldname || file.originalname;
    // if multiple files, push array
    if (data[key]) {
      // if already array push, else convert to array
      if (!Array.isArray(data[key])) data[key] = [data[key]];
      data[key].push(`/uploads/${file.filename}`);
    } else {
      data[key] = `/uploads/${file.filename}`;
    }
  });

  // validate using conditions util
  const { validateSubmissionByConditions } = require('../utils/conditions');
  const { ok, missing, filteredData, visible } = validateSubmissionByConditions(form, data);

  if (!ok) {
    return res.status(400).json({ error: 'Missing required fields', missing, visible });
  }

  // Save submission with filtered data and files (we keep files metadata too)
  const files = (req.files || []).map(f => ({ filename: f.originalname, url: `/uploads/${f.filename}` }));

  const sub = new Submission({ form: form._id, data: filteredData, files, ip: req.ip });
  await sub.save();

  // Optionally: notify owner, webhook, etc.

  res.json({ ok: true, id: sub._id, visible });
});

// Don't forget to export the router at the end
module.exports = router;