var functions = require('firebase-functions');
var sendmail = require('sendmail')();

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push it into the Realtime Database then send a response
    admin.database().ref('/messages').push({original: original}).then(snapshot => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        res.redirect(303, snapshot.ref);
    });
});

exports.sendMail = functions.https.onRequest((req, res) => {
    sendmail({
        from: 'no-reply@panlabs.io',
        to: 'cjthowell@gmail.com',
        subject: 'test sendmail',
        html: 'Mail of test sendmail ',
    });//,
    // function(err, reply) {
    //     console.log(err && err.stack);
    //     console.dir(reply);
    // });
    res.status(200).end();
});