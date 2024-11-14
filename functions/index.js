/* eslint-disable no-multi-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
/* eslint-disable quotes */
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

const emailSender = functions.config().service.email;
const password = functions.config().service.password;

// Configure the email transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: emailSender,
    pass: password,
  },
});

// Helper function to generate a random 4-digit code
const generateCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Cloud Function to send 4-digit code and store in Firestore - verificationCodes collection
exports.sendVerificationCode = functions.https.onRequest(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('MissingInput');
  }

  const verificationCode = generateCode();

  // Email content
  const mailOptions = {
    from: 'groupcation@example.com',
    to: email,
    subject: 'Your Sign Up Verification Code',
    text: `Your verification code to sign up is: ${verificationCode}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);

    // Store the verification code in Firestore
    const db = admin.firestore();
    await db.collection('verificationCodes').doc(email).set({
      code: verificationCode,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      verified: false,
    });

    return res.status(200).send(`Sign up verification code sent to ${email}`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Cloud Function to send 4-digit code and store in Firestore - resetPasswordCodes collection
exports.sendResetPasswordCode = functions.https.onRequest(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('MissingInput');
  }

  const verificationCode = generateCode();

  const mailOptions = {
    from: 'groupcation@example.com',
    to: email,
    subject: 'Your Reset Password Verification Code',
    text: `Your verification code to reset your password is: ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    const db = admin.firestore();
    await db.collection('resetPasswordCodes').doc(email).set({
      code: verificationCode,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      verified: false,
    });

    return res.status(200).send(`Reset password verification code sent to ${email}`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Cloud Function to validate the 4-digit code
exports.validateVerificationCode = functions.https.onRequest(async (req, res) => {
  const { email, code, type } = req.body;

  if (!email || !code || !type) {
    return res.status(400).send("MissingInput");
  }

  try {
    const db = admin.firestore();
    const docRef = db.collection(type).doc(email);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("Account does not exist.");
    }

    const storedData = doc.data();

    // Check if too many attempts have been made
    if (storedData.attempts >= 5) {
      return res.status(429).send("MaxAttempts");
    }

    // Check if the code matches
    if (storedData.code === parseInt(code, 10)) {
      // Mark it as verified and reset attempts on success
      await docRef.update({ verified: true, attempts: 0 });
      return res.status(200).send();
    } else {
      // Increment the number of failed attempts
      await docRef.update({ attempts: (storedData.attempts || 0) + 1 });
      return res.status(400).send("InvalidCode");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Cloud Function to check if a user already exists
exports.checkEmailExists = functions.https.onRequest(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("MissingInput");
  }

  try {
    // Check for email in firbease auth
    const emailExists = admin.auth().getUserByEmail(email);
    // Check for email in firestore collection
    const db = admin.firestore();
    const docRef = db.collection("verificationCodes").doc(email);
    const doc = await docRef.get();

    if (emailExists && doc.exists) {
      return res.status(200).send();
    } else {
      return res.status(404).send("UserNotFound");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Cloud function to check if account has been verified
exports.checkIfCodeIsVerified = functions.https.onRequest(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("MissingInput");
  }

  try {
    // Check for email in firbease auth
    const emailExists = admin.auth().getUserByEmail(email);
    // Check for email in firestore collection
    const db = admin.firestore();
    const docRef = db.collection("verificationCodes").doc(email);
    const doc = await docRef.get();

    if (!emailExists) return res.status(404).send("UserNotFound");

    if (doc.exists) {
      const data = doc.data();

      if (data.verified) {
        return res.status(200).send("AccountVerified.");
      }
      return res.status(404).send("AccountNotVerified.");
    } else {
      return res.status(404).send("UserNotFound");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});


