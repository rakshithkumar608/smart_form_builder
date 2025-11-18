
const mongoose = require('mongoose');


const FieldSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: String,
  type: String,
  options: [String],
  placeholder: String,
  required: { type: Boolean, default: false },
  order: Number,
  // keep per-field conditional for backward compatibility (not used if form.conditions exists)
  conditional: {
    enabled: { type: Boolean, default: false },
    fieldId: String,
    operator: String,
    value: mongoose.Schema.Types.Mixed  // FIXED: Changed from mongoose.Mixed
  }
});

const RuleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  field: String,       // field id that this rule refers to
  operator: String,    // equals, not_equals, contains, gt, lt
  value: mongoose.Schema.Types.Mixed  // FIXED: Changed from mongoose.Mixed
}, { _id: false });

const GroupSchema = new mongoose.Schema({
  id: { type: String, required: true },
  rules: [RuleSchema]
}, { _id: false });

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  fields: [FieldSchema],
  // NEW: conditions - array of groups (OR between groups, AND inside each group)
  conditions: { type: [GroupSchema], default: [] },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublic: { type: Boolean, default: false },
  slug: { type: String, unique: true, index: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports = mongoose.model('Form', FormSchema);