const functions = require("firebase-functions");

var admin = require("firebase-admin");


admin.initializeApp();


exports.signInUser = functions.auth.user().onCreate(user => {
  return admin.firestore().collection('users').doc(user.uid).set(
    {
      email: user.email,
      yoh: [],
    }
  )
});

exports.userDelete = functions.auth.user().onDelete(user =>{
  const doc = admin.firestore().collection('users').doc(user.uid);
  return doc.delete();

})
exports.addRequest = functions.https.onCall((data, context) => {
  if(!context.auth){
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Fuck you Niccur'
    );

  }
  if(data.text.length > 30){
    throw new functions.https.HttpsError(
      'invalid-argument',
      'must not be above 30 characters'
    );
  }
  return admin.firestore().collection('gangstars').add({
    text: data.text,
    upvotes: 0,
  })
  
})

exports.sendMoney = functions.https.onCall((data, context) => {
  if(!context.auth){
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Fuck you Niccur'
    );
  };
})