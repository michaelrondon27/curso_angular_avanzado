const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect('mongodb+srv://mike:mike2793+@cluster0.xmsvi.mongodb.net/hospitaldb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');

    } catch (error) {

        console.log(error);

        throw new Error('Error a la hora de iniciar la BD');

    }


}

module.exports = {
    dbConnection
}
