var {mongoose} = require('./db/mongoose');



var newUser = new User({
    email: 'mayank3242@gmail.com     '
});

newUser.save().then((res) => {
    console.log('User saved successfully', JSON.stringify(res, undefined, 2));
}, (e) => {
    console.log('Unable to save', JSON.stringify(e, undefined, 2));
})