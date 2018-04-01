var env = process.env.NODE_ENV || 'development';
global.MONGODB_NAME = '';

// console.log('env ****', env);

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/';
    MONGODB_NAME = 'TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/';
    MONGODB_NAME = 'TodoAppTest';
} else if (env === 'production') {
    process.env.MONGODB_URI = 'mongodb://tododb:tododb123@ds237855.mlab.com:37855/';
    MONGODB_NAME = 'todoapp';
}

module.exports = { MONGODB_NAME }